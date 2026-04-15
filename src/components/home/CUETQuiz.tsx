import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import WavyDivider from "@/components/WavyDivider";

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
  if (pct >= 75) return { pct, msg: "You're in great shape! 🎉 A crash course will polish your preparation.", color: "text-green-500" };
  if (pct >= 50) return { pct, msg: "Good start! 💪 Structured coaching will make all the difference.", color: "text-primary" };
  return { pct, msg: "Time to gear up! 🚀 Join our crash batch and ace CUET with expert guidance.", color: "text-accent" };
}

export default function CUETQuiz() {
  const [step, setStep] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (idx: number) => {
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
  };

  const result = getResult(totalScore);

  return (
    <section className="py-20 bg-background relative">
      <div className="section-number">03</div>
      <div className="container mx-auto px-4 max-w-xl relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-2">
            How <span className="squiggly-underline text-accent">CUET-Ready</span> Are You?
          </h2>
          <p className="text-muted-foreground text-center mb-10">Take this quick 5-question quiz to find out</p>
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
                <div className="flex gap-3 justify-center">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSd8Xx1fSnjswWCsSNVljC5x4_Bu2Hk5XrXUcfJ-zMlrj5QgOg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent text-accent-foreground px-6 py-2.5 rounded-full font-bold text-sm btn-cartoon hover:bg-rose-light transition-colors"
                  >
                    Join a Batch
                  </a>
                  <button
                    onClick={reset}
                    className="border-2 border-border px-6 py-2.5 rounded-full font-bold text-sm hover:bg-muted transition-colors"
                  >
                    Retake Quiz
                  </button>
                </div>
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
