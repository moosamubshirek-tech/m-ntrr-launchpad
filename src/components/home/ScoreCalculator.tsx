import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import WavyDivider from "@/components/WavyDivider";

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
    ? { text: "Good! Keep going 💪", color: "text-primary" }
    : { text: "Needs Work — Join a batch! 🚀", color: "text-accent" };

  return (
    <section className="py-20 bg-blush relative">
      <div className="section-number right-10 left-auto">04</div>
      <div className="container mx-auto px-4 max-w-md relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center text-foreground mb-2">
            CUET <span className="squiggly-underline text-accent">Score Calculator</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10 text-sm">
            +5 for correct, -1 for wrong
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-background border-l-[4px] border-accent rounded-3xl p-6 sm:p-8 card-tilt-left" style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-foreground/70 text-sm font-medium mb-1 block">Correct Answers</label>
                <input
                  type="number"
                  min={0}
                  value={correct}
                  onChange={e => setCorrect(e.target.value)}
                  placeholder="0"
                  className="w-full bg-card border-2 border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-foreground/70 text-sm font-medium mb-1 block">Wrong Answers</label>
                <input
                  type="number"
                  min={0}
                  value={wrong}
                  onChange={e => setWrong(e.target.value)}
                  placeholder="0"
                  className="w-full bg-card border-2 border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            {hasInput && (
              <div className="text-center pt-4 border-t-2 border-border">
                <div className="text-4xl font-black text-accent mb-1">{score}</div>
                <div className="text-sm text-muted-foreground mb-1">Projected Score</div>
                <div className={`text-sm font-bold ${feedback.color}`}>{feedback.text}</div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="white" />
      </div>
    </section>
  );
}
