import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Target, Heart, Lightbulb } from "lucide-react";
import WavyDivider from "@/components/WavyDivider";

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-lavender py-20 relative overflow-hidden">
        <div className="blob-indigo w-[300px] h-[300px] -top-10 -right-10" />
        <div className="blob-rose w-[200px] h-[200px] bottom-0 left-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
              About <span className="squiggly-underline text-accent">mêntrr.</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Kerala's No.1 CUET & NCET coaching platform — built for students who want top central university admissions.
            </p>
          </ScrollReveal>
        </div>
        <WavyDivider nextBg="white" />
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <AnimatedCounter end={100} suffix="+" label="Admissions" />
            <AnimatedCounter end={2} label="AIR 1s" />
            <AnimatedCounter end={500} suffix="+" label="Students Mentored" />
            <AnimatedCounter end={45} suffix="+" label="Universities" />
          </div>
        </div>
        <div className="mt-10">
          <WavyDivider nextBg="lavender" />
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-lavender relative">
        <div className="section-number">01</div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Result-Driven", desc: "Every class, every strategy is designed with one goal — your admission." },
              { icon: Heart, title: "Student-First", desc: "Personal mentorship, doubt solving, and strategy sessions for every student." },
              { icon: Lightbulb, title: "Smart Prep", desc: "Focus on high-yield topics, PYQ patterns, and exam-day strategies." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`bg-background border-t-[3px] border-primary rounded-3xl p-6 text-center ${i % 2 === 0 ? 'card-tilt-left' : 'card-tilt-right'}`} style={{ boxShadow: '4px 4px 0px hsl(var(--foreground) / 0.08)' }}>
                  <item.icon className="mx-auto mb-3 text-accent" size={32} />
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
