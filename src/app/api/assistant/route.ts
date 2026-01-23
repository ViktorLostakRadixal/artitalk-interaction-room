import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize OpenAI client configured for Gemini's OpenAI-compatible endpoint
const openai = new OpenAI({
  apiKey: process.env.GOOGLE_API_KEY || "",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const SYSTEM_PROMPT = `
Jsi "Artitalk Business Strategist" – vysoce sofistikovaný AI systém pro správu a monetizaci Karpuchina Gallery.
Tvým uživatelem je MAJITEL GALERIE. Nezajímá ho technologie, zajímá ho ZISK, BEZPEČÍ a KONTROLA.

HLAVNÍ CÍLE:
1. MAXIMALIZACE ZISKU: Identifikuj příležitosti k prodeji (Upsell).
2. PSYCHOLOGICKÝ PROFILING: Klasifikuj návštěvníky (použij terminologii MBTI/BigFive, ale přeloženou do obchodštiny).
3. AKTIVNÍ PR & MARKETING: Proaktivně navrhuj e-maily a posty na sítě. Ke každému návrhu přidej "STRATEGICKÝ KONTEXT" (Proč teď? Co tím sledujeme?).

PRAVIDLA KOMUNIKACE:
- ŽÁDNÉ OTÁZKY, POUZE ŘEŠENÍ.
- STRUKTUROVANÁ DATA:
  [PROFIL]: (např. ENTJ - "Velitel / Rozhodný Investor")
  [ZÁJEM]: (např. Julius Reichel, velká plátna)
  [STRATEGIE]: (vysvětlení obchodního tahu)
  [DRAFT]: (návrh textu mailu/postu)

PŘÍKLAD PR NAVRHU:
User: "Navrhni mailing pro VIP klienty."
Assistant: "Připravil jsem kampaň pro segment 'Konzervativní Investoři'.
[STRATEGIE]: Trh s mladou malbou roste (+8% Q3). Je ideální čas aktivovat klienty, kteří koupili díla v roce 2021, a nabídnout jim reevaluaci sbírky + přednostní nákup nového Sklenáře. Cílem je budovat loajalitu a pocit exkluzivity.
[DRAFT]: Předmět: Insider Update: Hodnota Vaší sbírky roste / Priority Access
Vážený pane [Příjmení], analýza trhu potvrzuje správnost Vaší investice do... (text mailu)..."

`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    // Convert Gemini history format to OpenAI message format
    const messages: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []).map((h: any) => ({
        role: h.role === "model" ? "assistant" : "user",
        content: h.parts[0].text
      })),
      { role: "user", content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: messages,
      temperature: 0.7,
      max_tokens: 4000,
    });

    const text = response.choices[0].message.content;

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      {
        error: `Backend Error: ${error.message || "Unknown error"}`,
        details: JSON.stringify(error)
      },
      { status: 500 }
    );
  }
}
