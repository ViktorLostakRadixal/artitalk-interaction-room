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
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto relative pt-20 pb-24">
       <div className="flex-1 overflow-y-auto px-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx(
                "p-4 rounded-2xl border backdrop-blur-sm max-w-[90%]",
                AGENT_COLORS[msg.sender] || AGENT_COLORS.User,
                msg.sender === "User" ? "ml-auto text-right" : "mr-auto"
              )}
            >
              <div className="flex flex-col gap-1">
                 <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">
                    {msg.sender === "System" ? "Rádio Artitalk" : msg.sender}
                 </span>
                 <p className="leading-relaxed text-sm md:text-base">
                    {msg.text}
                 </p>
                 <span className="text-[10px] opacity-40 mt-1 block">
                    {msg.timestamp}
                 </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area (Teletník) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent z-40">
        <div className="max-w-2xl mx-auto flex items-end gap-2 bg-artitalk-panel border border-white/10 rounded-2xl p-2 shadow-2xl">
           <textarea
             className="flex-1 bg-transparent border-0 focus:ring-0 text-white placeholder-stone-500 resize-none max-h-32 min-h-[44px] py-3 px-2 text-sm md:text-base"
             placeholder="Váš vzkaz do éteru..."
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
             className="p-3 bg-artitalk-gold text-black rounded-xl hover:bg-yellow-400 transition-colors flex-shrink-0"
           >
             <Send className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
}
