import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Target, Heart, Lightbulb, Award } from "lucide-react";

const milestones = [
  { year: "2023", title: "Founded in Kozhikode", desc: "mêntrr. was born with a mission to make CUET coaching accessible" },
  { year: "2024", title: "First AIR 1 — Niveda MR", desc: "Our student secured All India Rank 1 in English" },
  { year: "2024", title: "100+ Admissions", desc: "Students secured seats at DU, JNU, BHU and more" },
  { year: "2025", title: "NCET Batch Launch", desc: "Expanded to cover NCET alongside CUET coaching" },
  { year: "2026", title: "Crash Batches Open", desc: "Intensive crash courses for CUET & NCET 2026" },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-black text-primary-foreground mb-4">
              About <span className="text-coral">mêntrr.</span>
            </h1>
            <p className="text-primary-foreground/60 max-w-2xl mx-auto text-lg">
              Founded in 2023 in Kozhikode, Kerala — we're on a mission to help every student crack CUET and get into their dream university.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <AnimatedCounter end={100} suffix="+" label="Admissions" />
            <AnimatedCounter end={2} label="AIR 1s" />
            <AnimatedCounter end={2023} label="Founded" duration={1.5} />
            <AnimatedCounter end={45} suffix="+" label="Universities" />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Result-Driven", desc: "Every class, every strategy is designed with one goal — your admission." },
              { icon: Heart, title: "Student-First", desc: "Personal mentorship, doubt solving, and strategy sessions for every student." },
              { icon: Lightbulb, title: "Smart Prep", desc: "Focus on high-yield topics, PYQ patterns, and exam-day strategies." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-navy-light border border-primary-foreground/10 rounded-2xl p-6 text-center">
                  <item.icon className="mx-auto mb-3 text-coral" size={32} />
                  <h3 className="font-bold text-primary-foreground mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/60 text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-center mb-12">
              Our <span className="text-coral">Journey</span>
            </h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            {milestones.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative pl-12 pb-10">
                  <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-coral" />
                  <span className="text-coral font-bold text-sm">{m.year}</span>
                  <h3 className="font-bold mt-1">{m.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
