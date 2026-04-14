import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, Flame } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

export default function BatchCardsSection() {
  const [batches, setBatches] = useState<Tables<"batches">[]>([]);

  useEffect(() => {
    supabase.from("batches").select("*").then(({ data }) => {
      if (data) setBatches(data);
    });
  }, []);

  return (
    <section className="py-20 bg-navy">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center text-primary-foreground mb-4">
            Choose Your <span className="text-coral">Batch</span>
          </h2>
          <p className="text-primary-foreground/60 text-center max-w-xl mx-auto mb-12">
            Comprehensive crash courses designed for maximum results
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {batches.map((batch, i) => (
            <ScrollReveal key={batch.id} delay={i * 0.15}>
              <div className="relative bg-navy-light border border-primary-foreground/10 rounded-2xl p-8 hover:border-coral/50 hover:-translate-y-2 transition-all duration-300 group">
                {/* Seats badge */}
                <div className="absolute -top-3 right-6 flex items-center gap-1 bg-coral text-primary-foreground text-xs font-bold px-3 py-1 rounded-full animate-pulse-glow">
                  <Flame size={12} /> Seats Filling Fast
                </div>

                {batch.early_bird_active && (
                  <span className="inline-block bg-coral/20 text-coral text-xs font-bold px-3 py-1 rounded-full mb-4">
                    🎉 Early Bird Offer
                  </span>
                )}

                <h3 className="text-xl font-bold text-primary-foreground mb-2">{batch.name}</h3>
                <p className="text-primary-foreground/50 text-sm mb-4">
                  {batch.exam === "CUET" ? "Science • Commerce • Humanities" : "All Streams"}
                </p>

                <div className="flex items-end gap-3 mb-6">
                  {batch.early_bird_active && (
                    <span className="text-primary-foreground/40 line-through text-lg">
                      ₹{batch.price_original.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-black text-coral">
                    ₹{(batch.early_bird_active ? batch.price_early_bird : batch.price_original).toLocaleString()}
                  </span>
                </div>

                <ul className="space-y-2.5 mb-8">
                  {batch.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                      <Check size={16} className="text-coral shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={batch.enrollment_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-coral text-primary-foreground py-3 rounded-full font-bold hover:bg-coral-light transition-colors glow-coral-sm"
                >
                  Enroll Now
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
