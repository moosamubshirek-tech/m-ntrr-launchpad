import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import WavyDivider from "@/components/WavyDivider";
import { supabase } from "@/integrations/supabase/client";
import { useSetting } from "@/hooks/useSettings";

const questions = [
  {
    q: "Which stream are you in?",
    options: ["🔬 Science", "💼 Commerce", "📜 Humanities", "🤔 Not sure yet"],
  },
  {
    q: "How many months have you been preparing for CUET?",
    options: ["🆕 Just started", "📅 1-3 months", "📆 3-6 months", "🏆 6+ months"],
  },
  {
    q: "Have you attempted any CUET PYQs?",
    options: ["❌ Not yet", "📝 A few", "✅ Yes, many", "🎯 Completed all"],
  },
  {
    q: "Are you taking coaching currently?",
    options: ["🚫 No coaching", "📖 Self study", "🏫 School coaching", "👨‍🏫 Private coaching"],
  },
  {
    q: "How confident are you about CUET?",
    options: ["😰 Not at all", "😐 Slightly", "😊 Fairly confident", "💪 Very confident"],
  },
];

const scores = [0, 1, 2, 3];

function getResult(score: number) {
  const pct = Math.round((score / 15) * 100);
  if (pct >= 75)
    return {
      pct,
      msg: "You're well prepared! A focused mock test batch will polish your performance.",
      color: "text-green-500",
    };
  if (pct >= 50)
    return {
      pct,
      msg: "Good base! Structured coaching will close the gap and get you exam-ready.",
      color: "text-primary",
    };
  return {
    pct,
    msg: "Time to gear up! Our crash batch will build your foundation fast.",
    color: "text-accent",
  };
}

export default function CUETQuiz() {
  const [step, setStep] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [streamAnswer, setStreamAnswer] = useState<number | null>(null);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const enrollLink = useSetting("enrollment_link");

  const handleAnswer = (idx: number) => {
    if (step === 0) setStreamAnswer(idx);
    const newScore = totalScore + scores[idx];
    setTotalScore(newScore);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setStep(0);
    setTotalScore(0);
    setFinished(false);
    setStreamAnswer(null);
    setLeadSaved(false);
    setLeadName("");
    setLeadPhone("");
  };

  const submitLead = async () => {
    if (!leadName.trim() || !leadPhone.trim()) return;
    setLeadLoading(true);
    const interest =
      streamAnswer === 0
        ? "CUET-Science"
        : streamAnswer === 1
        ? "CUET-Commerce"
        : streamAnswer === 2
        ? "CUET-Humanities"
        : "CUET";
    await supabase.from("leads").insert({
      name: leadName,
      phone: leadPhone,
      batch_interest: interest,
      status: "New",
    });
    setLeadLoading(false);
    setLeadSaved(true);
  };

  const result = getResult(totalScore);

  return (
    <section className="py-20 bg-background relative">
      <div className="section-number">06</div>
      <div className="container mx-auto px-4 max-w-xl relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-2">
            How <span className="squiggly-underline text-accent">CUET-Ready</span> Are You?
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Take this quick 5-question quiz to find out
          </p>
        </ScrollReveal>

        <div className="bg-card border-t-[4px] border-primary rounded-3xl p-6 sm:p-8 card-tilt-right" style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}>
          {!finished && (
            <div className="mb-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Question {step + 1} of {questions.length}</span>
                <span>{Math.round(((step) / questions.length) * 100)}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-5">{questions[step].q}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {questions[step].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="text-left px-4 py-3 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium btn-cartoon bg-background"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className={`text-5xl font-black mb-3 ${result.color}`}>
                  {result.pct}% Ready
                </div>
                <p className="text-muted-foreground mb-6">{result.msg}</p>

                {!leadSaved ? (
                  <div className="space-y-3 text-left">
                    <p className="text-sm font-bold text-center text-foreground">
                      Get your personalised study plan — free:
                    </p>
                    <input
                      placeholder="Your name"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full border-2 border-border rounded-2xl px-4 py-2.5 text-sm bg-background focus:border-primary focus:outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full border-2 border-border rounded-2xl px-4 py-2.5 text-sm bg-background focus:border-primary focus:outline-none"
                    />
                    <button
                      disabled={leadLoading || !leadName.trim() || !leadPhone.trim()}
                      onClick={submitLead}
                      className="w-full bg-accent text-accent-foreground py-3 rounded-full font-bold btn-cartoon text-sm disabled:opacity-50"
                    >
                      {leadLoading ? "Saving..." : "Get My Study Plan →"}
                    </button>
                    <button
                      onClick={reset}
                      className="w-full text-xs text-muted-foreground hover:text-foreground py-1"
                    >
                      Retake Quiz
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-green-600 font-bold">
                      ✅ Done! We'll contact you within 24 hours.
                    </p>
                    <a
                      href={enrollLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-accent text-accent-foreground px-6 py-2.5 rounded-full font-bold text-sm btn-cartoon hover:bg-rose-light transition-colors"
                    >
                      Enroll in a Batch
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="blush" />
      </div>
    </section>
  );
}
