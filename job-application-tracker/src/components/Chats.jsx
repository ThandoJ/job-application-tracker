import { useState, useEffect, useRef } from "react";

import Sidebar from "../components/Sidebar";

export default function Chats() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("messages");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");

  const messagesEndRef = useRef(null);

  // AUTO SAVE
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  // AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: user?.email,
      text,
      createdAt: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setText("");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
        
        {/* HEADER */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-5 mb-5 shadow-2xl">
          <h1 className="text-2xl md:text-3xl font-bold">
            Team Chat
          </h1>

          <p className="text-sm text-gray-300 mt-1">
            Communicate with applicants and recruiters in real time.
          </p>
        </div>

        {/* CHAT CONTAINER */}
        <div className="flex-1 backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-4 overflow-y-auto shadow-2xl space-y-4">
          
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              No messages yet
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.sender === user?.email;

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isMine ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
                      isMine
                        ? "bg-blue-500 text-white"
                        : "bg-white/20 text-white backdrop-blur-lg"
                    }`}
                  >
                    <p className="text-sm break-words">
                      {msg.text}
                    </p>

                    <div className="flex items-center justify-between mt-2 gap-4">
                      <span className="text-[10px] opacity-70">
                        {msg.sender}
                      </span>

                      <span className="text-[10px] opacity-70">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="mt-5 backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-3 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-3">
            
            <input
              type="text"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSend()
              }
              className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 outline-none text-white placeholder-gray-400"
            />

            <button
              onClick={handleSend}
              className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition-all duration-300 font-semibold shadow-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}