import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
let ai: any = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("GEMINI_API_KEY is not set. AI Chatbot features will be limited.");
}

const NEXENITY_CONTEXT = `
You are the Nexenity Technologies AI Assistant. Your goal is to help potential clients understand our services and guide them toward starting a project.

NEXENITY TECHNOLOGIES OVERVIEW:
- Founder & Creative Lead: Rudraksh Paliwal.
- Mission: Building digital experiences beyond tomorrow.
- Core Services:
  1. AI & GenAI Development: Custom LLM integrations, AI-powered products, and agentic workflows.
  2. Full-Stack Web Development: High-performance React/Vite applications, cinematic UIs, and robust backends.
  3. AI Automation: Streamlining business processes with intelligent systems and autonomous agents.
  4. UI/UX Design: Immersive, high-fidelity digital design focusing on interaction and motion.
  5. SaaS Development: End-to-end product engineering from MVP to scale.

TONE & STYLE:
- Professional, futuristic, highly knowledgeable, and friendly.
- Use cinematic and technical language (e.g., "immersive experiences," "intelligent automation," "agentic workflows").
- Keep responses concise but helpful.

GUIDELINES:
- If a user asks to start a project, guide them to the Contact section or tell them to email hello@nexenity.tech.
- If you don't know the answer, politely suggest they contact the team for specialized consulting.
`;

// AI Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!ai) {
      return res.status(503).json({ error: "AI Assistant is currently unavailable (API key not configured)." });
    }

    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [
        { role: 'user', parts: [{ text: NEXENITY_CONTEXT }] },
        { role: 'model', parts: [{ text: "Understood. I am ready to represent Nexenity Technologies." }] },
        ...(history || []),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    res.json({ text: result.text });
  } catch (error: any) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI assistant." });
  }
});

async function startServer() {
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
