import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

export default function ChatbotWidget() {
  const { user } = useAuth(); // ✅ get current user
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // ✅ Load user-specific history when user logs in
  useEffect(() => {
    if (user) {
      const savedHistory = localStorage.getItem(`chat_${user.id}`);
      if (savedHistory) {
        setMessages(JSON.parse(savedHistory));
      } else {
        setMessages([]);
      }
    } else {
      // clear when logged out
      setMessages([]);
    }
  }, [user]);

  // ✅ Save messages whenever they change (only if user is logged in)
  useEffect(() => {
    if (user) {
      localStorage.setItem(`chat_${user.id}`, JSON.stringify(messages));
    }
  }, [messages, user]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      //const res = await fetch ("http://localhost:5000/api/chat",{
      const res = await fetch("https://movies-app-1-vzr5.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
      setInput("");
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Error: Could not get response." },
      ]);
      console.error(err);
    }
  };

  return (
    <>
      {/* Floating draggable button */}
      <motion.div
        drag
        dragMomentum={false}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-white text-3xl">💬</span>
      </motion.div>

      {/* Chat window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border flex flex-col z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 font-bold flex justify-between items-center">
            Movie Assistant
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white hover:text-indigo-600 transition-all rounded-full p-1"
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl break-words shadow ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t flex gap-2 bg-gray-100">
            <input
              className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about movies..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-2xl shadow-md transition-all"
            >
              ➤
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
