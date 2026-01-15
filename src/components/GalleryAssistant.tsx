"use client";

import { useState } from "react";
import { Sparkles, Send, X, Bot, TrendingUp, ShieldCheck, Users, AlertTriangle, Search, Clock, Camera, MessageSquare, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

import { ChatInterface } from "./ChatInterface";

interface GalleryAssistantProps {
    className?: string;
}

// Mock Data Types
interface Visitor {
  id: string;
  name: string; // Often descriptive like "Muž v šedém kabátě"
  status: "active" | "left" | "returning";
  risk: "low" | "medium" | "high";
  profile: string; // MBTI / Sales Profile
  lastSeen: string;
  dwellTime: string;
  incidents: string[];
  associates: string[]; // IDs of people they came with
  transcript: string[]; // Snippets of conversation
  photoUrl: string; // Placeholder for now
}

const MOCK_VISITORS: Visitor[] = [
    {
        id: "428",
        name: "Návštěvník #428 (Muž, Sako)",
        status: "active",
        risk: "low",
        profile: "INTJ (Analytik) - High Net Worth",
        lastSeen: "Sektor B (Red Cube)",
        dwellTime: "14m",
        incidents: [],
        associates: [],
        transcript: ["Kolik stojí ten Sklenář?", "Je to olej nebo akryl?", "Hmm, zajímavá textura."],
        photoUrl: "/api/placeholder/400/320"
    },
    {
        id: "430",
        name: "Návštěvník #430 (Žena s batohem)",
        status: "active",
        risk: "medium",
        profile: "ISFP (Umělec) - Student?",
        lastSeen: "Sektor A (Vstup)",
        dwellTime: "3m",
        incidents: ["Proximity Alert (Sektor A) - Příliš blízko plátna"],
        associates: ["431"],
        transcript: ["To je hustý.", "Hele koukej na to."],
        photoUrl: "/api/placeholder/400/320"
    },
    {
        id: "431",
        name: "Návštěvník #431 (Muž, Kapuce)",
        status: "active",
        risk: "low",
        profile: "Neznámý / Doprovod",
        lastSeen: "Sektor A (Vstup)",
        dwellTime: "3m",
        incidents: [],
        associates: ["430"],
        transcript: [],
        photoUrl: "/api/placeholder/400/320"
    },
    {
        id: "422",
        name: "Návštěvník #422 (Pár, Senior)",
        status: "left",
        risk: "low",
        profile: "Sběratelé (Historie nákupů)",
        lastSeen: "Odešli 14:20",
        dwellTime: "45m",
        incidents: [],
        associates: [],
        transcript: ["Máme zájem o katalog.", "Děkujeme."],
        photoUrl: "/api/placeholder/400/320"
    }
];

export function GalleryAssistant({ className }: GalleryAssistantProps) {
  const [input, setInput] = useState("");
  const [view, setView] = useState<"dashboard" | "chat" | "pr" | "crm" | "live_feed">("dashboard");
  const [selectedVisitorId, setSelectedVisitorId] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([
    {
      role: "model",
      text: "Viktore, situace je stabilní. Mám připravený PR návrh pro segment 'Architekti'. U vstupu detekuji drobný incident (Visitor #430).",
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
      // Filter out the initial model greeting to satisfy API requirement (History must start with User)
      const visibleMessages = messages.filter((m, index) => !(index === 0 && m.role === 'model'));
      
      const history = visibleMessages.map(m => ({
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
      } else if (data.error) {
         setMessages((prev) => [...prev, { role: "model", text: `SYSTEM ERROR: ${data.error}` }]);
      } else {
         setMessages((prev) => [...prev, { role: "model", text: `UNKNOWN ERROR: ${JSON.stringify(data)}` }]);
      }
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "model", text: `CLIENT EXCEPTION: ${error.message || JSON.stringify(error)}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedVisitor = selectedVisitorId ? MOCK_VISITORS.find(v => v.id === selectedVisitorId) : null;

  return (
    <div className={clsx("flex flex-col h-full bg-white text-stone-900 font-sans", className)}>
        {/* Header - Minimalist, Airy */}
        <div className="px-8 py-8 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
            {/* Karpuchina Fish Logo (Clean) */}
                <div className="w-10 h-10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-black" strokeWidth="1.5">
                        <path d="M6.5 12c.5-2 2-3.5 4-4 2 .5 3.5 2 4 4-2 2-3.5 3.5-5.5 3-2-.5-2.5-2-2.5-3z" />
                        <path d="M16 12c-1.5 1-3 1.5-4.5 1S9 12 9 12" />
                        <path d="M20 12l-2-2m2 2l-2 2" />
                        <circle cx="9" cy="11.5" r="0.5" fill="black" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-black font-serif text-2xl tracking-wide leading-none">
                        KARPUCHINA
                    </h2>
                    <span className="text-[10px] text-stone-500 uppercase tracking-[0.2em] mt-1">
                        Gallery Intelligent Systems
                    </span>
                </div>
            </div>
            {/* Live Indicator & Demo Label */}
            <div className="flex flex-col items-end gap-1">
                 <div className="flex items-center gap-2 px-2 py-1 bg-stone-100 rounded text-xs font-bold tracking-widest text-stone-600 border border-stone-200">
                    <span>DEMO PREVIEW</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest font-medium">System Online</span>
                 </div>
            </div>
        </div>

        {/* View Switcher - Tabless, just text */}
        <div className="px-8 pb-4 flex gap-8 text-sm font-medium border-b border-stone-100 overflow-x-auto">
            <button 
                onClick={() => setView("dashboard")}
                className={`pb-4 transition-colors relative whitespace-nowrap ${view === 'dashboard' ? 'text-black' : 'text-stone-400 hover:text-stone-600'}`}
            >
                Overview
                {view === 'dashboard' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
            </button>
            <button 
                onClick={() => setView("crm")}
                className={`pb-4 transition-colors relative flex items-center gap-2 whitespace-nowrap ${view === 'crm' ? 'text-black' : 'text-stone-400 hover:text-stone-600'}`}
            >
                Visitors
                {view === 'crm' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />}
                {view === 'crm' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
            </button>
             <button 
                onClick={() => setView("pr")}
                className={`pb-4 transition-colors relative whitespace-nowrap ${view === 'pr' ? 'text-black' : 'text-stone-400 hover:text-stone-600'}`}
            >
                Campaigns
                 {view === 'pr' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
            </button>
            <button 
                onClick={() => setView("chat")}
                className={`pb-4 transition-colors relative whitespace-nowrap ${view === 'chat' ? 'text-black' : 'text-stone-400 hover:text-stone-600'}`}
            >
                Consultant
                 {view === 'chat' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
            </button>
            <button 
                onClick={() => setView("live_feed")}
                className={`pb-4 transition-colors relative whitespace-nowrap ${view === 'live_feed' ? 'text-black' : 'text-stone-400 hover:text-stone-600'}`}
            >
                Live Feed
                 {view === 'live_feed' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
            </button>
        </div>


        {/* Content Area - Clean White */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            {view === "dashboard" ? (
                <div className="space-y-12">
                    {/* Status Section - Minimal */}
                    <div className="flex items-center justify-between">
                         <div className="flex flex-col">
                             <span className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Security Status</span>
                             <div className="flex items-center gap-3">
                                 <ShieldCheck className="w-5 h-5 text-stone-800" />
                                 <span className="text-xl font-serif text-stone-900">Systems Nominal</span>
                             </div>
                         </div>
                         <div className="text-right">
                              <span className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Space Capacity</span>
                              <div className="text-xl font-serif text-stone-900">12 / 40</div>
                         </div>
                    </div>

                    {/* Opportunity - Clean Card */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                             <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900">Priority Opportunity</h3>
                             <span className="bg-stone-100 text-stone-600 px-2 py-1 text-[10px] tracking-wide uppercase">Match 94%</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mb-1">Visitor</span>
                                <span className="text-base text-stone-900 font-serif block">#428 (Male, Suit)</span>
                                <span className="text-xs text-stone-500 mt-1 block">Sector B • 14m Dwell</span>
                            </div>
                            <div>
                                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mb-1">Profile</span>
                                <span className="text-base text-stone-900 font-serif block">INTJ / Analyst</span>
                                <span className="text-xs text-stone-500 mt-1 block">High Net Worth (Est.)</span>
                            </div>
                        </div>

                        <div className="bg-stone-50 p-6">
                            <p className="text-sm text-stone-600 leading-loose">
                                <strong className="text-stone-900 mr-2">Strategy:</strong>
                                Do not approach emotionally. Present <strong>investment data</strong> regarding Lukáč's growth (+12% p.a.).
                            </p>
                        </div>
                        
                        <button className="w-full py-4 border border-stone-200 text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all">
                            Generate Offer PDF
                        </button>
                    </div>
                </div>
            ) : view === "crm" ? (
                 <div className="flex h-full gap-8">
                    {/* Visitor List - Clean */}
                    <div className={`flex-1 ${selectedVisitorId ? 'hidden md:block' : ''}`}>
                         <div className="mb-6 relative">
                            <Search className="w-4 h-4 text-stone-400 absolute left-0 top-1/2 -translate-y-1/2" />
                            <input className="w-full bg-transparent border-b border-stone-200 pl-8 pr-3 py-2 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-900 transition-colors font-serif" placeholder="Search database..." />
                         </div>
                        <div className="space-y-1">
                            {MOCK_VISITORS.map(v => (
                                <button 
                                    key={v.id}
                                    onClick={() => setSelectedVisitorId(v.id)}
                                    className={`w-full text-left p-4 hover:bg-stone-50 transition-all group ${selectedVisitorId === v.id ? 'bg-stone-50' : ''}`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`text-sm font-serif ${v.incidents.length > 0 ? 'text-red-600' : 'text-stone-900'}`}>
                                            {v.name}
                                        </span>
                                        {v.incidents.length > 0 && <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-stone-500 uppercase tracking-wider">
                                        <span>{v.status === 'active' ? 'Active' : 'Left'}</span>
                                        <span className="w-px h-2 bg-stone-200" />
                                        <span>{v.dwellTime}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Detail View - Minimal */}
                    <div className={`${selectedVisitorId ? 'flex-1' : 'hidden'} border-l border-stone-100 pl-8`}>
                        {selectedVisitor ? (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div>
                                     <button onClick={() => setSelectedVisitorId(null)} className="md:hidden text-stone-500 text-xs uppercase tracking-widest mb-4">
                                         ← Back
                                     </button>
                                     <h2 className="text-2xl font-serif text-stone-900 mb-2">{selectedVisitor.name}</h2>
                                     <div className="flex gap-4 text-xs text-stone-500">
                                        <span className="bg-stone-100 px-2 py-1 text-stone-900 uppercase tracking-wider text-[10px]">{selectedVisitor.profile}</span>
                                        {selectedVisitor.incidents.length > 0 && <span className="text-red-600 font-bold uppercase tracking-wider flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Incident</span>}
                                     </div>
                                </div>
                                
                                {/* Evidence */}
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Visual Evidence</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-stone-100 aspect-video flex items-center justify-center text-[10px] text-stone-400 uppercase">Input Cam 01</div>
                                        <div className="bg-stone-100 aspect-video flex items-center justify-center text-[10px] text-stone-400 uppercase">Sector B Cam</div>
                                    </div>
                                </div>

                                {/* History */}
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-4">Transcript</h4>
                                    <div className="space-y-4">
                                        {selectedVisitor.transcript.length > 0 ? selectedVisitor.transcript.map((line, i) => (
                                             <div key={i} className="flex gap-4 text-sm">
                                                 <span className="text-stone-300 font-mono text-xs w-8">14:{10+i}</span>
                                                 <p className="text-stone-600 italic">"{line}"</p>
                                             </div>
                                        )) : <p className="text-stone-300 text-xs italic">No verbal interaction recorded.</p>}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-stone-300 text-sm uppercase tracking-widest">
                                Select Visitor
                            </div>
                        )}
                    </div>
                 </div>
            ) : view === "pr" ? (
                <div className="space-y-12">
                     <div className="space-y-8">
                        {/* PR Card 1 */}
                        <div className="group cursor-pointer">
                            <div className="flex justify-between items-baseline mb-4">
                                 <span className="text-[10px] uppercase tracking-widest text-stone-500">Campaign Proposal</span>
                                 <span className="text-[10px] uppercase tracking-widest text-stone-500">10:42 AM</span>
                            </div>
                            <h4 className="text-2xl font-serif text-stone-900 mb-4 group-hover:underline decoration-1 underline-offset-4">Re-evaluation: Filip Sklenář</h4>
                            
                            <div className="pl-4 border-l border-stone-200 space-y-4">
                                <p className="text-sm text-stone-700 leading-relaxed max-w-md">
                                    <strong className="text-stone-900 block text-xs uppercase tracking-widest mb-1">Context</strong>
                                    Market value increased by 8% in Q3. Opportunity to re-engage 2021 buyers with valuation reports to build trust for new acquisitions.
                                </p>
                                <div className="bg-stone-50 p-6 font-serif text-stone-800 text-sm leading-relaxed border border-stone-100">
                                    Subject: Investment Update: Filip Sklenář<br/><br/>
                                    Dear Client,<br/>
                                    We are pleased to share the latest valuation report...
                                </div>
                            </div>
                            
                            <div className="flex gap-4 mt-6">
                                <button className="px-6 py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-black transition-all">
                                    Approve & Send
                                </button>
                                <button className="px-6 py-3 border border-stone-200 text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-all">
                                    Edit
                                </button>
                            </div>
                        </div>
                     </div>
                </div>
            ) : view === "live_feed" ? (
                <div className="h-full flex flex-col">
                    <div className="flex-1">
                        <ChatInterface />
                    </div>
                </div>
            ) : (
                <div className="space-y-8 max-w-xl mx-auto">
                    {messages.map((msg, idx) => (
                        <div
                        key={idx}
                        className={`text-sm leading-relaxed ${
                            msg.role === "model"
                            ? "text-stone-800"
                            : "text-stone-600 text-right italic"
                        }`}
                        >
                            <span className="block text-[10px] uppercase tracking-widest text-stone-400 mb-2">{msg.role === 'model' ? 'Karpuchina AI' : 'Director'}</span>
                            {msg.role === 'model' ? (
                                <ReactMarkdown 
                                    components={{
                                        strong: ({node, ...props}) => <span className="font-bold text-stone-900" {...props} />,
                                        ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1 mt-2 mb-2" {...props} />,
                                        li: ({node, ...props}) => <li className="text-stone-700" {...props} />,
                                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            ) : (
                                msg.text
                            )}
                        </div>
                    ))}
                        {isLoading && (
                        <div className="flex gap-1 justify-center py-4 opacity-20">
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></span>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Input Area - Clean Line */}
        <div className="p-8 bg-white border-t border-stone-50 md:border-t-0">
            <div className="relative">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your command..."
                className="w-full bg-transparent border-b border-stone-200 py-3 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-900 transition-colors font-serif"
            />
            <button
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 transition-colors"
            >
                <Send className="w-4 h-4" />
            </button>
            </div>
             <div className="mt-4 text-[10px] text-stone-300 text-center space-y-1">
                 <p>Powered by <strong className="text-stone-500">A VIRTÙ RESEARCH & TECHNOLOGIES s.r.o.</strong></p>
                 <p className="text-stone-200">Legal Compliance & Data Protection Guaranteed</p>
                 <p className="opacity-50">Kuršova 978/3, Brno • IČ 08428441 • avirtu.net</p>
              </div>
        </div>
    </div>
  );
}
