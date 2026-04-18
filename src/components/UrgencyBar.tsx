import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const EMOJIS = ["🔥", "⚡", "🎯", "🌟", "🚀"];

export default function UrgencyBar() {
  const [texts, setTexts] = useState<string[]>([
    "Early Bird Offer Ending Soon — Limited Seats!",
  ]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    supabase
      .from("announcements")
      .select("text")
      .eq("active", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setTexts(data.map((d) => d.text));
      });
  }, []);

  useEffect(() => {
    if (texts.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % texts.length), 4000);
    return () => clearInterval(t);
  }, [texts.length]);

  const current = texts[idx] || texts[0];
  // Build a long ticker by repeating current with rotating emojis
  const items = Array.from({ length: 6 }, (_, i) => `${EMOJIS[i % EMOJIS.length]} ${current}`);

  return (
    <div className="bg-rose text-primary-foreground text-xs sm:text-sm font-bold py-2 z-[60] relative overflow-hidden">
      <div key={idx} className="flex whitespace-nowrap animate-ticker">
        {items.map((item, i) => (
          <span key={i} className="mx-8 shrink-0">{item}</span>
        ))}
        {items.map((item, i) => (
          <span key={`b-${i}`} className="mx-8 shrink-0">{item}</span>
        ))}
      </div>
    </div>
  );
}
