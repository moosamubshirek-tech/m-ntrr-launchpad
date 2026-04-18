import ScrollReveal from "@/components/ScrollReveal";
import { Play, FileText } from "lucide-react";
import WavyDivider from "@/components/WavyDivider";

export default function FreeDemoSection() {
  return (
    <section id="free-demo" className="py-20 bg-background relative">
      <div className="section-number">04</div>
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-3">
            Try Before You <span className="squiggly-underline text-accent">Enroll</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Experience our teaching style. Zero commitment.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Sample Class */}
          <ScrollReveal delay={0.1}>
            <div
              className="bg-card border-t-[4px] border-primary rounded-3xl p-7 text-center h-full card-tilt-left hover:-translate-y-1 transition-all"
              style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                <Play className="text-primary ml-0.5" size={26} fill="currentColor" />
              </div>
              <h3 className="font-black text-xl mb-3">Free Sample Class</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Watch a full live session — see how we teach CUET subjects with clarity and exam focus before you commit.
              </p>
              <a
                href={ytLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold btn-cartoon hover:bg-indigo-light transition-colors"
              >
                Watch Free Class →
              </a>
            </div>
          </ScrollReveal>

          {/* Free Mock Test */}
          <ScrollReveal delay={0.2}>
            <div
              className="bg-card border-t-[4px] border-accent rounded-3xl p-7 text-center h-full card-tilt-right hover:-translate-y-1 transition-all"
              style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20">
                <FileText className="text-accent" size={26} />
              </div>
              <h3 className="font-black text-xl mb-3">Free Mock Test</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Practice with our CUET & NCET sample mock tests — real exam pattern, answer key included. Get a feel for the actual exam.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`${wa}?text=Hi%2C%20please%20share%20the%20free%20CUET%20mock%20test`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-accent-foreground px-5 py-2.5 rounded-full font-bold btn-cartoon hover:bg-rose-light transition-colors text-sm"
                >
                  CUET Mock →
                </a>
                <a
                  href={`${wa}?text=Hi%2C%20please%20share%20the%20free%20NCET%20mock%20test`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-bold btn-cartoon hover:bg-indigo-light transition-colors text-sm"
                >
                  NCET Mock →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="lavender" />
      </div>
    </section>
  );
}
