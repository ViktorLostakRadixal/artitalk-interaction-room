import { motion } from "framer-motion";
import { GalleryView } from "../../hooks/useGalleryAssistant";

interface ViewSwitcherProps {
    view: GalleryView;
    setView: (view: GalleryView) => void;
}

export function ViewSwitcher({ view, setView }: ViewSwitcherProps) {
    return (
        <div className="px-8 pb-4 flex gap-8 text-sm font-medium border-b border-electric-cyan/10 bg-midnight-deep overflow-x-auto">
            <button
                onClick={() => setView("dashboard")}
                className={`pb-4 pt-6 transition-all relative whitespace-nowrap ${view === 'dashboard' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
                Overview
                {view === 'dashboard' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-electric-cyan shadow-[0_0_10px_#22d3ee]" />}
            </button>
            <button
                onClick={() => setView("crm")}
                className={`pb-4 pt-6 transition-all relative flex items-center gap-2 whitespace-nowrap ${view === 'crm' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
                Visitors
                {view === 'crm' && <span className="w-1.5 h-1.5 bg-electric-cyan rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]" />}
                {view === 'crm' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-electric-cyan shadow-[0_0_10px_#22d3ee]" />}
            </button>
            <button
                onClick={() => setView("pr")}
                className={`pb-4 pt-6 transition-all relative whitespace-nowrap ${view === 'pr' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
                Campaigns
                {view === 'pr' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-electric-cyan shadow-[0_0_10px_#22d3ee]" />}
            </button>
            <button
                onClick={() => setView("emails")}
                className={`pb-4 pt-6 transition-all relative whitespace-nowrap ${view === "emails" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
                Communications
                {view === "emails" && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-electric-cyan shadow-[0_0_10px_#22d3ee]" />}
            </button>
            <button
                onClick={() => setView("chat")}
                className={`pb-4 pt-6 transition-all relative whitespace-nowrap ${view === 'chat' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
                Consultant
                {view === 'chat' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-electric-cyan shadow-[0_0_10px_#22d3ee]" />}
            </button>
            <button
                onClick={() => setView("live_feed")}
                className={`pb-4 pt-6 transition-all relative whitespace-nowrap ${view === 'live_feed' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
                Live Feed
                {view === 'live_feed' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-electric-cyan shadow-[0_0_10px_#22d3ee]" />}
            </button>
        </div>
    );
}
