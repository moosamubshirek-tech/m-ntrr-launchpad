import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Trophy, Star } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

export default function ResultsPage() {
  const [toppers, setToppers] = useState<Tables<"toppers">[]>([]);
  const [testimonials, setTestimonials] = useState<Tables<"testimonials">[]>([]);

  useEffect(() => {
    supabase.from("toppers").select("*").then(({ data }) => { if (data) setToppers(data); });
    supabase.from("testimonials").select("*").then(({ data }) => { if (data) setTestimonials(data); });
  }, []);

  return (
    <div className="pt-24">
      <section className="bg-navy py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-black text-primary-foreground mb-4">
              Our <span className="text-coral">Results</span>
            </h1>
            <p className="text-primary-foreground/60 max-w-xl mx-auto">
              Our students' success is our greatest achievement
            </p>
          </ScrollReveal>
          <div className="flex justify-center gap-12 mt-10">
            <AnimatedCounter end={100} suffix="+" label="Admissions" />
            <AnimatedCounter end={2} label="AIR 1 Holders" />
          </div>
        </div>
      </section>

      {/* Toppers Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-center mb-10">
              Wall of <span className="text-coral">Fame</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {toppers.map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all relative">
                  {t.rank.includes("1") && (
                    <Star className="absolute -top-2 -right-2 text-yellow-400 fill-yellow-400" size={24} />
                  )}
                  <div className="w-16 h-16 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="text-coral" size={28} />
                  </div>
                  <h3 className="font-bold text-lg">{t.name}</h3>
                  <p className="text-coral font-bold text-sm">{t.rank} — {t.subject}</p>
                  {t.university && <p className="text-muted-foreground text-xs mt-1">{t.university}</p>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-navy">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl font-black text-center text-primary-foreground mb-10">
                Student <span className="text-coral">Stories</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((t) => (
                <ScrollReveal key={t.id}>
                  <div className="rounded-xl overflow-hidden border border-primary-foreground/10">
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
              More <span className="text-coral">Testimonials</span>
            </h2>
            <div className="rounded-2xl overflow-hidden border border-border">
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
