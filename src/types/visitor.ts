export interface Visitor {
    id: string;
    name: string; // Often descriptive like "Muž v šedém kabátě"
    status: "active" | "left" | "returning";
    risk: "low" | "medium" | "high";
    profile: string; // MBTI / Sales Profile
    lastSeen: string;
    dwellTime: string;
    incidents: string[];
    associates: string[]; // IDs of people they came with
    transcript: string[]; // Snippets of conversation
    photoUrl: string; // Placeholder for now
}
