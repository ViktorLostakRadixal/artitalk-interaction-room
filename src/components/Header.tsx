"use client";

import { Radio, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MOCK_SENSORS } from "@/lib/simulation";

export function Header() {
  const [sensorData, setSensorData] = useState(MOCK_SENSORS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(MOCK_SENSORS[Math.floor(Math.random() * MOCK_SENSORS.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-artitalk-panel/90 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-4 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 bg-black/50 rounded-full border border-artitalk-gold/20">
             <Radio className="w-5 h-5 text-artitalk-gold" />
        </div>
        <div className="flex flex-col">
            <h1 className="text-white font-serif font-bold text-lg leading-tight tracking-wide">
              Rádio Artitalk
            </h1>
            <div className="flex items-center gap-2 overflow-hidden w-40 md:w-64">
                <Activity className="w-3 h-3 text-artitalk-gold/50 flex-shrink-0" />
                <AnimatePresence mode="wait">
                    <motion.span 
                        key={sensorData}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-stone-400 font-mono truncate"
                    >
                        {sensorData}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span className="text-red-500 font-bold text-xs uppercase tracking-widest animate-pulse hidden md:block">
          On Air
        </span>
      </div>
    </header>
  );
}
