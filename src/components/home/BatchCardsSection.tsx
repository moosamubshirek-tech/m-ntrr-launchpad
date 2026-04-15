import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, Flame } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import WavyDivider from "@/components/WavyDivider";

export default function BatchCardsSection() {
  const [batches, setBatches] = useState<Tables<"batches">[]>([]);

  useEffect(() => {
    supabase.from("batches").select("*").then(({ data }) => {
      if (data) setBatches(data);
    });
  }, []);

  return (
    <section className="py-20 bg-lavender relative">
      <div className="section-number right-10 left-auto">02</div>
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
          {batches.map((batch, i) => (
            <ScrollReveal key={batch.id} delay={i * 0.15}>
              <div className={`relative bg-background border-t-[4px] border-primary rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 group ${i % 2 === 0 ? 'card-tilt-left' : 'card-tilt-right'}`} style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}>
                {/* Seats badge - ribbon shape */}
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

                <div className="flex items-end gap-3 mb-6">
                  {batch.early_bird_active && (
                    <span className="text-muted-foreground line-through text-lg">
                      ₹{batch.price_original.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-black text-accent">
                    ₹{(batch.early_bird_active ? batch.price_early_bird : batch.price_original).toLocaleString()}
                  </span>
                </div>

                <ul className="space-y-2.5 mb-8">
                  {batch.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-foreground/70">
                      <Check size={16} className="text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={batch.enrollment_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-accent text-accent-foreground py-3 rounded-full font-bold btn-cartoon hover:bg-rose-light transition-colors"
                >
                  Enroll Now
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="white" />
      </div>
    </section>
  );
}
