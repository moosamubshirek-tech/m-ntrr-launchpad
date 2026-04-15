import ScrollReveal from "@/components/ScrollReveal";
import WavyDivider from "@/components/WavyDivider";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-lavender relative">
      <div className="section-number right-10 left-auto">06</div>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center text-foreground mb-4">
            Student <span className="squiggly-underline text-accent">Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Hear from our students who aced CUET
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden border-2 border-border bg-background" style={{ boxShadow: '6px 6px 0px hsl(var(--foreground) / 0.08)' }}>
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=PLA_9eRykc5j3opJL8nE_VrVbJ6jpPPfMM"
              title="Student Testimonials"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video"
            />
          </div>
        </ScrollReveal>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="white" />
      </div>
    </section>
  );
}
