"use client";

import { motion } from "framer-motion";

export function RadioPlayer() {
  return (
    <div className="bg-midnight-deep/80 backdrop-blur border border-electric-cyan/20 rounded-full p-2 pr-6 flex items-center gap-4 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <button className="w-10 h-10 rounded-full bg-electric-cyan/10 flex items-center justify-center text-electric-cyan border border-electric-cyan/30 hover:bg-electric-cyan/20 transition-all group">
        <div className="w-3 h-3 bg-electric-cyan rounded-sm group-hover:scale-110 transition-transform shadow-[0_0_8px_#22d3ee]" />
      </button>
      <div className="flex gap-1.5 h-6 items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="w-1 bg-electric-cyan/40 rounded-full"
            animate={{
              height: ["40%", "100%", "40%"],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
      <div className="text-[10px] text-white font-mono tracking-[0.2em] uppercase font-black">
        Live Audio
      </div>
    </div>
  );
}
