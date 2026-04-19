import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { GraduationCap, Users, University, Target, BookOpen } from "lucide-react";
import WavyDivider from "@/components/WavyDivider";

const cuetStats = [
  { icon: Target, end: 2, suffix: "nd", label: "Largest Entrance Exam in India" },
  { icon: Users, end: 15, suffix: " Lakh+", label: "Students Compete" },
  { icon: University, end: 45, suffix: "+", label: "Central Universities" },
  { icon: GraduationCap, end: 1, suffix: " Lakh+", label: "UG Seats at Stake" },
];

const ncetStats = [
  { icon: GraduationCap, end: 20, suffix: "+", label: "Participating States" },
  { icon: University, end: 60, suffix: "+", label: "Participating Universities" },
  { icon: Users, end: 5, suffix: " Lakh+", label: "Students Appear" },
  { icon: BookOpen, end: 1, suffix: "", label: "Exam. All B.Ed Seats." },
];

export default function AboutCUETSection() {
  const [tab, setTab] = useState<"CUET" | "NCET">("CUET");
  const stats = tab === "CUET" ? cuetStats : ncetStats;

  return (
    <section className="py-20 bg-background relative">
      <div className="section-number">01</div>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            What is <span className="squiggly-underline text-primary">{tab}?</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            {tab === "CUET"
              ? "The Common University Entrance Test (CUET) is India's gateway to top central universities. Don't let this opportunity pass you by."
              : "The National Common Entrance Test (NCET) is your single gateway to integrated B.Ed programmes across India's top universities."}
          </p>
        </ScrollReveal>

        {/* Tab toggle */}
        <div className="flex justify-center gap-2 mb-10">
          {(["CUET", "NCET"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                tab === t
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              style={tab === t ? { boxShadow: '3px 3px 0px hsl(var(--foreground) / 0.15)' } : {}}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((s, i) => (
            <ScrollReveal key={`${tab}-${i}`} delay={i * 0.1}>
              <div className={`bg-card border-l-[3px] border-primary rounded-3xl p-6 text-center hover:shadow-lg transition-all duration-300 ${i % 2 === 0 ? 'card-tilt-left' : 'card-tilt-right'}`}>
                <s.icon className="mx-auto mb-3 text-primary" size={32} />
                <div className="text-2xl sm:text-3xl font-black text-foreground">
                  {s.end}{s.suffix}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
                  {s.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="blush" />
      </div>
    </section>
  );
}
