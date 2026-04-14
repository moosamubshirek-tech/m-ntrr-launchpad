import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";

const ENROLL_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSd8Xx1fSnjswWCsSNVljC5x4_Bu2Hk5XrXUcfJ-zMlrj5QgOg/viewform";

const floatingTags = [
  "Physics", "Chemistry", "Biology", "History", "Economics",
  "English", "Political Science", "Geography", "Mathematics", "Sociology",
  "Psychology", "Computer Science", "Hindi",
];

function CountdownTimer() {
  const target = new Date("2026-05-11T00:00:00+05:30").getTime();
  const [diff, setDiff] = useState(target - Date.now());

  useEffect(() => {
    const t = setInterval(() => setDiff(target - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);

  const d = Math.max(0, diff);
  const days = Math.floor(d / 86400000);
  const hours = Math.floor((d % 86400000) / 3600000);
  const mins = Math.floor((d % 3600000) / 60000);
  const secs = Math.floor((d % 60000) / 1000);

  return (
    <div className="flex gap-3 sm:gap-4 justify-center">
      {[
        { val: days, label: "Days" },
        { val: hours, label: "Hours" },
        { val: mins, label: "Mins" },
        { val: secs, label: "Secs" },
      ].map(({ val, label }) => (
        <div key={label} className="bg-navy-light/60 backdrop-blur-sm rounded-xl px-3 sm:px-5 py-3 text-center min-w-[60px]">
          <div className="text-2xl sm:text-3xl font-black text-coral tabular-nums">
            {String(val).padStart(2, "0")}
          </div>
          <div className="text-[10px] sm:text-xs text-primary-foreground/60 font-medium mt-0.5">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-navy flex items-center justify-center overflow-hidden pt-20">
      {/* Floating tags */}
      {floatingTags.map((tag, i) => (
        <motion.span
          key={tag}
          className="absolute text-primary-foreground/[0.06] font-bold text-sm sm:text-lg pointer-events-none select-none"
          style={{
            left: `${(i * 17 + 5) % 90}%`,
            top: `${(i * 23 + 10) % 85}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 5 + (i % 4),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          {tag}
        </motion.span>
      ))}

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black text-primary-foreground leading-tight mb-4"
        >
          One Exam.{" "}
          <span className="text-gradient">Your Dream University.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-primary-foreground/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8"
        >
          Kerala's most result-driven CUET & NCET coaching platform
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-10"
        >
          <AnimatedCounter end={100} suffix="+" label="Admissions" />
          <AnimatedCounter end={2} label="AIR 1s" />
          <AnimatedCounter end={2023} label="Founded" prefix="" duration={1.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href={ENROLL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-coral text-primary-foreground px-8 py-3.5 rounded-full text-base font-bold glow-coral hover:bg-coral-light transition-all hover:scale-105"
          >
            Join CUET Batch
          </a>
          <a
            href={ENROLL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-coral text-coral px-8 py-3.5 rounded-full text-base font-bold hover:bg-coral hover:text-primary-foreground transition-all hover:scale-105"
          >
            Join NCET Batch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <p className="text-primary-foreground/50 text-xs mb-3 font-medium tracking-wider uppercase">
            CUET 2026 Exam Countdown
          </p>
          <CountdownTimer />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
