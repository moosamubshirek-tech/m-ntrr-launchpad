import { useEffect, useState, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, useInView } from "framer-motion";
import { Trophy, Star } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import type { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";

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
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            Our <span className="text-coral">Toppers</span>
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
            <TopperCard key={t.id} topper={t} delay={i * 0.15} />
          ))}
        </div>

        {/* Live ticker */}
        <div className="bg-navy rounded-xl py-3 px-6 max-w-md mx-auto overflow-hidden relative h-10">
          <motion.div
            key={tickerIdx}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-primary-foreground/80 text-sm text-center font-medium absolute inset-0 flex items-center justify-center"
          >
            {tickerMessages[tickerIdx]}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TopperCard({ topper, delay }: { topper: Tables<"toppers">; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <ScrollReveal delay={delay}>
      <div
        ref={ref}
        className="relative bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        {inView && topper.rank.includes("1") && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -top-3 -right-3"
            >
              <Star className="text-yellow-400 fill-yellow-400" size={28} />
            </motion.div>
          </>
        )}
        <div className="w-16 h-16 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-4">
          <Trophy className="text-coral" size={28} />
        </div>
        <h3 className="font-bold text-lg">{topper.name}</h3>
        <p className="text-coral font-bold text-sm">{topper.rank} — {topper.subject}</p>
        {topper.university && (
          <p className="text-muted-foreground text-xs mt-1">{topper.university}</p>
        )}
      </div>
    </ScrollReveal>
  );
}
