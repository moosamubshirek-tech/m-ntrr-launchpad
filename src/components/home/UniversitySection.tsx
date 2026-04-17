import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import WavyDivider from "@/components/WavyDivider";
import { supabase } from "@/integrations/supabase/client";

type Uni = {
  id: string;
  name: string;
  tag: string | null;
  streams: string;
  seats_info: string | null;
  estimated_cutoff: string | null;
};

export default function UniversitySection() {
  const [universities, setUniversities] = useState<Uni[]>([]);

  useEffect(() => {
    supabase
      .from("universities")
      .select("*")
      .eq("active", true)
      .order("display_order")
      .then(({ data }) => {
        if (data) setUniversities(data as Uni[]);
      });
  }, []);

  return (
    <section className="py-20 bg-background relative">
      <div className="section-number">08</div>
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-3">
            Top <span className="squiggly-underline text-accent">Central Universities</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Where mêntrr. students aim — and where they get in
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {universities.map((u, i) => (
            <ScrollReveal key={u.id} delay={(i % 4) * 0.05}>
              <div
                className="bg-card border-l-[3px] border-primary rounded-2xl p-5 hover:-translate-y-1 transition-all h-full"
                style={{ boxShadow: '3px 3px 0px hsl(var(--foreground) / 0.06)' }}
              >
                <h3 className="font-bold text-foreground text-base leading-tight mb-2">
                  {u.name}
                </h3>
                {u.tag && (
                  <span className="inline-block text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full mb-3">
                    {u.tag}
                  </span>
                )}
                <p className="text-muted-foreground text-xs leading-snug">{u.streams}</p>
                {u.seats_info && (
                  <p className="text-muted-foreground text-xs mt-1">{u.seats_info}</p>
                )}
                {u.estimated_cutoff && (
                  <p className="text-accent font-bold text-sm mt-3">
                    Cutoff: {u.estimated_cutoff}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div
            className="mt-10 max-w-3xl mx-auto bg-lavender border-2 border-primary/20 rounded-3xl p-5 text-center"
            style={{ boxShadow: '4px 4px 0px hsl(var(--foreground) / 0.06)' }}
          >
            <p className="text-sm sm:text-base font-semibold text-foreground">
              💡 mêntrr. students have secured admissions in <span className="text-primary">10+ central universities</span> including DU, BHU, JNU and more.
            </p>
          </div>
        </ScrollReveal>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="lavender" />
      </div>
    </section>
  );
}
