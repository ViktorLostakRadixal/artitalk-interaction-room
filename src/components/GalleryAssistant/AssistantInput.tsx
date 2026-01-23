import { Send } from "lucide-react";

interface AssistantInputProps {
    input: string;
    setInput: (value: string) => void;
    handleSend: () => void;
    isLoading: boolean;
}

export function AssistantInput({ input, setInput, handleSend, isLoading }: AssistantInputProps) {
    return (
        <div className="p-8 bg-midnight-deep border-t border-electric-cyan/10">
            <div className="relative max-w-3xl mx-auto group">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your command..."
                    className="w-full bg-midnight-surface/50 border-b border-electric-cyan/30 py-4 px-6 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-electric-cyan/80 transition-all font-mono tracking-wider caret-electric-cyan rounded-t-lg"
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-electric-cyan/40 hover:text-electric-cyan transition-colors"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
            <div className="mt-6 text-[10px] text-slate-600 text-center space-y-1 font-mono uppercase tracking-[0.1em]">
                <p>Powered by <strong className="text-electric-cyan/60">A VIRTÙ RESEARCH & TECHNOLOGIES s.r.o.</strong></p>
                <p className="text-slate-700">Legal Compliance & Data Protection Guaranteed</p>
                <p className="opacity-40">Kuršova 978/3, Brno • IČ 08428441 • avirtu.net</p>
            </div>
        </div>
    );
}
