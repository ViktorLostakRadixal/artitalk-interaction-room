export function GalleryHeader() {
    return (
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
    );
}
