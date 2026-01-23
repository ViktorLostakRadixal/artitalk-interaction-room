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
        <div className="flex h-full gap-8">
            {/* Visitor List - Clean */}
            <div className={`flex-1 ${selectedVisitorId ? 'hidden md:block' : ''}`}>
                <div className="mb-6 relative">
                    <Search className="w-4 h-4 text-stone-400 absolute left-0 top-1/2 -translate-y-1/2" />
                    <input className="w-full bg-transparent border-b border-stone-200 pl-8 pr-3 py-2 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-900 transition-colors font-serif" placeholder="Search database..." />
                </div>
                <div className="space-y-1">
                    {MOCK_VISITORS.map(v => (
                        <button
                            key={v.id}
                            onClick={() => setSelectedVisitorId(v.id)}
                            className={`w-full text-left p-4 hover:bg-stone-50 transition-all group ${selectedVisitorId === v.id ? 'bg-stone-50' : ''}`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className={`text-sm font-serif ${v.incidents.length > 0 ? 'text-red-600' : 'text-stone-900'}`}>
                                    {v.name}
                                </span>
                                {v.incidents.length > 0 && <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-stone-500 uppercase tracking-wider">
                                <span>{v.status === 'active' ? 'Active' : 'Left'}</span>
                                <span className="w-px h-2 bg-stone-200" />
                                <span>{v.dwellTime}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Detail View - Minimal */}
            <div className={`${selectedVisitorId ? 'flex-1' : 'hidden'} border-l border-stone-100 pl-8`}>
                {selectedVisitor ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <button onClick={() => setSelectedVisitorId(null)} className="md:hidden text-stone-500 text-xs uppercase tracking-widest mb-4">
                                ← Back
                            </button>
                            <h2 className="text-2xl font-serif text-stone-900 mb-2">{selectedVisitor.name}</h2>
                            <div className="flex gap-4 text-xs text-stone-500">
                                <span className="bg-stone-100 px-2 py-1 text-stone-900 uppercase tracking-wider text-[10px]">{selectedVisitor.profile}</span>
                                {selectedVisitor.incidents.length > 0 && <span className="text-red-600 font-bold uppercase tracking-wider flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Incident</span>}
                            </div>
                        </div>

                        {/* Evidence */}
                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Visual Evidence</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-stone-100 aspect-video flex items-center justify-center text-[10px] text-stone-400 uppercase">Input Cam 01</div>
                                <div className="bg-stone-100 aspect-video flex items-center justify-center text-[10px] text-stone-400 uppercase">Sector B Cam</div>
                            </div>
                        </div>

                        {/* History */}
                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-4">Transcript</h4>
                            <div className="space-y-4">
                                {selectedVisitor.transcript.length > 0 ? selectedVisitor.transcript.map((line, i) => (
                                    <div key={i} className="flex gap-4 text-sm">
                                        <span className="text-stone-300 font-mono text-xs w-8">14:{10 + i}</span>
                                        <p className="text-stone-600 italic">"{line}"</p>
                                    </div>
                                )) : <p className="text-stone-300 text-xs italic">No verbal interaction recorded.</p>}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-stone-300 text-sm uppercase tracking-widest">
                        Select Visitor
                    </div>
                )}
            </div>
        </div>
    );
}
