import { motion } from "framer-motion";
import { GalleryView } from "../../hooks/useGalleryAssistant";

interface ViewSwitcherProps {
    view: GalleryView;
    setView: (view: GalleryView) => void;
}

export function ViewSwitcher({ view, setView }: ViewSwitcherProps) {
    return (
        <div className="px-8 pb-4 flex gap-8 text-sm font-medium border-b border-stone-100 overflow-x-auto">
            <button
                onClick={() => setView("dashboard")}
                className={`pb-4 transition-colors relative whitespace-nowrap ${view === 'dashboard' ? 'text-black' : 'text-stone-400 hover:text-stone-600'}`}
            >
                Overview
                {view === 'dashboard' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
            </button>
            <button
                onClick={() => setView("crm")}
                className={`pb-4 transition-colors relative flex items-center gap-2 whitespace-nowrap ${view === 'crm' ? 'text-black' : 'text-stone-400 hover:text-stone-600'}`}
            >
                Visitors
                {view === 'crm' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />}
                {view === 'crm' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
            </button>
            <button
                onClick={() => setView("pr")}
                className={`pb-4 transition-colors relative whitespace-nowrap ${view === 'pr' ? 'text-black' : 'text-stone-400 hover:text-stone-600'}`}
            >
                Campaigns
                {view === 'pr' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
            </button>
            <button
                onClick={() => setView("chat")}
                className={`pb-4 transition-colors relative whitespace-nowrap ${view === 'chat' ? 'text-black' : 'text-stone-400 hover:text-stone-600'}`}
            >
                Consultant
                {view === 'chat' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
            </button>
            <button
                onClick={() => setView("live_feed")}
                className={`pb-4 transition-colors relative whitespace-nowrap ${view === 'live_feed' ? 'text-black' : 'text-stone-400 hover:text-stone-600'}`}
            >
                Live Feed
                {view === 'live_feed' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
            </button>
        </div>
    );
}
