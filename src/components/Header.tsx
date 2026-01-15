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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 h-16 flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center w-8 h-8 bg-stone-100 rounded-full border border-stone-200">
             <Radio className="w-4 h-4 text-stone-900" />
        </div>
        <div className="flex flex-col">
            <h1 className="text-stone-900 font-serif font-bold text-lg leading-tight tracking-wide">
              Artitalk Interaction Room
            </h1>
            <div className="flex items-center gap-2 overflow-hidden w-40 md:w-64">
                <Activity className="w-3 h-3 text-stone-400 flex-shrink-0" />
                <AnimatePresence mode="wait">
                    <motion.span 
                        key={sensorData}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[10px] uppercase tracking-widest text-stone-400 font-medium truncate"
                    >
                        {sensorData}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-stone-400 font-bold text-[10px] uppercase tracking-[0.2em] hidden md:block">
          System Active
        </span>
      </div>
    </header>
  );
}
