import { Header } from "@/components/Header";
import { RadioPlayer } from "@/components/RadioPlayer";
import { GalleryAssistant } from "@/components/GalleryAssistant";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-stone-900 font-sans selection:bg-stone-200 selection:text-black flex flex-col">
      <Header />
      
      {/* Background Ambience - Light & Airy */}
      <div className="fixed inset-0 pointer-events-none bg-white opacity-40 z-0" />

      {/* Main Content: Full Screen Dashboard */}
      <div className="flex-1 relative z-10 flex pt-16 h-[calc(100vh)] overflow-hidden">
          <GalleryAssistant className="h-full w-full" />
      </div>

       {/* Radio Player - Floating Bottom Right */}
      <div className="fixed bottom-8 right-8 z-50">
          <RadioPlayer />
      </div>

    </main>
  );
}
