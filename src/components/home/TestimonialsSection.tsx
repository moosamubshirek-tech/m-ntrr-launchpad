import ScrollReveal from "@/components/ScrollReveal";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-navy">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center text-primary-foreground mb-4">
            Student <span className="text-coral">Testimonials</span>
          </h2>
          <p className="text-primary-foreground/60 text-center mb-10 max-w-xl mx-auto">
            Hear from our students who aced CUET
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-primary-foreground/10">
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
    </section>
  );
}
