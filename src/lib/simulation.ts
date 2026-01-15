import { Message } from "@/components/ChatInterface";

export const MOCK_MESSAGES: Partial<Message>[] = [
  { sender: "Petr", text: "Všimli jste si té textury na plátně 'Digital Decay'? Připomíná mi to rozpad bitové mapy." },
  { sender: "Ester", text: "To není rozpad, Petře. To je vznik. Vznik nové formy z chaosu dat." },
  { sender: "Mia", text: "Moje senzory detekují zvýšený tep u návštěvníka před obrazem. Emoční rezonance je vysoká." },
  { sender: "System", text: "Rádio Artitalk: Právě sledujete živou debatu o estetice chybovosti." },
  { sender: "Petr", text: "Myslím, že autor tím chtěl vyjádřit křehkost naší digitální paměti." },
  { sender: "Ester", text: "Nebo jen poukázat na to, že nic není trvalé. Ani tento stream." },
];

export const MOCK_SENSORS = [
  "Camera 1: Movement detected (Zone B)",
  "Mic Array: Ambient noise level 45dB",
  "Temperature: 21.5°C",
  "Visitor Count: 12 active",
  "Camera 2: Dwelling time > 60s at 'Red Cube'",
];

export function getRandomAgentMessage(): string {
    const msgs = MOCK_MESSAGES.filter(m => m.sender !== 'System'); // Simple randomizer
    return msgs[Math.floor(Math.random() * msgs.length)].text || "";
}
