import { MessageCircle } from "lucide-react";
import { useSetting, normalizePhone } from "@/hooks/useSettings";

export default function WhatsAppButton() {
  const phone = useSetting("phone");
  const { wa } = normalizePhone(phone);
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-primary-foreground rounded-full p-4 shadow-2xl transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" />
    </a>
  );
}
