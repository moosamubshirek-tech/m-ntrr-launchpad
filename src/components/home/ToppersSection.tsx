import { useEffect, useState, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, useInView } from "framer-motion";
import { Trophy } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import type { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import WavyDivider from "@/components/WavyDivider";

const tickerMessages = [
  "Arjun from Kozhikode just enrolled 🎉",
  "Fathima from Malappuram joined CUET Batch 🎉",
  "Sneha from Kannur enrolled in NCET Batch 🔥",
  "Amal from Thrissur just signed up 🎉",
  "Riya from Kochi joined CUET Crash Batch 🚀",
];

export default function ToppersSection() {
  const [toppers, setToppers] = useState<Tables<"toppers">[]>([]);
  const [tickerIdx, setTickerIdx] = useState(0);

  useEffect(() => {
    supabase.from("toppers").select("*").then(({ data }) => {
      if (data) setToppers(data);
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTickerIdx((i) => (i + 1) % tickerMessages.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="section-number">05</div>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            Our <span className="squiggly-underline text-accent">Toppers</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            The Wall of Fame — mêntrr. students who conquered CUET
          </p>
        </ScrollReveal>

        <div className="flex justify-center mb-10">
          <AnimatedCounter end={100} suffix="+" label="Students at Top Central Universities" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
          {toppers.map((t, i) => (
            <TopperCard key={t.id} topper={t} delay={i * 0.15} index={i} />
          ))}
        </div>

        {/* Live ticker */}
        <div className="bg-primary rounded-3xl py-3 px-6 max-w-md mx-auto overflow-hidden relative h-10" style={{ boxShadow: '4px 4px 0px hsl(var(--foreground) / 0.15)' }}>
          <motion.div
            key={tickerIdx}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-primary-foreground/90 text-sm text-center font-medium absolute inset-0 flex items-center justify-center"
          >
            {tickerMessages[tickerIdx]}
          </motion.div>
        </div>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="lavender" />
      </div>
    </section>
  );
}

function TopperCard({ topper, delay, index }: { topper: Tables<"toppers">; delay: number; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <ScrollReveal delay={delay}>
      <div
        ref={ref}
        className={`relative bg-card border-l-[4px] border-accent rounded-3xl p-6 text-center hover:shadow-lg transition-all duration-300 ${index % 2 === 0 ? 'card-tilt-left' : 'card-tilt-right'}`}
        style={{ boxShadow: '4px 4px 0px hsl(var(--foreground) / 0.08)' }}
      >
        {inView && topper.rank.includes("1") && (
          <div className="absolute -top-4 -right-2">
            <div className="ribbon-badge text-xs">⭐ AIR 1</div>
          </div>
        )}
        {topper.photo_url ? (
          <img
            src={topper.photo_url}
            alt={topper.name}
            className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-2 border-primary/30"
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
            <Trophy className="text-primary" size={28} />
          </div>
        )}
        <h3 className="font-bold text-lg">{topper.name}</h3>
        <p className="text-accent font-bold text-sm">{topper.rank} — {topper.subject}</p>
        {topper.university && (
          <p className="text-muted-foreground text-xs mt-1">{topper.university}</p>
        )}
      </div>
    </ScrollReveal>
  );
}
