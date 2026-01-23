import { Visitor } from "../types/visitor";

export const MOCK_VISITORS: Visitor[] = [
    {
        id: "428",
        name: "Návštěvník #428 (Muž, Sako)",
        status: "active",
        risk: "low",
        profile: "INTJ (Analytik) - High Net Worth",
        lastSeen: "Sektor B (Red Cube)",
        dwellTime: "14m",
        incidents: [],
        associates: [],
        transcript: ["Kolik stojí ten Sklenář?", "Je to olej nebo akryl?", "Hmm, zajímavá textura."],
        photoUrl: "/api/placeholder/400/320"
    },
    {
        id: "430",
        name: "Návštěvník #430 (Žena s batohem)",
        status: "active",
        risk: "medium",
        profile: "ISFP (Umělec) - Student?",
        lastSeen: "Sektor A (Vstup)",
        dwellTime: "3m",
        incidents: ["Proximity Alert (Sektor A) - Příliš blízko plátna"],
        associates: ["431"],
        transcript: ["To je hustý.", "Hele koukej na to."],
        photoUrl: "/api/placeholder/400/320"
    },
    {
        id: "431",
        name: "Návštěvník #431 (Muž, Kapuce)",
        status: "active",
        risk: "low",
        profile: "Neznámý / Doprovod",
        lastSeen: "Sektor A (Vstup)",
        dwellTime: "3m",
        incidents: [],
        associates: ["430"],
        transcript: [],
        photoUrl: "/api/placeholder/400/320"
    },
    {
        id: "422",
        name: "Návštěvník #422 (Pár, Senior)",
        status: "left",
        risk: "low",
        profile: "Sběratelé (Historie nákupů)",
        lastSeen: "Odešli 14:20",
        dwellTime: "45m",
        incidents: [],
        associates: [],
        transcript: ["Máme zájem o katalog.", "Děkujeme."],
        photoUrl: "/api/placeholder/400/320"
    }
];
