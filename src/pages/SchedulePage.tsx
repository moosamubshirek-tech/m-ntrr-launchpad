import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";
import type { Tables } from "@/integrations/supabase/types";
import WavyDivider from "@/components/WavyDivider";
import { Lock, MessageCircle } from "lucide-react";
import { useSetting, normalizePhone } from "@/hooks/useSettings";

const streams = ["Science", "Commerce", "Humanities", "General"];

export default function SchedulePage() {
  const phone = useSetting("phone");
  const wa = normalizePhone(phone).wa;
  const [schedule, setSchedule] = useState<Tables<"schedule">[]>([]);
  const [activeStream, setActiveStream] = useState("Science");
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthed(!!session);
      setAuthChecked(true);
      if (session) {
        supabase
          .from("schedule")
          .select("*")
          .order("date")
          .order("start_time")
          .then(({ data }) => {
            if (data) setSchedule(data);
          });
      }
    });
  }, []);

  const filtered = schedule.filter((s) => s.stream === activeStream);

  if (!authChecked) {
    return <div className="pt-32 text-center text-muted-foreground">Loading...</div>;
  }

  if (!isAuthed) {
    return (
      <div className="pt-32 pb-20 min-h-[80vh] bg-lavender flex items-center justify-center px-4">
        <div
          className="bg-background border-t-[4px] border-primary rounded-3xl p-8 sm:p-10 max-w-md w-full text-center"
          style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Lock className="text-primary" size={28} />
          </div>
          <h2 className="text-xl font-black mb-2">Enrolled Students Only</h2>
          <p className="text-muted-foreground text-sm mb-6">
            This page is for enrolled students only. Contact us on WhatsApp to learn more about our batches.
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold btn-cartoon hover:opacity-90"
          >
            <MessageCircle size={18} fill="currentColor" /> Contact on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="bg-lavender py-20 relative overflow-hidden">
        <div className="blob-indigo w-[250px] h-[250px] -top-10 -right-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
              Live Class <span className="squiggly-underline text-accent">Schedule</span>
            </h1>
            <p className="text-muted-foreground">Filter by stream to see upcoming classes</p>
          </ScrollReveal>
        </div>
        <WavyDivider nextBg="white" />
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {streams.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStream(s)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeStream === s
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-muted-foreground hover:bg-card/80 border border-border"
                }`}
                style={activeStream === s ? { boxShadow: '3px 3px 0px hsl(var(--foreground) / 0.15)' } : {}}
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
                    className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-3xl border-2 transition-all ${
                      isToday
                        ? "border-accent bg-blush"
                        : "border-border bg-card"
                    }`}
                    style={isToday ? { boxShadow: '4px 4px 0px hsl(var(--accent) / 0.2)' } : { boxShadow: '3px 3px 0px hsl(var(--foreground) / 0.05)' }}
                  >
                    <div className="flex items-center gap-3 sm:w-40 shrink-0">
                      <div className={`text-sm font-bold ${isToday ? "text-accent" : "text-muted-foreground"}`}>
                        {new Date(cls.date + "T00:00:00").toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                        {isToday && <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">Today</span>}
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
