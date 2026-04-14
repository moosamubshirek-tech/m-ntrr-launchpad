import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ScoreCalculator() {
  const [correct, setCorrect] = useState("");
  const [wrong, setWrong] = useState("");

  const c = parseInt(correct) || 0;
  const w = parseInt(wrong) || 0;
  const score = c * 5 - w * 1;
  const hasInput = correct !== "" || wrong !== "";

  const feedback = score >= 150
    ? { text: "Excellent! 🌟", color: "text-green-500" }
    : score >= 100
    ? { text: "Good! Keep going 💪", color: "text-yellow-500" }
    : { text: "Needs Work — Join a batch! 🚀", color: "text-coral" };

  return (
    <section className="py-20 bg-navy">
      <div className="container mx-auto px-4 max-w-md">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center text-primary-foreground mb-2">
            CUET <span className="text-coral">Score Calculator</span>
          </h2>
          <p className="text-primary-foreground/60 text-center mb-10 text-sm">
            +5 for correct, -1 for wrong
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-navy-light border border-primary-foreground/10 rounded-2xl p-6 sm:p-8">
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-primary-foreground/70 text-sm font-medium mb-1 block">Correct Answers</label>
                <input
                  type="number"
                  min={0}
                  value={correct}
                  onChange={e => setCorrect(e.target.value)}
                  placeholder="0"
                  className="w-full bg-navy border border-primary-foreground/20 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-coral focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-primary-foreground/70 text-sm font-medium mb-1 block">Wrong Answers</label>
                <input
                  type="number"
                  min={0}
                  value={wrong}
                  onChange={e => setWrong(e.target.value)}
                  placeholder="0"
                  className="w-full bg-navy border border-primary-foreground/20 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-coral focus:outline-none transition-colors"
                />
              </div>
            </div>

            {hasInput && (
              <div className="text-center pt-4 border-t border-primary-foreground/10">
                <div className="text-4xl font-black text-coral mb-1">{score}</div>
                <div className="text-sm text-primary-foreground/60 mb-1">Projected Score</div>
                <div className={`text-sm font-bold ${feedback.color}`}>{feedback.text}</div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
