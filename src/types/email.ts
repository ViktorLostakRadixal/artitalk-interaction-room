export interface Email {
    id: string;
    visitorId: string;
    sender: string;
    recipient: string;
    subject: string;
    content: string;
    timestamp: string;
    status: "sent" | "delivered" | "failed";
}
