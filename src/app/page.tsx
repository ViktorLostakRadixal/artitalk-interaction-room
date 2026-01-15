import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { RadioPlayer } from "@/components/RadioPlayer";
import { GalleryAssistant } from "@/components/GalleryAssistant";

export default function Home() {
  return (
    <main className="min-h-screen bg-artitalk-dark text-white font-sans selection:bg-artitalk-gold selection:text-black flex flex-col">
      <Header />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-artitalk-gold/5 via-black to-black opacity-40 z-0" />

      {/* Split Layout: Dashboard (Left) | Interaction Room (Right) */}
      <div className="flex-1 relative z-10 flex flex-col md:flex-row pt-16 h-[calc(100vh-64px)] overflow-hidden">
          
          {/* LEFT PANEL: Gallery Command Center (Priority View) */}
          <div className="w-full md:w-[450px] lg:w-[500px] flex-shrink-0 z-20 shadow-2xl">
               <GalleryAssistant className="h-full w-full" />
          </div>

          {/* RIGHT PANEL: Live Feed / Room Visualization */}
          <div className="flex-1 relative bg-black/40 flex flex-col">
              <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-xs text-white/50 uppercase tracking-widest">
                  Live Feed: Interaction Room
              </div>
              <ChatInterface />
              
              {/* Radio Player fixed within this section */}
              <div className="absolute bottom-6 right-6">
                <RadioPlayer />
              </div>
          </div>
      </div>
    </main>
  );
}
