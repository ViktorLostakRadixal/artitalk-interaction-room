import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

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
    
    // For specific model version, ensure your API key supports it. 
    // Fallback to 'gemini-pro' or 'gemini-1.5-flash' if 'gemini-2.5-flash' is not yet public logic mapped here.
    // Using 'gemini-1.5-flash' as safe default for "flash" class models or specific version if known.
    // User requested gemini-2.5-flash, assuming it works or alias exists.
    // User requested gemini-2.5-flash.
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction: SYSTEM_PROMPT });

    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 4000,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { 
        error: `Backend Error: ${error.message || "Unknown error"}`, 
        details: JSON.stringify(error) 
      },
      { status: 500 }
    );
  }
}
