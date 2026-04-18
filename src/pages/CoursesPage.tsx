import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, Flame } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import WavyDivider from "@/components/WavyDivider";
import { useSetting } from "@/hooks/useSettings";

const subjects: Record<string, string[]> = {
  Science: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
<<<<<<< HEAD
  Commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
  Humanities: ["History", "Political Science", "Sociology", "Psychology"],
=======
  Commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics", "Entrepreneurship"],
  Humanities: ["History", "Political Science", "Geography", "Sociology", "Psychology", "Philosophy"],
>>>>>>> ed843df3e1ad1e1710a571fbbf28d860abddf8af
};

export default function CoursesPage() {
  const [batches, setBatches] = useState<Tables<"batches">[]>([]);
  const [showEarly, setShowEarly] = useState(true);
  const fallbackEnroll = useSetting("enrollment_link");

  useEffect(() => {
    supabase.from("batches").select("*").then(({ data }) => {
      if (data) setBatches(data);
    });
  }, []);

  return (
    <div className="pt-24">
      <section className="bg-lavender py-20 relative overflow-hidden">
        <div className="blob-indigo w-[300px] h-[300px] -top-10 -left-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
              Our <span className="squiggly-underline text-accent">Courses</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive crash courses for CUET UG and NCET 2026
            </p>
          </ScrollReveal>
        </div>
        <WavyDivider nextBg="white" />
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-semibold ${!showEarly ? "text-foreground" : "text-muted-foreground"}`}>Original Price</span>
            <button
              onClick={() => setShowEarly(!showEarly)}
              className={`w-14 h-7 rounded-full transition-colors relative ${showEarly ? "bg-accent" : "bg-muted"}`}
            >
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-background shadow transition-transform ${showEarly ? "left-7" : "left-0.5"}`} />
            </button>
            <span className={`text-sm font-semibold ${showEarly ? "text-accent" : "text-muted-foreground"}`}>Early Bird 🔥</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {batches.map((batch, i) => (
              <ScrollReveal key={batch.id} delay={i * 0.1}>
                <div className={`bg-card border-t-[4px] border-primary rounded-3xl p-8 hover:shadow-lg transition-all relative ${i % 2 === 0 ? 'card-tilt-left' : 'card-tilt-right'}`} style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}>
                  <div className="absolute -top-3 right-6 ribbon-badge text-xs">
                    <Flame size={12} className="inline mr-1" /> Seats Filling Fast
                  </div>
                  <h3 className="text-xl font-bold mb-2">{batch.name}</h3>
                  <div className="text-3xl font-black text-accent mb-6">
                    ₹{(showEarly && batch.early_bird_active ? batch.price_early_bird : batch.price_original).toLocaleString()}
                    {showEarly && batch.early_bird_active && (
                      <span className="text-muted-foreground line-through text-lg ml-3 font-normal">
                        ₹{batch.price_original.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {batch.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check size={16} className="text-primary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={batch.enrollment_link || fallbackEnroll}
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
        <WavyDivider nextBg="lavender" />
      </section>

      <section className="py-16 bg-lavender relative">
        <div className="section-number">02</div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-center text-foreground mb-10">
              Subjects <span className="squiggly-underline text-primary">Covered</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(subjects).map(([stream, subs], i) => (
              <ScrollReveal key={stream} delay={i * 0.1}>
                <div className={`bg-background border-l-[3px] border-primary rounded-3xl p-6 ${i % 2 === 0 ? 'card-tilt-left' : 'card-tilt-right'}`} style={{ boxShadow: '4px 4px 0px hsl(var(--foreground) / 0.08)' }}>
                  <h3 className="font-bold text-accent mb-4">{stream}</h3>
                  <ul className="space-y-2">
                    {subs.map((s) => (
                      <li key={s} className="text-muted-foreground text-sm flex items-center gap-2">
                        <Check size={14} className="text-primary" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
