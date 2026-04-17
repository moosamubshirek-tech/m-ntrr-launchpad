import ScrollReveal from "@/components/ScrollReveal";
import WavyDivider from "@/components/WavyDivider";
import { MessageCircle } from "lucide-react";
import { useSetting } from "@/hooks/useSettings";

export default function WhatsAppCommunitySection() {
  const link = useSetting("whatsapp_group_link");

  return (
    <section className="py-20 bg-lavender relative">
      <div className="section-number">09</div>
      <div className="container mx-auto px-4 text-center relative z-10 max-w-2xl">
        <ScrollReveal>
          <div
            className="inline-flex w-20 h-20 rounded-full items-center justify-center mb-6"
            style={{ background: "rgba(37, 211, 102, 0.15)" }}
          >
            <MessageCircle size={42} style={{ color: "#25D366" }} fill="currentColor" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            Join Our Free <span className="squiggly-underline text-primary">CUET Community</span>
          </h2>
          <p className="text-muted-foreground mb-8 text-base">
            Daily PYQs · Exam updates · Tips from AIR toppers · 500+ Kerala students
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-lg btn-cartoon hover:opacity-90 transition-opacity"
            style={{ background: "#25D366", color: "white" }}
          >
            <MessageCircle size={20} fill="currentColor" /> Join WhatsApp Group →
          </a>
          <p className="text-muted-foreground text-xs mt-4">Free forever. No spam.</p>
        </ScrollReveal>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="white" />
      </div>
    </section>
  );
}
