import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs";

async function run() {
  try {
    console.log("Downloading video...");
    const response = await fetch("https://video-previews.elements.envatousercontent.com/h264-video-previews/399eee23-ac53-4cec-ae20-65758947f67a/52427890.mp4");
    const buffer = await response.arrayBuffer();
    fs.writeFileSync("test.mp4", Buffer.from(buffer));
    console.log("Downloaded. Size:", fs.statSync("test.mp4").size);

    console.log("Analyzing...");
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const base64Data = fs.readFileSync("test.mp4").toString('base64');
    
    const geminiResponse = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: {
        parts: [
          { inlineData: { mimeType: "video/mp4", data: base64Data } },
          { text: "Analyze this video and return a JSON array of scenes with timeRange, visualDescription, cameraMovement, animationEffects, aiGenerationPrompt." }
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
            }
          }
        }
      }
    });
    console.log("Result:", geminiResponse.text);
  } catch (e) {
    console.error("Error:", e);
  }
}
run();
