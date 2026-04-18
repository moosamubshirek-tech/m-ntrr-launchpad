import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

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
    a: "Please contact us directly for refund-related queries.",
  },
  {
    q: "How do I enroll?",
    a: "Click the 'Enroll Now' button on our website, fill in the Google Form, and our team will contact you within 24 hours.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 bg-lavender relative">
      <div className="section-number">07</div>
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-10">
            Frequently Asked <span className="squiggly-underline text-primary">Questions</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-background border-2 border-border rounded-3xl overflow-hidden transition-all"
                style={{ boxShadow: openIdx === i ? '4px 4px 0px hsl(var(--primary) / 0.2)' : '3px 3px 0px hsl(var(--foreground) / 0.05)' }}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm sm:text-base hover:text-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-3 transition-colors ${openIdx === i ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                    {openIdx === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <AnimatePresence>
                  {openIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
