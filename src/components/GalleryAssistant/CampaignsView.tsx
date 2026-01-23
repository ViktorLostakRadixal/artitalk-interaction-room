export function CampaignsView() {
    return (
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
                            Subject: Investment Update: Filip Sklenář<br /><br />
                            Dear Client,<br />
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
    );
}
