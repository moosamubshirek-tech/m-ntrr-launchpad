import ScrollReveal from "@/components/ScrollReveal";
import { Trophy, Video, Target, Users } from "lucide-react";
import WavyDivider from "@/components/WavyDivider";

const items = [
  {
    icon: Trophy,
    title: "Kerala's Only CUET Specialist",
    desc: "The only platform in Kerala 100% dedicated to CUET & NCET preparation.",
  },
  {
    icon: Video,
    title: "Live + Recorded Classes",
    desc: "Daily live sessions with full recordings. Never miss a class, revise anytime.",
  },
  {
    icon: Target,
    title: "Proven Track Record",
    desc: "2× AIR 1 ranks. 100+ admissions to top central universities across India.",
  },
  {
    icon: Users,
    title: "Personal Mentoring",
    desc: "1-on-1 doubt clearing and exam strategy from our expert team.",
  },
];

export default function WhyMentrrSection() {
  return (
    <section className="py-20 bg-blush relative">
      <div className="section-number right-10 left-auto">02</div>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            Why Students Choose <span className="squiggly-underline text-primary">mêntrr.</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Built specifically for Kerala students who want top central university admissions
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {items.map((it, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                className={`bg-card border-t-[4px] border-primary rounded-3xl p-6 text-center hover:-translate-y-1 transition-all h-full ${i % 2 === 0 ? 'card-tilt-left' : 'card-tilt-right'}`}
                style={{ boxShadow: '4px 4px 0px hsl(var(--foreground) / 0.08)' }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                  <it.icon className="text-primary" size={26} />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-base">{it.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{it.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="white" />
      </div>
    </section>
  );
}
