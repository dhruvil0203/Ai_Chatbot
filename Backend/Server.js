import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Added CORS with frontend URI
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      "https://ai-chatbot-amber-rho.vercel.app/", // Deployed frontend
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

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
