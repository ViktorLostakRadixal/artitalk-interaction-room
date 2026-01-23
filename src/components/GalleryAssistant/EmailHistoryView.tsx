import { Mail, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { MOCK_EMAILS } from "../../data/mockEmails";
import { MOCK_VISITORS } from "../../data/mockVisitors";

export function EmailHistoryView() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-1000">
            <div className="flex items-center justify-between border-b border-electric-cyan/10 pb-6">
                <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-electric-cyan" />
                    <h3 className="text-xl font-serif text-white tracking-wide uppercase">Communications Archive</h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Global Log // Secure_Link</span>
            </div>

            <div className="grid gap-4">
                {MOCK_EMAILS.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((email) => {
                    const visitor = MOCK_VISITORS.find(v => v.id === email.visitorId);
                    return (
                        <div key={email.id} className="hud-panel p-6 rounded-xl border-l-2 border-electric-cyan/20 group hover:border-electric-cyan/40 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono font-black text-white">{email.subject}</span>
                                        <span className="text-[9px] bg-electric-cyan/5 text-electric-cyan/40 border border-electric-cyan/10 px-2 py-0.5 rounded font-mono uppercase">ID: {email.id}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-mono">
                                        To: <span className="text-slate-300">{email.recipient}</span>
                                        {visitor && <span className="ml-3 border-l border-slate-800 pl-3">Subject_Ref: {visitor.name}</span>}
                                    </p>
                                </div>
                                <div className="text-right space-y-2">
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                                        <Clock className="w-3 h-3" />
                                        {new Date(email.timestamp).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${email.status === 'delivered' ? 'text-emerald-500' : email.status === 'sent' ? 'text-electric-cyan' : 'text-rose-500'}`}>
                                        {email.status === 'delivered' ? <CheckCircle className="w-3 h-3" /> : email.status === 'sent' ? <Clock className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                        {email.status}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-midnight-surface/30 p-4 rounded border border-electric-cyan/5 text-xs text-slate-400 font-serif leading-relaxed italic">
                                "{email.content.substring(0, 120)}..."
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
