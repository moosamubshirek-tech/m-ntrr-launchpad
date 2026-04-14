import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import type { Tables } from "@/integrations/supabase/types";

const streams = ["Science", "Commerce", "Humanities", "General"];

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<Tables<"schedule">[]>([]);
  const [activeStream, setActiveStream] = useState("Science");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    supabase
      .from("schedule")
      .select("*")
      .order("date")
      .order("start_time")
      .then(({ data }) => {
        if (data) setSchedule(data);
      });
  }, []);

  const filtered = schedule.filter((s) => s.stream === activeStream);

  return (
    <div className="pt-24">
      <section className="bg-navy py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-black text-primary-foreground mb-4">
              Live Class <span className="text-coral">Schedule</span>
            </h1>
            <p className="text-primary-foreground/60">Filter by stream to see upcoming classes</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Stream tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {streams.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStream(s)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeStream === s
                    ? "bg-coral text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">
              <p className="text-lg font-medium">No classes scheduled for {activeStream} yet.</p>
              <p className="text-sm mt-2">Check back soon or contact us for the latest schedule.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((cls) => {
                const isToday = cls.date === today;
                return (
                  <div
                    key={cls.id}
                    className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border transition-all ${
                      isToday
                        ? "border-coral/50 bg-coral/5 glow-coral-sm"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:w-40 shrink-0">
                      <div className={`text-sm font-bold ${isToday ? "text-coral" : "text-muted-foreground"}`}>
                        {new Date(cls.date + "T00:00:00").toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                        {isToday && <span className="ml-2 text-xs bg-coral text-accent-foreground px-2 py-0.5 rounded-full">Today</span>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{cls.subject}</h4>
                      <p className="text-muted-foreground text-xs">{cls.topic}</p>
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {cls.start_time.slice(0, 5)} – {cls.end_time.slice(0, 5)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
