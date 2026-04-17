import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import WavyDivider from "@/components/WavyDivider";
import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap } from "lucide-react";

type Stream = "Science" | "Commerce" | "Humanities";

const universityData: { name: string; stream: Stream; minScore: number; university: string; desc: string }[] = [
  // Science
  { name: "Delhi University (Science)", stream: "Science", minScore: 650, university: "DU", desc: "BSc Hons Physics, Chemistry, Maths, CS" },
  { name: "BHU Varanasi (Science)", stream: "Science", minScore: 580, university: "BHU", desc: "BSc programmes across sciences" },
  { name: "JNU (Science)", stream: "Science", minScore: 600, university: "JNU", desc: "BSc Life Sciences, Physical Sciences" },
  { name: "Hyderabad Central University", stream: "Science", minScore: 550, university: "HCU", desc: "BSc integrated programmes" },
  { name: "Pondicherry University", stream: "Science", minScore: 500, university: "PU", desc: "BSc programmes, good campus life" },
  // Commerce
  { name: "Delhi University (Commerce)", stream: "Commerce", minScore: 670, university: "DU", desc: "BCom Hons, BA Economics" },
  { name: "BHU Varanasi (Commerce)", stream: "Commerce", minScore: 580, university: "BHU", desc: "BCom, BA Economics" },
  { name: "Jamia Millia Islamia", stream: "Commerce", minScore: 550, university: "Jamia", desc: "BCom, BA Economics" },
  { name: "AMU Aligarh (Commerce)", stream: "Commerce", minScore: 520, university: "AMU", desc: "BCom programmes" },
  { name: "Pondicherry University", stream: "Commerce", minScore: 480, university: "PU", desc: "BCom, BA Economics" },
  // Humanities
  { name: "JNU (Humanities)", stream: "Humanities", minScore: 650, university: "JNU", desc: "BA Hons History, Political Science, Sociology" },
  { name: "Delhi University (Humanities)", stream: "Humanities", minScore: 620, university: "DU", desc: "BA Hons in multiple subjects" },
  { name: "EFLU Hyderabad", stream: "Humanities", minScore: 580, university: "EFLU", desc: "BA Language & Literature" },
  { name: "BHU Varanasi (Humanities)", stream: "Humanities", minScore: 550, university: "BHU", desc: "BA programmes, all subjects" },
  { name: "Jamia Millia (Humanities)", stream: "Humanities", minScore: 520, university: "Jamia", desc: "BA Social Sciences" },
  { name: "AMU Aligarh (Humanities)", stream: "Humanities", minScore: 490, university: "AMU", desc: "BA programmes" },
  { name: "TISS Mumbai", stream: "Humanities", minScore: 600, university: "TISS", desc: "BA Social Sciences" },
  { name: "Pondicherry University", stream: "Humanities", minScore: 460, university: "PU", desc: "BA programmes, all subjects" },
];

function matchBadge(score: number, min: number) {
  const diff = score - min;
  if (diff >= 80) return { label: "🌟 High Match", color: "bg-green-500/15 text-green-600" };
  if (diff >= 30) return { label: "✅ Good Match", color: "bg-primary/15 text-primary" };
  return { label: "🎯 Stretch", color: "bg-accent/15 text-accent" };
}

export default function UniversityMatcher() {
  const [stream, setStream] = useState<Stream | "">("");
  const [score, setScore] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const numScore = parseInt(score) || 0;
  const results = stream
    ? universityData
        .filter((u) => u.stream === stream && numScore >= u.minScore)
        .sort((a, b) => b.minScore - a.minScore)
    : [];

  const reset = () => {
    setSubmitted(false);
  };

  return (
    <section className="py-20 bg-blush relative">
      <div className="section-number right-10 left-auto">07</div>
      <div className="container mx-auto px-4 max-w-xl relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-2">
            University <span className="squiggly-underline text-accent">Matcher</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Enter your expected CUET score to find which universities you can target
          </p>
        </ScrollReveal>

        <div
          className="bg-background border-t-[4px] border-primary rounded-3xl p-6 sm:p-8 card-tilt-left"
          style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}
        >
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              <div>
                <label className="text-sm font-bold mb-3 block">Choose your stream</label>
                <div className="flex flex-wrap gap-2">
                  {(["Science", "Commerce", "Humanities"] as Stream[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStream(s)}
                      className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                        stream === s
                          ? "bg-primary text-primary-foreground shadow"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold mb-2 block">
                  Expected CUET Score (out of 800)
                </label>
                <input
                  type="number"
                  min={0}
                  max={800}
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="e.g. 600"
                  className="w-full bg-card border-2 border-border rounded-2xl px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <button
                disabled={!stream || !score}
                onClick={() => setSubmitted(true)}
                className="w-full bg-accent text-accent-foreground py-3 rounded-full font-bold btn-cartoon disabled:opacity-50"
              >
                Show My Universities →
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <button
                onClick={reset}
                className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  At <span className="font-bold text-foreground">{numScore}/800</span> in {stream}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {results.length} matching universit{results.length === 1 ? "y" : "ies"}
                </p>
              </div>

              {results.length === 0 ? (
                <div className="text-center py-8">
                  <GraduationCap className="mx-auto mb-3 text-muted-foreground" size={36} />
                  <p className="text-sm font-bold mb-1">No matches at this score yet</p>
                  <p className="text-xs text-muted-foreground">
                    Aim for 500+ to unlock central university options
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
                  {results.map((u, i) => {
                    const badge = matchBadge(numScore, u.minScore);
                    return (
                      <div
                        key={i}
                        className="bg-card border-l-[3px] border-primary rounded-2xl p-3.5 flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-sm">{u.name}</h4>
                          <p className="text-muted-foreground text-xs mt-0.5">{u.desc}</p>
                          <p className="text-[11px] text-muted-foreground mt-1">
                            Cutoff: ~{u.minScore}/800
                          </p>
                        </div>
                        <span className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="white" />
      </div>
    </section>
  );
}
