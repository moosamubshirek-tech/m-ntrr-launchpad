import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const DEFAULTS: Record<string, string> = {
  enrollment_link:
    "https://docs.google.com/forms/d/e/1FAIpQLSd8Xx1fSnjswWCsSNVljC5x4_Bu2Hk5XrXUcfJ-zMlrj5QgOg/viewform",
  whatsapp_group_link: "https://wa.me/917909228688",
  phone: "+917909228688",
};

let cache: Record<string, string> | null = null;
const listeners: Array<(s: Record<string, string>) => void> = [];

async function fetchAll() {
  const { data } = await supabase.from("settings").select("key,value");
  const map: Record<string, string> = { ...DEFAULTS };
  data?.forEach((row) => {
    if (row.value) map[row.key] = row.value;
  });
  cache = map;
  listeners.forEach((l) => l(map));
  return map;
}

export function useSettings() {
  const [settings, setSettings] = useState<Record<string, string>>(
    cache || DEFAULTS
  );

  useEffect(() => {
    const cb = (s: Record<string, string>) => setSettings(s);
    listeners.push(cb);
    if (!cache) fetchAll();
    else setSettings(cache);
    return () => {
      const i = listeners.indexOf(cb);
      if (i >= 0) listeners.splice(i, 1);
    };
  }, []);

  return settings;
}

export function useSetting(key: string, fallback?: string) {
  const settings = useSettings();
  return settings[key] ?? fallback ?? "";
}

export function refreshSettings() {
  return fetchAll();
}
