import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "https://ai-chatbot-cc8qv7ke2-dhruvil234s-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

app.post("/api/ask", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    res.json({
      reply: result.candidates[0].content.parts[0].text.trim(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating AI response" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
