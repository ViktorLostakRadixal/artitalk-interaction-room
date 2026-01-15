"use client";

import { useState } from "react";
import { Sparkles, Send, X, Bot, TrendingUp, ShieldCheck, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function GalleryAssistant() {
  const [isOpen, setIsOpen] = useState(false);
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

    // Switch to chat view if sending message from dashboard
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
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-20 right-4 z-40 p-3 rounded-full shadow-2xl transition-all hover:scale-105 border border-white/10 ${
          isOpen ? "bg-artitalk-panel translate-x-20 opacity-0" : "bg-gradient-to-tr from-artitalk-gold to-yellow-600 scale-100 opacity-100"
        }`}
      >
        <Sparkles className="w-6 h-6 text-black" />
      </button>

      {/* Main Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] z-50 bg-[#0F0F0F] bg-opacity-95 backdrop-blur-xl border-l border-artitalk-gold/20 shadow-2xl flex flex-col pt-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-artitalk-gold" />
                <h2 className="text-white font-serif text-lg tracking-wide">
                  Command Center
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* View Switcher */}
             <div className="flex px-6 pt-4 gap-4 text-sm font-medium border-b border-white/5 pb-0">
                <button 
                  onClick={() => setView("dashboard")}
                  className={`pb-3 border-b-2 transition-colors ${view === 'dashboard' ? 'border-artitalk-gold text-artitalk-gold' : 'border-transparent text-stone-500 hover:text-stone-300'}`}
                >
                    Přehled
                </button>
                <button 
                  onClick={() => setView("chat")}
                  className={`pb-3 border-b-2 transition-colors ${view === 'chat' ? 'border-artitalk-gold text-artitalk-gold' : 'border-transparent text-stone-500 hover:text-stone-300'}`}
                >
                    Konzultace
                </button>
             </div>


            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-black/20">
                {view === "dashboard" ? (
                    <div className="p-6 space-y-6">
                        {/* Status Card */}
                        <div className="p-4 rounded-xl bg-gradient-to-br from-green-900/20 to-black border border-green-500/20 flex items-center justify-between">
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
                        <div className="p-4 rounded-xl bg-gradient-to-br from-artitalk-gold/10 to-transparent border border-artitalk-gold/20">
                             <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-artitalk-gold/10 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-artitalk-gold" />
                                </div>
                                <h3 className="text-sm text-artitalk-gold font-bold uppercase tracking-wider">Obchodní Potenciál</h3>
                             </div>
                             <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                    <span className="text-white">Návštěvník #428 (Sako)</span>
                                    <span className="text-green-400 font-mono font-bold">High Probability</span>
                                </div>
                                <p className="text-xs text-stone-300 leading-relaxed">
                                    Klasifikace: <span className="text-artitalk-gold">Analytický Sběratel (INTJ)</span>.
                                    <br/>
                                    Akce: Zastavil se 3x u obrazu "Red Cube". 
                                    <br/>
                                    <strong>Doporučení:</strong> Nabídnout katalog z roku 2022.
                                </p>
                             </div>
                        </div>

                         {/* Visitor Stats */}
                         <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                             <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <Users className="w-5 h-5 text-stone-300" />
                                </div>
                                <h3 className="text-sm text-stone-300 font-bold uppercase tracking-wider">Návštěvnost</h3>
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="block text-2xl font-serif text-white">12</span>
                                    <span className="text-[10px] text-stone-500 uppercase">Aktuálně v galerii</span>
                                </div>
                                <div>
                                    <span className="block text-2xl font-serif text-white">8m</span>
                                    <span className="text-[10px] text-stone-500 uppercase">Průměrný čas</span>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
