import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { RadioPlayer } from "@/components/RadioPlayer";
import { GalleryAssistant } from "@/components/GalleryAssistant";

export default function Home() {
  return (
    <main className="min-h-screen bg-artitalk-dark text-white font-sans selection:bg-artitalk-gold selection:text-black">
      <Header />
      <GalleryAssistant />
      
      {/* Background Ambience (Subtle Gradient) */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-artitalk-gold/5 via-black to-black opacity-40 z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 h-dvh flex flex-col">
          <ChatInterface />
      </div>

      <RadioPlayer />
    </main>
  );
}
