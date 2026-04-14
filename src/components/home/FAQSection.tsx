import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is CUET UG?",
    a: "CUET UG (Common University Entrance Test for Undergraduate programs) is a national-level entrance exam conducted by NTA for admissions to central universities and other participating institutions across India.",
  },
  {
    q: "What is NCET?",
    a: "NCET (National Common Entrance Test) is a newly introduced entrance exam for admission to B.Ed programs across India, replacing multiple state-level entrance tests.",
  },
  {
    q: "Who can join mêntrr. batches?",
    a: "Any student appearing for CUET UG 2026 or NCET 2026 can join. We offer batches for Science, Commerce, and Humanities streams.",
  },
  {
    q: "Are classes live or recorded?",
    a: "We offer daily live interactive sessions. All classes are also recorded and available for revision anytime.",
  },
  {
    q: "What subjects are covered?",
    a: "For CUET: All domain subjects (Physics, Chemistry, Biology, History, Economics, Political Science, etc.), General Test, and English. For NCET: All relevant sections.",
  },
  {
    q: "Is there a refund policy?",
    a: "Please contact us directly at 7909 228 688 for refund-related queries.",
  },
  {
    q: "How do I enroll?",
    a: "Click the 'Enroll Now' button on our website, fill in the Google Form, and our team will contact you within 24 hours.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-10">
            Frequently Asked <span className="text-coral">Questions</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-xl px-5 data-[state=open]:border-coral/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-sm sm:text-base hover:no-underline hover:text-coral transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
