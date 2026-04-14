import ScrollReveal from "@/components/ScrollReveal";

const universities = [
  "Delhi University", "JNU", "AMU", "BHU", "Jamia Millia",
  "EFLU", "TISS", "CUK", "Pondicherry University", "Hyderabad Central",
  "Allahabad University", "Visva-Bharati",
];

export default function UniversityStrip() {
  return (
    <section className="py-14 bg-navy overflow-hidden">
      <ScrollReveal>
        <h3 className="text-center text-primary-foreground/50 text-xs font-bold tracking-widest uppercase mb-8">
          Top Universities Accepting CUET Scores
        </h3>
      </ScrollReveal>
      <div className="relative">
        <div className="flex animate-scroll-left gap-10 whitespace-nowrap">
          {[...universities, ...universities].map((u, i) => (
            <span
              key={i}
              className="text-primary-foreground/20 font-bold text-lg sm:text-xl px-4 shrink-0"
            >
              {u}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
