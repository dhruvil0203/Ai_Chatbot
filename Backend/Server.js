import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "https://ai-chatbot-git-main-dhruvil234s-projects.vercel.app",
  "http://localhost:3000",
  "https://ai-chatbot-amber-rho.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post("/api/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      reply: text.trim(),
    });
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ error: "Error generating AI response" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
