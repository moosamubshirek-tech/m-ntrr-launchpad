import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";
import WavyDivider from "@/components/WavyDivider";
import { useSetting } from "@/hooks/useSettings";

const floatingIcons = ["📚", "✏️", "⭐", "🎓", "🔬", "📐", "🧪", "🌟", "📖", "🎯"];

function CountdownTimer({ examDate }: { examDate: string }) {
  const target = useMemo(() => {
    const d = examDate || "2026-05-11";
    const t = new Date(`${d}T00:00:00+05:30`).getTime();
    return Number.isFinite(t) ? t : new Date("2026-05-11T00:00:00+05:30").getTime();
  }, [examDate]);
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
    <div className="flex gap-2 sm:gap-4 justify-center">
      {[
        { val: days, label: "Days" },
        { val: hours, label: "Hours" },
        { val: mins, label: "Mins" },
        { val: secs, label: "Secs" },
      ].map(({ val, label }) => (
        <div key={label} className="bg-background/80 backdrop-blur-sm rounded-2xl px-2 sm:px-5 py-2.5 sm:py-3 text-center min-w-[56px] sm:min-w-[72px] border-2 border-foreground/10" style={{ boxShadow: '3px 3px 0px hsl(var(--foreground) / 0.1)' }}>
          <div className="text-xl sm:text-3xl font-black text-accent tabular-nums">
            {String(val).padStart(2, "0")}
          </div>
          <div className="text-[9px] sm:text-xs text-foreground/60 font-medium mt-0.5">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const enrollLink = useSetting("enrollment_link");
  const examDate = useSetting("exam_date");

  const scrollToDemo = () => {
    document.getElementById("free-demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-lavender flex items-center justify-center overflow-hidden pt-20">
      {/* Blob shapes */}
      <div className="blob-indigo w-[320px] h-[320px] -top-16 -left-16" />
      <div className="blob-rose w-[280px] h-[280px] top-40 -right-16" />
      <div className="blob-indigo w-[200px] h-[200px] bottom-20 left-1/4" />

      {/* Floating illustrated icons */}
      {floatingIcons.map((icon, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl sm:text-4xl pointer-events-none select-none opacity-10 sm:opacity-20"
          style={{
            left: `${(i * 17 + 5) % 90}%`,
            top: `${(i * 23 + 10) % 85}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6 + (i % 4),
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.span>
      ))}

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(2rem,8vw,5rem)] md:text-7xl font-black text-foreground leading-tight mb-4 px-2"
        >
          Kerala's <span className="squiggly-underline">No.1</span>{" "}
          <span className="text-gradient">CUET Platform.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-foreground/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8"
        >
          Live classes · Expert faculty · Proven results — built for Kerala students
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex gap-4 sm:gap-6 justify-center max-w-xs sm:max-w-md mx-auto mb-10 flex-wrap"
        >
          <AnimatedCounter end={100} suffix="+" label="Admissions" />
          <AnimatedCounter end={2} label="AIR 1s" />
          <AnimatedCounter end={500} suffix="+" label="Students" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-12 px-4 sm:px-0 w-full max-w-sm sm:max-w-none mx-auto"
        >
          <a
            href={enrollLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center bg-accent text-accent-foreground px-8 py-3.5 rounded-full text-base font-bold btn-cartoon hover:bg-rose-light transition-all"
          >
            Join CUET Batch
          </a>
          <a
            href={enrollLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-base font-bold btn-cartoon hover:bg-indigo-light transition-all"
          >
            Join NCET Batch
          </a>
          <button
            onClick={scrollToDemo}
            className="w-full sm:w-auto text-center border-2 border-foreground/20 bg-background/50 text-foreground px-8 py-3.5 rounded-full text-base font-bold hover:bg-background transition-all"
          >
            Watch Free Demo Class
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <p className="text-foreground/50 text-xs mb-3 font-medium tracking-wider uppercase">
            CUET 2026 Exam Countdown
          </p>
          <CountdownTimer examDate={examDate} />
        </motion.div>
      </div>

      {/* Wavy bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <WavyDivider nextBg="white" />
      </div>
    </section>
  );
}
