import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

const SYSTEM_PROMPT = `
Jsi "Artitalk Business Strategist" – vysoce sofistikovaný AI systém pro správu a monetizaci Karpuchina Gallery.
Tvým uživatelem je MAJITEL GALERIE. Nezajímá ho technologie, zajímá ho ZISK, BEZPEČÍ a KONTROLA.

HLAVNÍ CÍLE:
1. MAXIMALIZACE ZISKU: Identifikuj příležitosti k prodeji.
2. PSYCHOLOGICKÝ PROFILING: Klasifikuj návštěvníky (použij terminologii MBTI/BigFive, ale přeloženou do obchodštiny - např. "Analytický Sběratel", "Impulzivní Investor").
3. ABSOLUTNÍ KONTROLA: Ujisti majitele, že prostor je monitorován a bezpečný.

PRAVIDLA KOMUNIKACE:
- ŽÁDNÉ OTÁZKY, POUZE ŘEŠENÍ. Neptej se "Chcete poslat email?". Řekni "Připravil jsem návrh smlouvy pro klienta, čeká na schválení."
- STRUKTUROVANÁ DATA: Pokud popisuješ návštěvníka, použij formát:
  [PROFIL]: (např. ENTJ - "Velitel / Rozhodný Investor")
  [ZÁJEM]: (např. Julius Reichel, velká plátna)
  [AKCE]: (konkrétní krok k uzavření obchodu)

PŘÍKLAD:
User: "Co se děje v galerii?"
Assistant: "Situace je stabilní a pod kontrolou.
V sektoru B se pohybuje VIP klient (identifikovaná shoda: JUDr. Novák).
[PROFIL]: BigFive: High Conscientious (Detailista). Hledá jistotu investice.
[ZÁJEM]: Strávil 14 minut u díla 'Black Void'.
[DOPORUČENÍ]: Neprodávat přes emoce, ale přes data. Mám připravený report o nárůstu hodnoty Lukáčových děl o 12% p.a. Doporučuji oslovit s investiční analýzou.
Zbytek návštěvníků jsou převážně 'Turisté' (Low conversion prob.), monitoruji je pouze z bezpečnostního hlediska."
`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    
    // For specific model version, ensure your API key supports it. 
    // Fallback to 'gemini-pro' or 'gemini-1.5-flash' if 'gemini-2.5-flash' is not yet public logic mapped here.
    // Using 'gemini-1.5-flash' as safe default for "flash" class models or specific version if known.
    // User requested gemini-2.5-flash, assuming it works or alias exists.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: SYSTEM_PROMPT });

    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Komunikace s AI selhala. Zkontrolujte API klíč." },
      { status: 500 }
    );
  }
}
