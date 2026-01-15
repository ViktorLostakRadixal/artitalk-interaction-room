"use client";

import { useState } from "react";
import { Sparkles, Send, X, Bot, TrendingUp, ShieldCheck, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface GalleryAssistantProps {
    className?: string;
}

export function GalleryAssistant({ className }: GalleryAssistantProps) {
  const [input, setInput] = useState("");
  const [view, setView] = useState<"dashboard" | "chat">("dashboard");
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([
    {
      role: "model",
      text: "Viktore, situace je stabilní. Detekuji 3 high-value příležitosti. Profil 'Investiční Sběratel' u díla A. Mám připravený scénář oslovení.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Gemini Chat Logic
  const handleSend = async () => {
    if (!input.trim()) return;

    if (view === "dashboard") setView("chat");

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));
      
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history }),
      });

      const data = await response.json();
      
      if (data.text) {
        setMessages((prev) => [...prev, { role: "model", text: data.text }]);
      } else {
         setMessages((prev) => [...prev, { role: "model", text: "Spojení přerušeno. Zkouším obnovit..." }]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "model", text: "Chyba komunikace s AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={clsx("flex flex-col h-full bg-[#0F0F0F] border-r border-white/5", className)}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/20">
            <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-artitalk-gold" />
            <h2 className="text-white font-serif text-lg tracking-wide">
                Command Center
            </h2>
            </div>
            {/* Live Indicator */}
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-green-500 uppercase tracking-widest font-bold">System Online</span>
            </div>
        </div>

        {/* View Switcher */}
            <div className="flex px-6 pt-4 gap-4 text-sm font-medium border-b border-white/5 pb-0">
            <button 
                onClick={() => setView("dashboard")}
                className={`pb-3 border-b-2 transition-colors ${view === 'dashboard' ? 'border-artitalk-gold text-artitalk-gold' : 'border-transparent text-stone-500 hover:text-stone-300'}`}
            >
                Přehled & Klasifikace
            </button>
            <button 
                onClick={() => setView("chat")}
                className={`pb-3 border-b-2 transition-colors ${view === 'chat' ? 'border-artitalk-gold text-artitalk-gold' : 'border-transparent text-stone-500 hover:text-stone-300'}`}
            >
                AI Konzultant
            </button>
            </div>


        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-black/20 custom-scrollbar">
            {view === "dashboard" ? (
                <div className="p-6 space-y-6">
                    {/* Status Card */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-900/10 to-transparent border border-green-500/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <ShieldCheck className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                                <h3 className="text-sm text-green-400 font-bold uppercase tracking-wider">Bezpečnostní Status</h3>
                                <p className="text-xs text-stone-400">Všechny systémy online. Prostor zajištěn.</p>
                            </div>
                            </div>
                    </div>

                    {/* Revenue Opportunity - HIGHLIGHTED */}
                    <div className="p-4 rounded-xl bg-gradient-to-b from-artitalk-gold/20 to-transparent border border-artitalk-gold/30 shadow-lg shadow-artitalk-gold/5">
                            <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-artitalk-gold/10 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-artitalk-gold" />
                            </div>
                            <h3 className="text-base text-artitalk-gold font-bold uppercase tracking-wider">Prioritní Obchodní Cíl</h3>
                            </div>
                            <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                <span className="text-white font-bold">Návštěvník #428 (Muž, Sako)</span>
                                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded textxs font-mono font-bold">94% MATCH</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="bg-white/5 p-2 rounded">
                                    <span className="text-stone-500 block mb-1">Psychologický Profil</span>
                                    <span className="text-white font-bold">INTJ / Analytik</span>
                                </div>
                                <div className="bg-white/5 p-2 rounded">
                                    <span className="text-stone-500 block mb-1">Kupní Síla</span>
                                    <span className="text-white font-bold">Vysoká (Est.)</span>
                                </div>
                            </div>

                            <div className="bg-artitalk-gold/5 border border-artitalk-gold/10 p-3 rounded text-sm text-stone-300 leading-relaxed">
                                <strong className="text-artitalk-gold block mb-1">Doporučená Akce:</strong>
                                Zastavil se 3x u obrazu "Red Cube". Neoslovovat emocionálně. Přistoupit s katalogem a zmínit investiční růst autora (+12% p.a.).
                            </div>
                            
                            <button className="w-full py-2 bg-artitalk-gold hover:bg-yellow-400 text-black font-bold uppercase tracking-wide text-xs rounded transition-colors">
                                Generovat Nabídku (PDF)
                            </button>
                            </div>
                    </div>

                        {/* Visitor Stats */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <Users className="w-5 h-5 text-stone-300" />
                            </div>
                            <h3 className="text-sm text-stone-300 font-bold uppercase tracking-wider">Metriky Prostoru</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="block text-2xl font-serif text-white">12</span>
                                <span className="text-[10px] text-stone-500 uppercase">Návštěvníků</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-serif text-white">8m 30s</span>
                                <span className="text-[10px] text-stone-500 uppercase">Dwell Time</span>
                            </div>
                            </div>
                    </div>
                </div>
            ) : (
                <div className="p-4 space-y-4">
                    {messages.map((msg, idx) => (
                        <div
                        key={idx}
                        className={`p-4 rounded-xl text-sm leading-relaxed max-w-[90%] border ${
                            msg.role === "model"
                            ? "bg-artitalk-panel border-artitalk-gold/10 text-stone-200 mr-auto"
                            : "bg-white/10 border-white/5 text-white ml-auto"
                        }`}
                        >
                        {msg.text}
                        </div>
                    ))}
                        {isLoading && (
                        <div className="flex gap-1 p-4">
                            <span className="w-2 h-2 bg-artitalk-gold rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-artitalk-gold rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-artitalk-gold rounded-full animate-bounce"></span>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/50 border-t border-white/10">
            <div className="flex gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Zadejte pokyn pro asistenta..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:ring-1 focus:ring-artitalk-gold focus:outline-none"
            />
            <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-3 bg-artitalk-gold text-black rounded-lg hover:bg-yellow-400 disabled:opacity-50 transition-colors"
            >
                <Send className="w-4 h-4" />
            </button>
            </div>
             <p className="text-[10px] text-center text-white/20 mt-2">
                 Artitalk Business Intelligence • Gemini 2.5 Flash
              </p>
        </div>
    </div>
  );
}
