import { GoogleGenAI } from "@google/genai";
import fs from "fs";

async function run() {
  const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
  try {
    let uploadResult = await ai.files.upload({
      file: "test.mp4",
      config: { mimeType: "video/mp4" }
    });
    console.log(uploadResult);
  } catch (e) {
    console.error("Error message:", e.message);
    console.error("Error details:", JSON.stringify(e, null, 2));
  }
}
run();
