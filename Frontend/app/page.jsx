"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { PiCopySimpleLight } from "react-icons/pi";
import { PiCopySimpleFill } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copy, SetCopy] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log(API_URL);

  useEffect(() => {}, [reply]);

  const handleCopy = () => {
    const text = document.getElementById("result").innerText;
    navigator.clipboard.writeText(text);
    SetCopy(true);
  };

  async function sendPrompt() {
    if (prompt.trim() == "") alert("Ask something..");

    setLoading(true);
    setReply("");
    setError("");
    setPrompt("");

    try {
      const res = await axios.post(API_URL, { prompt });
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
        <div className="mt-8 mb-6 p-6 pt-12 rounded-3xl shadow-2xl max-w-lvw w-full whitespace-pre-wrap bg-gray-900/40 border border-gray-700 text-gray-300 text-lg backdrop-blur-sm relative">
          <button
            className="absolute top-5 right-7 text-gray-400 hover:cursor-pointer"
            onClick={handleCopy}
          >
            {copy ? <FaCopy /> : <FaRegCopy />}
          </button>
          <p id="result">{reply.replace(/\*+/g, "")}</p>
        </div>
      )}
    </div>
  );
}
