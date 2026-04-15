import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { GraduationCap, Users, University, Target } from "lucide-react";
import WavyDivider from "@/components/WavyDivider";

const stats = [
  { icon: Target, end: 2, suffix: "nd", label: "Largest Entrance Exam in India" },
  { icon: Users, end: 15, suffix: " Lakh+", label: "Students Compete" },
  { icon: University, end: 45, suffix: "+", label: "Central Universities" },
  { icon: GraduationCap, end: 1, suffix: " Lakh+", label: "UG Seats at Stake" },
];

export default function AboutCUETSection() {
  return (
    <section className="py-20 bg-background relative">
      <div className="section-number">01</div>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            What is <span className="squiggly-underline text-primary">CUET?</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            The Common University Entrance Test (CUET) is India's gateway to top central universities.
            Don't let this opportunity pass you by.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
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
        <WavyDivider nextBg="lavender" />
      </div>
    </section>
  );
}
