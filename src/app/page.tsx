import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { RadioPlayer } from "@/components/RadioPlayer";
import { GalleryAssistant } from "@/components/GalleryAssistant";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-stone-900 font-sans selection:bg-stone-200 selection:text-black flex flex-col">
      <Header />
      
      {/* Background Ambience - Light & Airy */}
      <div className="fixed inset-0 pointer-events-none bg-white opacity-40 z-0" />

      {/* Split Layout: Dashboard (Left) | Interaction Room (Right) */}
      <div className="flex-1 relative z-10 flex flex-col md:flex-row pt-16 h-[calc(100vh-64px)] overflow-hidden">
          
          {/* LEFT PANEL: Gallery Command Center (Priority View) */}
          <div className="w-full md:w-[450px] lg:w-[500px] flex-shrink-0 z-20 bg-white shadow-[10px_0_30px_-5px_rgba(0,0,0,0.02)]">
               <GalleryAssistant className="h-full w-full" />
          </div>

          {/* RIGHT PANEL: Live Feed / Room Visualization */}
          <div className="flex-1 relative bg-[#F7F7F6] flex flex-col">
              <div className="absolute top-6 left-8 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                    Live Feed • Public Space
                  </span>
              </div>
              <ChatInterface />
              
              {/* Radio Player fixed within this section */}
              <div className="absolute bottom-12 right-12">
                <RadioPlayer />
              </div>
          </div>
      </div>
    </main>
  );
}
