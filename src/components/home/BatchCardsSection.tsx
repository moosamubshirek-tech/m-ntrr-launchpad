import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, Flame } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import WavyDivider from "@/components/WavyDivider";
import { useSetting } from "@/hooks/useSettings";

type Batch = Tables<"batches"> & { seats_total?: number; seats_filled?: number };

export default function BatchCardsSection() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const enrollLink = useSetting("enrollment_link");

  useEffect(() => {
    supabase.from("batches").select("*").then(({ data }) => {
      if (data) setBatches(data as Batch[]);
    });
  }, []);

  const scrollDemo = () => document.getElementById("free-demo")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="py-20 bg-lavender relative">
      <div className="section-number right-10 left-auto">03</div>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center text-foreground mb-4">
            Choose Your <span className="squiggly-underline text-primary">Batch</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Comprehensive crash courses designed for maximum results
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {batches.map((batch, i) => {
            const seatsTotal = (batch.seats_total ?? 0) > 0 ? batch.seats_total! : 0;
            const seatsFilled = batch.seats_filled ?? 0;
            const showSeats = seatsTotal > 0;
            const pct = showSeats ? Math.min(100, Math.round((seatsFilled / seatsTotal) * 100)) : 0;

            return (
              <ScrollReveal key={batch.id} delay={i * 0.15}>
                <div className={`relative bg-background border-t-[4px] border-primary rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 group ${i % 2 === 0 ? 'card-tilt-left' : 'card-tilt-right'}`} style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}>
                  <div className="absolute -top-3 right-6 ribbon-badge text-xs">
                    <Flame size={12} className="inline mr-1" /> Seats Filling Fast 🔥
                  </div>

                  {batch.early_bird_active && (
                    <span className="ribbon-badge text-xs mb-4 inline-block">
                      🎉 Early Bird Offer
                    </span>
                  )}

                  <h3 className="text-xl font-bold text-foreground mb-2">{batch.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {batch.exam === "CUET" ? "Science • Commerce • Humanities" : "All Streams"}
                  </p>

                  {/* Tag row */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="text-[11px] font-bold bg-rose/10 text-rose px-2.5 py-1 rounded-full">🔴 Live + Recorded</span>
                    <span className="text-[11px] font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">📅 {batch.exam} 2026</span>
                    <span className="text-[11px] font-bold bg-accent/10 text-accent px-2.5 py-1 rounded-full">👨‍🏫 Expert Faculty</span>
                  </div>

                  <div className="flex items-end gap-3 mb-5">
                    {batch.early_bird_active && (
                      <span className="text-muted-foreground line-through text-lg">
                        ₹{batch.price_original.toLocaleString()}
                      </span>
                    )}
                    <span className="text-3xl font-black text-accent">
                      ₹{(batch.early_bird_active ? batch.price_early_bird : batch.price_original).toLocaleString()}
                    </span>
                  </div>

                  {/* Seats progress */}
                  {showSeats && (
                    <div className="mb-5">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                        <span className="font-semibold">Seats filled</span>
                        <span className="font-bold text-foreground">{seatsFilled}/{seatsTotal}</span>
                      </div>
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <ul className="space-y-2.5 mb-6">
                    {batch.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-foreground/70">
                        <Check size={16} className="text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={scrollDemo}
                    className="block w-full text-center border-2 border-primary text-primary py-2.5 rounded-full font-bold hover:bg-primary/5 transition-colors mb-3 text-sm"
                  >
                    Watch Free Demo Class
                  </button>

                  <a
                    href={batch.enrollment_link || enrollLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-accent text-accent-foreground py-3 rounded-full font-bold btn-cartoon hover:bg-rose-light transition-colors"
                  >
                    Enroll Now
                  </a>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom CTA ribbon */}
        <ScrollReveal delay={0.3}>
          <div
            className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
            style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.15)' }}
          >
            <p className="font-black text-lg sm:text-xl">🎓 Admissions closing soon — Secure your seat today</p>
            <a
              href={enrollLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background text-foreground px-6 py-3 rounded-full font-bold btn-cartoon shrink-0 hover:bg-lavender transition-colors"
            >
              Enroll Now →
            </a>
          </div>
        </ScrollReveal>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="white" />
      </div>
    </section>
  );
}
