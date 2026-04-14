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

  return (
    <div className="bg-coral text-primary-foreground text-center text-xs sm:text-sm font-bold py-2 px-4 z-[60] relative">
      {text}
    </div>
  );
}
