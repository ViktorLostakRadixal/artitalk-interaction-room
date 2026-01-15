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
  const [view, setView] = useState<"dashboard" | "chat" | "pr">("dashboard");
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([
    {
      role: "model",
      text: "Viktore, situace je stabilní. Mám připravený PR návrh pro segment 'Architekti'.",
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
            <div className="flex items-center gap-3">
            {/* Karpuchina Fish Logo (Symbolic) */}
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-black" strokeWidth="2">
                    <path d="M6.5 12c.5-2 2-3.5 4-4 2 .5 3.5 2 4 4-2 2-3.5 3.5-5.5 3-2-.5-2.5-2-2.5-3z" />
                    <path d="M16 12c-1.5 1-3 1.5-4.5 1S9 12 9 12" />
                    <path d="M20 12l-2-2m2 2l-2 2" />
                    <circle cx="9" cy="11.5" r="0.5" fill="black" />
                 </svg>
            </div>
            <div>
                <h2 className="text-white font-serif text-lg tracking-wide leading-none">
                    KARPUCHINA
                </h2>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">
                    GALLERY | RYBNÁ 9
                </span>
            </div>
            </div>
            {/* Live Indicator */}
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-green-500 uppercase tracking-widest font-bold">System Online</span>
            </div>
        </div>

        {/* View Switcher */}
            <div className="flex px-6 pt-4 gap-4 text-xs md:text-sm font-medium border-b border-white/5 pb-0 overflow-x-auto">
            <button 
                onClick={() => setView("dashboard")}
                className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${view === 'dashboard' ? 'border-artitalk-gold text-artitalk-gold' : 'border-transparent text-stone-500 hover:text-stone-300'}`}
            >
                Přehled
            </button>
            <button 
                onClick={() => setView("pr")}
                className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${view === 'pr' ? 'border-artitalk-gold text-artitalk-gold' : 'border-transparent text-stone-500 hover:text-stone-300'}`}
            >
                PR & Marketing <span className="ml-1 text-[10px] bg-artitalk-gold text-black px-1 rounded-full font-bold">1</span>
            </button>
            <button 
                onClick={() => setView("chat")}
                className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${view === 'chat' ? 'border-artitalk-gold text-artitalk-gold' : 'border-transparent text-stone-500 hover:text-stone-300'}`}
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

                    {/* Revenue Opportunity */}
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
                         {/* ... (Keep same stats) ... */}
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
            ) : view === "pr" ? (
                <div className="p-6 space-y-6">
                     <div className="space-y-2">
                        <h3 className="text-stone-400 text-xs font-bold uppercase tracking-wider">Navrhované Kampaně</h3>
                        
                        {/* PR Card 1 */}
                        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-artitalk-gold/30 transition-colors">
                            <div className="p-4 border-b border-white/5 bg-white/5">
                                <div className="flex justify-between items-start mb-2">
                                     <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Newsletter / VIP</span>
                                     <span className="text-[10px] text-stone-500">Dnes, 10:42</span>
                                </div>
                                <h4 className="text-white font-serif tracking-wide text-lg">Reevaluace sbírky: Filip Sklenář</h4>
                            </div>
                            <div className="p-4 space-y-4">
                                <div>
                                    <span className="text-[10px] uppercase text-artitalk-gold font-bold block mb-1">Strategický Kontext (Why This? Why Now?)</span>
                                    <p className="text-sm text-stone-300 leading-relaxed">
                                        Tržní hodnota Sklenářových děl stoupla o 8% za Q3. Klienti, kteří nakoupili v roce 2021, nyní "sedí" na zisku. 
                                        Oslovením s propočtem zhodnocení posílíme důvěru a otevřeme dveře pro nákup novějších, dražších děl.
                                    </p>
                                </div>
                                <div className="bg-black/40 p-3 rounded border border-white/5 text-xs text-stone-400 font-mono">
                                    Předmět: Vaše investice do díla Filipa Sklenáře<br/><br/>
                                    Vážený kliente,<br/>
                                    dovoluji si Vám zaslat aktuální valuaci...
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button className="flex-1 py-2 bg-artitalk-gold text-black font-bold uppercase text-xs rounded hover:bg-yellow-400 transition-colors">
                                        Schválit a Odeslat
                                    </button>
                                    <button className="px-3 py-2 bg-white/10 text-white font-bold uppercase text-xs rounded hover:bg-white/20 transition-colors">
                                        Upravit
                                    </button>
                                </div>
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
