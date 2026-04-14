import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, Flame } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

const subjects: Record<string, string[]> = {
  Science: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
  Commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics", "Entrepreneurship"],
  Humanities: ["History", "Political Science", "Geography", "Sociology", "Psychology", "Philosophy"],
};

export default function CoursesPage() {
  const [batches, setBatches] = useState<Tables<"batches">[]>([]);
  const [showEarly, setShowEarly] = useState(true);

  useEffect(() => {
    supabase.from("batches").select("*").then(({ data }) => {
      if (data) setBatches(data);
    });
  }, []);

  return (
    <div className="pt-24">
      <section className="bg-navy py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-black text-primary-foreground mb-4">
              Our <span className="text-coral">Courses</span>
            </h1>
            <p className="text-primary-foreground/60 max-w-xl mx-auto">
              Comprehensive crash courses for CUET UG and NCET 2026
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing toggle */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-semibold ${!showEarly ? "text-foreground" : "text-muted-foreground"}`}>Original Price</span>
            <button
              onClick={() => setShowEarly(!showEarly)}
              className={`w-14 h-7 rounded-full transition-colors relative ${showEarly ? "bg-coral" : "bg-muted"}`}
            >
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-primary-foreground shadow transition-transform ${showEarly ? "left-7" : "left-0.5"}`} />
            </button>
            <span className={`text-sm font-semibold ${showEarly ? "text-coral" : "text-muted-foreground"}`}>Early Bird 🔥</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {batches.map((batch, i) => (
              <ScrollReveal key={batch.id} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-8 hover:border-coral/30 hover:shadow-lg transition-all relative">
                  <div className="absolute -top-3 right-6 flex items-center gap-1 bg-coral text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                    <Flame size={12} /> Seats Filling Fast
                  </div>
                  <h3 className="text-xl font-bold mb-2">{batch.name}</h3>
                  <div className="text-3xl font-black text-coral mb-6">
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
                        <Check size={16} className="text-coral shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={batch.enrollment_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-coral text-accent-foreground py-3 rounded-full font-bold hover:bg-coral-light transition-colors"
                  >
                    Enroll Now
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-center text-primary-foreground mb-10">
              Subjects <span className="text-coral">Covered</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(subjects).map(([stream, subs], i) => (
              <ScrollReveal key={stream} delay={i * 0.1}>
                <div className="bg-navy-light border border-primary-foreground/10 rounded-2xl p-6">
                  <h3 className="font-bold text-coral mb-4">{stream}</h3>
                  <ul className="space-y-2">
                    {subs.map((s) => (
                      <li key={s} className="text-primary-foreground/70 text-sm flex items-center gap-2">
                        <Check size={14} className="text-coral" /> {s}
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
