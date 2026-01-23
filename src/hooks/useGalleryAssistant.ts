import { useState } from "react";
import { MOCK_VISITORS } from "../data/mockVisitors";

export type GalleryView = "dashboard" | "chat" | "pr" | "crm" | "live_feed" | "emails";

export interface Message {
    role: string;
    text: string;
}

export function useGalleryAssistant() {
    const [input, setInput] = useState("");
    const [view, setView] = useState<GalleryView>("dashboard");
    const [selectedVisitorId, setSelectedVisitorId] = useState<string | null>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            role: "model",
            text: "Viktore, situace je stabilní. Mám připravený PR návrh pro segment 'Architekti'. U vstupu detekuji drobný incident (Visitor #430).",
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        if (view === "dashboard") setView("chat");

        const userMsg = input;
        setInput("");
        setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
        setIsLoading(true);

        try {
            const visibleMessages = messages.filter((m, index) => !(index === 0 && m.role === 'model'));

            const history = visibleMessages.map(m => ({
                role: m.role === 'model' ? 'model' : 'user',
                parts: [{ text: m.text }]
            }));

            const response = await fetch("/api/assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg, history }),
            });

            const data = await response.json();

            if (data.text) {
                setMessages((prev) => [...prev, { role: "model", text: data.text }]);
            } else if (data.error) {
                setMessages((prev) => [...prev, { role: "model", text: `SYSTEM ERROR: ${data.error}` }]);
            } else {
                setMessages((prev) => [...prev, { role: "model", text: `UNKNOWN ERROR: ${JSON.stringify(data)}` }]);
            }
        } catch (error: any) {
            console.error(error);
            setMessages((prev) => [...prev, { role: "model", text: `CLIENT EXCEPTION: ${error.message || JSON.stringify(error)}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    const selectedVisitor = selectedVisitorId ? MOCK_VISITORS.find(v => v.id === selectedVisitorId) : null;

    return {
        input,
        setInput,
        view,
        setView,
        selectedVisitorId,
        setSelectedVisitorId,
        selectedVisitor,
        messages,
        isLoading,
        handleSend
    };
}
