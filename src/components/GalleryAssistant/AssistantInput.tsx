import { Send } from "lucide-react";

interface AssistantInputProps {
    input: string;
    setInput: (value: string) => void;
    handleSend: () => void;
    isLoading: boolean;
}

export function AssistantInput({ input, setInput, handleSend, isLoading }: AssistantInputProps) {
    return (
        <div className="p-8 bg-white border-t border-stone-50 md:border-t-0">
            <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your command..."
                    className="w-full bg-transparent border-b border-stone-200 py-3 text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-900 transition-colors font-serif"
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
            <div className="mt-4 text-[10px] text-stone-300 text-center space-y-1">
                <p>Powered by <strong className="text-stone-500">A VIRTÙ RESEARCH & TECHNOLOGIES s.r.o.</strong></p>
                <p className="text-stone-200">Legal Compliance & Data Protection Guaranteed</p>
                <p className="opacity-50">Kuršova 978/3, Brno • IČ 08428441 • avirtu.net</p>
            </div>
        </div>
    );
}
