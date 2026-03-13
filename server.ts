import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";

const execAsync = promisify(exec);

// Ensure the downloads directory exists
const downloadsDir = path.join(process.cwd(), 'downloads');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Endpoint to download and analyze a video
  app.post("/api/video/analyze", async (req, res) => {
    try {
      const { videoUrl } = req.body;
      
      if (!videoUrl) {
        return res.status(400).json({ error: "videoUrl is required" });
      }

      console.log(`Starting analysis for video: ${videoUrl}`);
      
      // 1. Download the video
      const fileName = `video_${Date.now()}.mp4`;
      const filePath = path.join(downloadsDir, fileName);
      
      console.log(`Downloading video to ${filePath}...`);
      const response = await fetch(videoUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }
      
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(filePath, Buffer.from(buffer));
      console.log(`Video downloaded successfully.`);

      // 2. Analyze with Gemini
      console.log(`Uploading video to Gemini...`);
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let uploadResult = await ai.files.upload({
        file: filePath,
        config: { mimeType: "video/mp4" }
      });
      console.log(`Video uploaded: ${uploadResult.name}. Waiting for processing...`);

      // Poll until the file is active
      while (uploadResult.state === "PROCESSING") {
        console.log(`Video is still processing...`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        uploadResult = await ai.files.get({ name: uploadResult.name });
      }

      if (uploadResult.state === "FAILED") {
        throw new Error("Video processing failed on Gemini servers.");
      }

      console.log(`Video processing complete. State: ${uploadResult.state}`);

      const prompt = `
        You are an expert video director and motion graphics designer analyzing an App Promo video.
        Please analyze this video and break it down into scenes (approximately every 3 seconds or when a major scene change occurs).
        
        For each scene, provide:
        1. Time range (e.g., 0s - 3s)
        2. Visual Description: What is happening in the scene? (e.g., 3D phone rotating, UI scrolling)
        3. Camera Movement: How is the camera moving? (e.g., zoom in, pan right)
        4. Animation Effects: What UI or text effects are present? (e.g., kinetic typography, glassmorphism)
        5. AI Generation Prompt: A highly detailed prompt that could be used in an AI video generator to recreate this specific scene.
        
        Format your response as a structured JSON array of scene objects.
      `;

      console.log(`Sending analysis request to Gemini...`);
      const geminiResponse = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: {
          parts: [
            {
              fileData: {
                fileUri: uploadResult.uri,
                mimeType: uploadResult.mimeType
              }
            },
            { text: prompt }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                timeRange: { type: Type.STRING },
                visualDescription: { type: Type.STRING },
                cameraMovement: { type: Type.STRING },
                animationEffects: { type: Type.STRING },
                aiGenerationPrompt: { type: Type.STRING }
              },
              required: ["timeRange", "visualDescription", "cameraMovement", "animationEffects", "aiGenerationPrompt"]
            }
          }
        }
      });

      const analysisResult = geminiResponse.text;
      console.log(`Analysis complete.`);

      // Clean up the uploaded file from Gemini
      try {
        await ai.files.delete({ name: uploadResult.name });
        console.log(`Cleaned up file from Gemini: ${uploadResult.name}`);
      } catch (e) {
        console.error(`Failed to delete file from Gemini:`, e);
      }

      // Clean up the downloaded file
      fs.unlinkSync(filePath);

      // Return the result
      return res.json({
        status: "success",
        data: JSON.parse(analysisResult || "[]")
      });

    } catch (error) {
      console.error("Error analyzing video:", error);
      res.status(500).json({ error: "Failed to analyze video", details: String(error) });
    }
  });

  // Example endpoint to trigger a Python Agent
  app.post("/api/agent/execute", async (req, res) => {
    try {
      const { agentType, payload } = req.body;
      
      // Basic validation
      if (!agentType) {
        return res.status(400).json({ error: "agentType is required" });
      }

      // In a real scenario, you would map agentType to a specific Python script
      // and pass the payload as arguments or via stdin/file.
      // For demonstration, we'll simulate calling a Python script.
      console.log(`Executing Python agent: ${agentType} with payload:`, payload);

      // --- Example of how you would actually call Python ---
      // const pythonScriptPath = path.join(process.cwd(), 'agents', `${agentType}.py`);
      // const payloadStr = JSON.stringify(payload).replace(/"/g, '\\"'); // Escape quotes
      // const { stdout, stderr } = await execAsync(`python3 ${pythonScriptPath} "${payloadStr}"`);
      // 
      // if (stderr) {
      //   console.warn(`Python stderr: ${stderr}`);
      // }
      // 
      // const result = JSON.parse(stdout);
      // return res.json(result);
      // ----------------------------------------------------

      // Simulated response for now
      setTimeout(() => {
        res.json({
          status: "success",
          message: `Agent '${agentType}' executed successfully (Simulated).`,
          data: {
            resultUrl: "https://example.com/result.mp4",
            logs: ["Started analysis...", "Processing data...", "Completed."]
          }
        });
      }, 2000); // Simulate 2 seconds of processing time

    } catch (error) {
      console.error("Error executing agent:", error);
      res.status(500).json({ error: "Failed to execute agent" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
