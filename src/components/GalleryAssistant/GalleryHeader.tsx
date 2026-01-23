export function GalleryHeader() {
    return (
        <div className="px-8 py-8 flex items-center justify-between border-b border-electric-cyan/10 bg-midnight-deep relative">
            <div className="flex items-center gap-4">
                {/* Karpuchina Fish Logo (Sci-Fi Update) */}
                <div className="w-10 h-10 flex items-center justify-center border border-electric-cyan/20 rounded bg-midnight-surface/50">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-electric-cyan animate-pulse-cyan" strokeWidth="1.5">
                        <path d="M6.5 12c.5-2 2-3.5 4-4 2 .5 3.5 2 4 4-2 2-3.5 3.5-5.5 3-2-.5-2.5-2-2.5-3z" />
                        <path d="M16 12c-1.5 1-3 1.5-4.5 1S9 12 9 12" />
                        <path d="M20 12l-2-2m2 2l-2 2" />
                        <circle cx="9" cy="11.5" r="0.5" fill="#22d3ee" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-white font-serif text-2xl tracking-wide leading-none uppercase">
                        KARPUCHINA
                    </h2>
                    <span className="text-[10px] text-electric-cyan/50 uppercase tracking-[0.2em] mt-1 font-mono">
                        Gallery Intelligent Systems
                    </span>
                </div>
            </div>
            {/* Live Indicator & Demo Label */}
            <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2 px-3 py-1 bg-electric-cyan/5 rounded text-xs font-bold tracking-widest text-electric-cyan border border-electric-cyan/20">
                    <span>DEMO PREVIEW</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-electric-cyan rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">System Online</span>
                </div>
            </div>
        </div>
    );
}
