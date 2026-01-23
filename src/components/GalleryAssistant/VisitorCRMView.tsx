import { Search, AlertTriangle } from "lucide-react";
import { Visitor } from "../../types/visitor";
import { MOCK_VISITORS } from "../../data/mockVisitors";

interface VisitorCRMViewProps {
    selectedVisitorId: string | null;
    setSelectedVisitorId: (id: string | null) => void;
    selectedVisitor: Visitor | null | undefined;
}

export function VisitorCRMView({ selectedVisitorId, setSelectedVisitorId, selectedVisitor }: VisitorCRMViewProps) {
    return (
        <div className="flex h-full gap-8 animate-in fade-in slide-in-from-right-4 duration-1000">
            {/* Visitor List - Sci-Fi HUD Sidebar */}
            <div className={`flex-1 ${selectedVisitorId ? 'hidden md:block' : ''} h-full overflow-y-auto custom-scrollbar pr-2`}>
                <div className="mb-8 relative group">
                    <Search className="w-4 h-4 text-electric-cyan absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-white transition-colors" />
                    <input className="w-full bg-midnight-surface/50 border border-electric-cyan/20 rounded-lg pl-12 pr-4 py-4 text-sm text-white placeholder-slate-700 focus:outline-none focus:border-electric-cyan/50 focus:bg-midnight-surface transition-all font-mono tracking-widest" placeholder="Search database..." />
                </div>
                <div className="space-y-2">
                    {MOCK_VISITORS.map(v => (
                        <button
                            key={v.id}
                            onClick={() => setSelectedVisitorId(v.id)}
                            className={`w-full text-left p-5 rounded-lg transition-all group border-l-[3px] ${selectedVisitorId === v.id ? 'bg-midnight-panel/80 border-electric-cyan shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'bg-transparent border-transparent hover:bg-midnight-panel/30 hover:border-electric-cyan/20'}`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className={`text-sm font-serif ${v.incidents.length > 0 ? 'text-rose-500' : 'text-white'}`}>
                                    {v.name}
                                </span>
                                {v.incidents.length > 0 && <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_#f43f5e]" />}
                            </div>
                            <div className="flex items-center gap-4 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-mono">
                                <span className={v.status === 'active' ? 'text-electric-cyan' : 'text-slate-700'}>{v.status === 'active' ? 'Active' : 'Left'}</span>
                                <span className="w-px h-3 bg-slate-800" />
                                <span className="text-slate-500">{v.dwellTime}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Detail View - Strategic Dossier Area */}
            <div className={`${selectedVisitorId ? 'flex-1' : 'hidden'} border-l border-electric-cyan/10 pl-8 h-full overflow-y-auto custom-scrollbar`}>
                {selectedVisitor ? (
                    <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700 pb-12">
                        <div className="relative">
                            <button onClick={() => setSelectedVisitorId(null)} className="md:hidden text-electric-cyan/40 text-[10px] font-black uppercase tracking-[0.4em] mb-10 hover:text-electric-cyan transition-colors flex items-center gap-2">
                                <span className="w-6 h-px bg-electric-cyan/30" /> Back
                            </button>

                            <div className="flex flex-col gap-2">
                                <h2 className="text-4xl font-serif text-white mb-4 tracking-tight">{selectedVisitor.name}</h2>
                            </div>

                            <div className="flex gap-4">
                                <span className="px-4 py-1.5 bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/30 uppercase tracking-[0.2em] text-[10px] font-black rounded italic">{selectedVisitor.profile}</span>
                                {selectedVisitor.incidents.length > 0 && <span className="text-rose-500 font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 border border-rose-900/40 px-4 py-1.5 rounded bg-rose-950/20"><AlertTriangle className="w-3 h-3" /> Incident</span>}
                            </div>
                        </div>

                        {/* Evidence - Digital Sensor Matrix */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 font-mono flex items-center gap-4">
                                Visual Evidence
                                <div className="flex-1 h-px bg-slate-900" />
                            </h4>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-midnight-deep aspect-video rounded-lg flex flex-col items-center justify-center border border-electric-cyan/10 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(34,211,238,0.02),rgba(34,211,238,0),rgba(34,211,238,0.02))] bg-[length:100%_4px,5px_100%]" />
                                    <div className="text-[10px] text-slate-700 font-mono tracking-widest uppercase group-hover:text-electric-cyan/40 transition-colors">Input Cam 01</div>
                                </div>
                                <div className="bg-midnight-deep aspect-video rounded-lg flex flex-col items-center justify-center border border-electric-cyan/10 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(34,211,238,0.02),rgba(34,211,238,0),rgba(34,211,238,0.02))] bg-[length:100%_4px,5px_100%]" />
                                    <div className="text-[10px] text-slate-700 font-mono tracking-widest uppercase group-hover:text-electric-cyan/40 transition-colors">Sector B Cam</div>
                                </div>
                            </div>
                        </div>

                        {/* History - Audio Intercept Log */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 font-mono flex items-center gap-4">
                                Transcript
                                <div className="flex-1 h-px bg-slate-900" />
                            </h4>
                            <div className="space-y-4 hud-panel p-10 rounded-2xl border-l-2 border-electric-cyan/30">
                                {selectedVisitor.transcript.length > 0 ? selectedVisitor.transcript.map((line, i) => (
                                    <div key={i} className="flex gap-8 group border-b border-slate-900 pb-6 last:border-0 last:pb-0">
                                        <span className="text-electric-cyan/20 font-mono text-[10px] pt-1 tracking-widest font-black uppercase">14:{10 + i}</span>
                                        <p className="text-slate-300 font-serif leading-relaxed italic group-hover:text-white transition-colors">
                                            "{line}"
                                        </p>
                                    </div>
                                )) : <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.4em] py-8 text-center italic border-2 border-dashed border-slate-900 rounded-lg">No verbal interaction recorded.</p>}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-electric-cyan/10 font-black font-mono gap-10">
                        <div className="grid grid-cols-3 gap-3 opacity-30">
                            {[...Array(9)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-electric-cyan" />)}
                        </div>
                        <span className="tracking-[1em] text-[11px] uppercase animate-pulse">Select Visitor</span>
                        <div className="w-24 h-px bg-electric-cyan/5" />
                    </div>
                )}
            </div>
        </div>
    );
}
