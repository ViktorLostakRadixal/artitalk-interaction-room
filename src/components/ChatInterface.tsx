"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { MOCK_MESSAGES } from "@/lib/simulation";

export type Message = {
  id: string;
  sender: "Petr" | "Ester" | "Mia" | "System" | "User";
  text: string;
  timestamp: string;
};

const AGENT_COLORS = {
  Petr: "text-cyan-400 border-cyan-400/20 bg-cyan-950/30",
  Ester: "text-fuchsia-400 border-fuchsia-400/20 bg-fuchsia-950/30",
  Mia: "text-emerald-400 border-emerald-400/20 bg-emerald-950/30",
  System: "text-artitalk-gold border-artitalk-gold/20 bg-yellow-950/30 font-serif italic",
  User: "text-white border-white/10 bg-white/5",
};

export function ChatInterface() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock initial state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "System",
      text: "Právě posloucháte Rádio Artitalk. Dnes se věnujeme tématu: Hranice vnímání v digitálním prostoru.",
      timestamp: "10:00",
    },
    {
      id: "2",
      sender: "Petr",
      text: "Je to fascinující, jak se technologie stává prodloužením našich smyslů. Nemyslíš, Ester?",
      timestamp: "10:01",
    },
    {
      id: "3",
      sender: "Ester",
      text: "Spíše bariérou, Petře. Filtrem, který realitu zkresluje, než aby ji odhaloval.",
      timestamp: "10:01",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulation Effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const simulateChat = () => {
       const randomDelay = Math.random() * 10000 + 5000; // 5-15 seconds
       timeoutId = setTimeout(() => {
           const nextMsg = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)];
           if (nextMsg) {
             setMessages(prev => [...prev, {
                id: Date.now().toString(),
                sender: nextMsg.sender || "System",
                text: nextMsg.text || "",
                timestamp: new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }) 
             } as Message]);
           }
           simulateChat();
       }, randomDelay);
    };
    
    simulateChat();
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "User",
      text: input,
      timestamp: new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full relative">
       {/* Messages Area */}
       <div className="flex-1 overflow-y-auto px-8 py-20 space-y-12 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx(
                "max-w-[85%]",
                msg.sender === "User" ? "ml-auto text-right" : "mr-auto"
              )}
            >
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-3 mb-1">
                    <span className={clsx(
                        "text-[10px] font-bold uppercase tracking-[0.2em]",
                        msg.sender === "User" ? "ml-auto text-stone-900" : "text-stone-400",
                        msg.sender === "Petr" && "text-blue-600",
                        msg.sender === "Ester" && "text-purple-600"
                    )}>
                        {msg.sender === "System" ? "• Station" : msg.sender}
                    </span>
                    <span className="text-[10px] text-stone-300">
                        {msg.timestamp}
                    </span>
                 </div>
                 
                 <p className={clsx(
                    "leading-relaxed text-lg break-words font-serif",
                    msg.sender === "System" ? "text-stone-400 italic" : "text-stone-800"
                 )}>
                    {msg.text}
                 </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Minimalist */}
      <div className="p-8 z-10 w-full max-w-2xl mx-auto">
        <div className="relative">
           <textarea
             className="w-full bg-transparent border-b border-stone-200 focus:border-stone-900 text-stone-900 placeholder-stone-300 resize-none min-h-[44px] py-2 text-lg font-serif focus:outline-none transition-colors"
             placeholder="Contribute to the dialogue..."
             rows={1}
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
             }}
           />
           <button 
             onClick={handleSend}
             className="absolute right-0 bottom-3 text-stone-400 hover:text-stone-900 transition-colors"
           >
             <Send className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
}
