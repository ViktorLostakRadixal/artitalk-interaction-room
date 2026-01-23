export function CampaignsView() {
    return (
        <div className="space-y-12 animate-in fade-in duration-1000 pb-24">
            <div className="space-y-12">
                {/* PR Card 1 - Strategic Brief Frame */}
                <div className="group cursor-pointer max-w-3xl mx-auto hud-panel p-1 rounded-2xl transition-all duration-500 hover:border-electric-cyan/30">
                    <div className="p-8 border border-electric-cyan/5 rounded-xl">
                        <div className="flex justify-between items-baseline mb-6 font-mono">
                            <span className="text-[10px] uppercase tracking-widest text-electric-cyan/60 font-black border-l-2 border-electric-cyan/40 pl-3">Campaign Proposal</span>
                            <span className="text-[10px] uppercase tracking-widest text-slate-700">10:42 AM</span>
                        </div>
                        <h4 className="text-2xl font-serif text-white mb-6 group-hover:text-electric-cyan transition-colors tracking-tight">Re-evaluation: Filip Sklenář</h4>

                        <div className="pl-6 border-l-2 border-slate-900 space-y-6 group-hover:border-electric-cyan/20 transition-colors">
                            <p className="text-sm text-slate-400 leading-relaxed font-mono">
                                <strong className="text-white block text-[10px] uppercase tracking-widest mb-2 font-black">Context</strong>
                                Market value increased by 8% in Q3. Opportunity to re-engage 2021 buyers with valuation reports to build trust for new acquisitions.
                            </p>
                            <div className="hud-card p-6 font-mono text-slate-300 text-xs leading-relaxed border border-electric-cyan/10 rounded-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 text-[8px] text-electric-cyan/20 uppercase font-black">Comms_Draft</div>
                                <span className="text-electric-cyan/40 block mb-4 border-b border-electric-cyan/10 pb-2">Subject: Investment Update: Filip Sklenář</span>
                                Dear Client,<br />
                                We are pleased to share the latest valuation report...
                            </div>
                        </div>

                        <div className="flex gap-6 mt-10">
                            <button className="flex-1 px-6 py-4 bg-white text-midnight-deep text-[11px] font-black uppercase tracking-[0.4em] hover:bg-electric-cyan hover:text-white transition-all shadow-xl font-mono">
                                Approve & Send
                            </button>
                            <button className="px-10 py-4 border border-slate-800 text-slate-500 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-midnight-surface hover:text-white hover:border-slate-700 transition-all font-mono">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
