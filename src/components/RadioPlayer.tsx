"use client";

import { motion } from "framer-motion";

export function RadioPlayer() {
  return (
    <div className="fixed bottom-24 right-4 z-40 bg-black/80 backdrop-blur border border-artitalk-gold/20 rounded-full p-2 pr-4 flex items-center gap-3 shadow-2xl">
       <button className="w-10 h-10 rounded-full bg-artitalk-gold/10 flex items-center justify-center text-artitalk-gold border border-artitalk-gold/30 hover:bg-artitalk-gold/20 transition-all">
          <div className="w-3 h-3 bg-artitalk-gold rounded-sm" />
       </button>
       <div className="flex gap-1 h-6 items-center">
          {[1, 2, 3, 4, 5].map((i) => (
             <motion.div
               key={i}
               className="w-1 bg-artitalk-gold/50 rounded-full"
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
       <div className="text-xs text-artitalk-gold/80 font-mono tracking-widest uppercase">
          Live Audio
       </div>
    </div>
  );
}
