import { ShieldCheck } from "lucide-react";

export function DashboardView() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Status Section - Sci-Fi HUD */}
            <div className="flex items-center justify-between border-b border-electric-cyan/10 pb-8 relative">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-mono">Security Status</span>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <ShieldCheck className="w-6 h-6 text-electric-cyan" />
                            <div className="absolute inset-0 bg-electric-cyan blur-lg opacity-20 animate-pulse" />
                        </div>
                        <span className="text-xl font-serif text-white tracking-wide uppercase italic font-black">Systems Nominal</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-mono">Space Capacity</span>
                    <div className="text-2xl font-mono text-white tracking-widest font-black">12 <span className="text-electric-cyan/30">/</span> 40</div>
                </div>
            </div>

            {/* Opportunity - Tactical HUD Card */}
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-electric-cyan/10 pb-3">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-electric-cyan font-mono">Priority Opportunity</h3>
                    <span className="bg-electric-cyan/10 text-electric-cyan px-3 py-1 text-[10px] tracking-widest uppercase border border-electric-cyan/30 rounded-full font-mono font-black">Match 94%</span>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="hud-card p-8 rounded-xl border-t-2 border-t-electric-cyan/40">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-2 font-mono font-black">Visitor</span>
                        <span className="text-base text-white font-serif block tracking-tight">#428 (Male, Suit)</span>
                        <span className="text-xs text-electric-cyan/60 mt-2 block font-mono">Sector B • 14m Dwell</span>
                    </div>
                    <div className="hud-card p-8 rounded-xl border-t-2 border-t-slate-800">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-2 font-mono font-black">Profile</span>
                        <span className="text-base text-white font-serif block tracking-tight">INTJ / Analyst</span>
                        <span className="text-xs text-electric-cyan/60 mt-2 block font-mono">High Net Worth (Est.)</span>
                    </div>
                </div>

                <div className="hud-panel p-8 rounded-2xl border-l-4 border-l-electric-cyan">
                    <p className="text-sm text-slate-300 leading-relaxed font-mono italic">
                        <strong className="text-white mr-3 not-italic uppercase tracking-widest text-xs font-black">Strategy:</strong>
                        Do not approach emotionally. Present <strong>investment data</strong> regarding Lukáč's growth (+12% p.a.).
                    </p>
                </div>

                <div className="relative group overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-electric-cyan opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    <button className="w-full py-5 bg-white text-midnight-deep text-[11px] font-black uppercase tracking-[0.5em] hover:bg-electric-cyan hover:text-white transition-all shadow-2xl font-mono relative">
                        Generate Offer PDF
                    </button>
                </div>
            </div>
        </div>
    );
}
