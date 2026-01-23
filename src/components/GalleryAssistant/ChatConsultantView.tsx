import ReactMarkdown from "react-markdown";
import { Message } from "../../hooks/useGalleryAssistant";

interface ChatConsultantViewProps {
    messages: Message[];
    isLoading: boolean;
}

export function ChatConsultantView({ messages, isLoading }: ChatConsultantViewProps) {
    return (
        <div className="space-y-8 max-w-xl mx-auto">
            {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`text-sm leading-relaxed ${msg.role === "model"
                            ? "text-stone-800"
                            : "text-stone-600 text-right italic"
                        }`}
                >
                    <span className="block text-[10px] uppercase tracking-widest text-stone-400 mb-2">{msg.role === 'model' ? 'Karpuchina AI' : 'Director'}</span>
                    {msg.role === 'model' ? (
                        <ReactMarkdown
                            components={{
                                strong: ({ node, ...props }) => <span className="font-bold text-stone-900" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1 mt-2 mb-2" {...props} />,
                                li: ({ node, ...props }) => <li className="text-stone-700" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />
                            }}
                        >
                            {msg.text}
                        </ReactMarkdown>
                    ) : (
                        msg.text
                    )}
                </div>
            ))}
            {isLoading && (
                <div className="flex gap-1 justify-center py-4 opacity-20">
                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></span>
                </div>
            )}
        </div>
    );
}
