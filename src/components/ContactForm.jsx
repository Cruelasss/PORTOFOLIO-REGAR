"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-8 rounded-2xl border-2 border-purple-500/30 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500"></div>
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span>Send a Message</span>
      </h3>
      
      {status === "success" ? (
        <div className="bg-green-500/20 text-green-400 p-4 rounded-lg border border-green-500/30">
          Message sent successfully! I will get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors text-white"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors text-white"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Message</label>
            <textarea 
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-[#222] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500 transition-colors text-white resize-none"
              placeholder="What's on your mind?"
            />
          </div>
          <button 
            type="submit" 
            disabled={status === "loading"}
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : (
              <>Send Message <Send size={18} /></>
            )}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-sm mt-2">Failed to send message. Please try again.</p>
          )}
        </form>
      )}
    </div>
  );
}
