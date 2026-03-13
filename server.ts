import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
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
