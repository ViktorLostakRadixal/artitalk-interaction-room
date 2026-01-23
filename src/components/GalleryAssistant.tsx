"use client";

import clsx from "clsx";
import { ChatInterface } from "./ChatInterface";
import { useGalleryAssistant } from "../hooks/useGalleryAssistant";

// Sub-components
import { DashboardView } from "./GalleryAssistant/DashboardView";
import { VisitorCRMView } from "./GalleryAssistant/VisitorCRMView";
import { CampaignsView } from "./GalleryAssistant/CampaignsView";
import { ChatConsultantView } from "./GalleryAssistant/ChatConsultantView";
import { GalleryHeader } from "./GalleryAssistant/GalleryHeader";
import { ViewSwitcher } from "./GalleryAssistant/ViewSwitcher";
import { AssistantInput } from "./GalleryAssistant/AssistantInput";

interface GalleryAssistantProps {
    className?: string;
}

export function GalleryAssistant({ className }: GalleryAssistantProps) {
    const {
        input,
        setInput,
        view,
        setView,
        selectedVisitorId,
        setSelectedVisitorId,
        selectedVisitor,
        messages,
        isLoading,
        handleSend
    } = useGalleryAssistant();

    return (
        <div className={clsx("flex flex-col h-full bg-white text-stone-900 font-sans", className)}>
            <GalleryHeader />

            <ViewSwitcher view={view} setView={setView} />

            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                {view === "dashboard" && <DashboardView />}

                {view === "crm" && (
                    <VisitorCRMView
                        selectedVisitorId={selectedVisitorId}
                        setSelectedVisitorId={setSelectedVisitorId}
                        selectedVisitor={selectedVisitor}
                    />
                )}

                {view === "pr" && <CampaignsView />}

                {view === "live_feed" && (
                    <div className="h-full flex flex-col">
                        <div className="flex-1">
                            <ChatInterface />
                        </div>
                    </div>
                )}

                {view === "chat" && (
                    <ChatConsultantView messages={messages} isLoading={isLoading} />
                )}
            </div>

            <AssistantInput
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                isLoading={isLoading}
            />
        </div>
    );
}
