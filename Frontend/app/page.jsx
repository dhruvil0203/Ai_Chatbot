"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {}, [reply]);

  async function sendPrompt() {
    if (prompt.trim() == "") alert("Ask something..");

    setLoading(true);
    setReply("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/ask", { prompt });
      setReply(res.data.reply || "No reply received");
    } catch (err) {
      console.error(err);
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-black via-gray-900 to-black font-sans">
      <h1 className="text-5xl font-extrabold mb-8 text-gray-200 drop-shadow-[0_2px_2px_rgba(255,255,255,0.1)] tracking-wider">
        Mindspark
      </h1>

      <textarea
        className="border border-gray-700 bg-gray-800/40 p-4 w-full max-w-lg rounded-3xl text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/60 shadow-2xl resize-none transition-all duration-300 backdrop-blur-sm"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something..."
        rows={3}
      />

      <button
        className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white px-7 py-3 mt-6 rounded-2xl shadow-2xl shadow-indigo-500/20 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-transform transform hover:scale-105 hover:shadow-indigo-500/40 active:scale-95"
        onClick={sendPrompt}
      >
        {loading ? "Loading..." : "Send"}
      </button>

      {error && (
        <p className="mt-4 text-red-400 font-semibold text-lg bg-red-900/20 border border-red-500/30 px-4 py-2 rounded-xl">
          {error}
        </p>
      )}

      {reply && !loading && (
        <div className="mt-8 p-6 rounded-3xl shadow-2xl max-w-lg w-full whitespace-pre-wrap bg-gray-900/40 border border-gray-700 text-gray-300 text-lg backdrop-blur-sm">
          <p>{reply.replace(/\*+/g, "")}</p>
        </div>
      )}
    </div>
  );
}
