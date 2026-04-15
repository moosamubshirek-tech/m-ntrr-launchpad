import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function UrgencyBar() {
  const [text, setText] = useState("🔥 Early Bird Offer Ending Soon — Limited Seats!");

  useEffect(() => {
    supabase
      .from("announcements")
      .select("text")
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data?.[0]) setText(data[0].text);
      });
  }, []);

  const items = [
    `🔥 ${text}`,
    `⚡ ${text}`,
    `🎯 ${text}`,
    `🔥 ${text}`,
    `⚡ ${text}`,
    `🎯 ${text}`,
  ];

  return (
    <div className="bg-rose text-primary-foreground text-xs sm:text-sm font-bold py-2 z-[60] relative overflow-hidden">
      <div className="flex whitespace-nowrap animate-ticker">
        {items.map((item, i) => (
          <span key={i} className="mx-8 shrink-0">{item}</span>
        ))}
      </div>
    </div>
  );
}
