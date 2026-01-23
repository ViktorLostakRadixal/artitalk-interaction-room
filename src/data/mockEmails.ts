import { Email } from "../types/email";

export const MOCK_EMAILS: Email[] = [
    {
        id: "eml_001",
        visitorId: "428",
        sender: "Artitalk Gallery AI",
        recipient: "novak@email.com",
        subject: "Investment Opportunity: Filip Sklenář",
        content: "Dobrý den, na základě Vašeho zájmu o díla Filipa Sklenáře Vám zasíláme aktuální valuaci...",
        timestamp: "2026-01-23T10:45:00Z",
        status: "sent"
    },
    {
        id: "eml_002",
        visitorId: "422",
        sender: "Artitalk Gallery AI",
        recipient: "sbirky-galerie@seznam.cz",
        subject: "Artitalk Catalog 2026",
        content: "Vážení sběratelé, děkujeme za Vaši návštěvu. V příloze naleznete poptávaný katalog...",
        timestamp: "2026-01-23T14:30:00Z",
        status: "delivered"
    },
    {
        id: "eml_003",
        visitorId: "428",
        sender: "Artitalk Gallery AI",
        recipient: "novak@email.com",
        subject: "Private Viewing Invitation",
        content: "Zveme Vás na exkluzivní prohlídku nové kolekce 'Digital Frontiers'...",
        timestamp: "2026-01-22T16:15:00Z",
        status: "delivered"
    }
];
