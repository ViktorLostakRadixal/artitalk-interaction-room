import ReactMarkdown from "react-markdown";
import { Message } from "../../hooks/useGalleryAssistant";

interface ChatConsultantViewProps {
    messages: Message[];
    isLoading: boolean;
}

export function ChatConsultantView({ messages, isLoading }: ChatConsultantViewProps) {
    return (
        <div className="space-y-12 max-w-2xl mx-auto animate-in fade-in duration-1000 pb-24">
            {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`flex flex-col ${msg.role === "model" ? "items-start" : "items-end"}`}
                >
                    <div className={`flex items-center gap-3 mb-3 font-mono font-black text-[10px] tracking-widest uppercase ${msg.role === 'model' ? 'text-electric-cyan' : 'text-slate-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${msg.role === 'model' ? 'bg-electric-cyan shadow-[0_0_8px_#22d3ee] animate-pulse' : 'bg-slate-800'}`} />
                        {msg.role === 'model' ? 'Karpuchina AI' : 'Director'}
                    </div>

                    <div
                        className={`text-sm leading-relaxed p-6 rounded-xl border-l-4 font-sans transition-all duration-500 ${msg.role === "model"
                            ? "bg-midnight-panel/40 border-l-electric-cyan text-slate-100 shadow-xl"
                            : "bg-midnight-surface/50 border-l-slate-700 text-slate-400 italic"
                            }`}
                    >
                        {msg.role === 'model' ? (
                            <ReactMarkdown
                                components={{
                                    strong: ({ node, ...props }) => <span className="font-black text-white border-b border-electric-cyan/40" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-2 mt-4 mb-4 font-mono text-[13px]" {...props} />,
                                    li: ({ node, ...props }) => <li className="text-slate-400 marker:text-electric-cyan" {...props} />,
                                    p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />
                                }}
                            >
                                {msg.text}
                            </ReactMarkdown>
                        ) : (
                            msg.text
                        )}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex gap-2 justify-center py-8">
                    <span className="w-1.5 h-1.5 bg-electric-cyan rounded-full animate-bounce [animation-delay:-0.3s] shadow-[0_0_10px_#22d3ee]"></span>
                    <span className="w-1.5 h-1.5 bg-electric-cyan rounded-full animate-bounce [animation-delay:-0.15s] shadow-[0_0_10px_#22d3ee]"></span>
                    <span className="w-1.5 h-1.5 bg-electric-cyan rounded-full animate-bounce shadow-[0_0_10px_#22d3ee]"></span>
                </div>
            )}
        </div>
    );
}
