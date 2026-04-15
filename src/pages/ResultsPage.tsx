import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Trophy } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import WavyDivider from "@/components/WavyDivider";

export default function ResultsPage() {
  const [toppers, setToppers] = useState<Tables<"toppers">[]>([]);
  const [testimonials, setTestimonials] = useState<Tables<"testimonials">[]>([]);

  useEffect(() => {
    supabase.from("toppers").select("*").then(({ data }) => { if (data) setToppers(data); });
    supabase.from("testimonials").select("*").then(({ data }) => { if (data) setTestimonials(data); });
  }, []);

  return (
    <div className="pt-24">
      <section className="bg-lavender py-20 relative overflow-hidden">
        <div className="blob-rose w-[300px] h-[300px] -top-10 -right-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
              Our <span className="squiggly-underline text-accent">Results</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our students' success is our greatest achievement
            </p>
          </ScrollReveal>
          <div className="flex justify-center gap-12 mt-10">
            <AnimatedCounter end={100} suffix="+" label="Admissions" />
            <AnimatedCounter end={2} label="AIR 1 Holders" />
          </div>
        </div>
        <WavyDivider nextBg="white" />
      </section>

      {/* Toppers Grid */}
      <section className="py-16 bg-background relative">
        <div className="section-number">01</div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-center mb-10">
              Wall of <span className="squiggly-underline text-primary">Fame</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {toppers.map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.1}>
                <div className={`bg-card border-l-[4px] border-accent rounded-3xl p-6 text-center hover:shadow-lg transition-all relative ${i % 2 === 0 ? 'card-tilt-left' : 'card-tilt-right'}`} style={{ boxShadow: '4px 4px 0px hsl(var(--foreground) / 0.08)' }}>
                  {t.rank.includes("1") && (
                    <div className="absolute -top-3 -right-2">
                      <div className="ribbon-badge text-xs">⭐ AIR 1</div>
                    </div>
                  )}
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                    <Trophy className="text-primary" size={28} />
                  </div>
                  <h3 className="font-bold text-lg">{t.name}</h3>
                  <p className="text-accent font-bold text-sm">{t.rank} — {t.subject}</p>
                  {t.university && <p className="text-muted-foreground text-xs mt-1">{t.university}</p>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <WavyDivider nextBg="lavender" />
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-lavender">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl font-black text-center text-foreground mb-10">
                Student <span className="squiggly-underline text-accent">Stories</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((t) => (
                <ScrollReveal key={t.id}>
                  <div className="rounded-3xl overflow-hidden border-2 border-border bg-background" style={{ boxShadow: '4px 4px 0px hsl(var(--foreground) / 0.08)' }}>
                    <iframe
                      src={t.youtube_url.replace("watch?v=", "embed/")}
                      title={t.student_name || "Testimonial"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full aspect-video"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* YouTube Playlist */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-center mb-10">
              More <span className="squiggly-underline text-accent">Testimonials</span>
            </h2>
            <div className="rounded-3xl overflow-hidden border-2 border-border" style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}>
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLA_9eRykc5j3opJL8nE_VrVbJ6jpPPfMM"
                title="Testimonial Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
