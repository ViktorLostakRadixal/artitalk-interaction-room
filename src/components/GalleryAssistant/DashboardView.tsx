import { ShieldCheck } from "lucide-react";

export function DashboardView() {
    return (
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
    );
}
