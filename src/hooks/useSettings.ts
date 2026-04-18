import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const DEFAULTS: Record<string, string> = {
  enrollment_link:
    "https://docs.google.com/forms/d/e/1FAIpQLSd8Xx1fSnjswWCsSNVljC5x4_Bu2Hk5XrXUcfJ-zMlrj5QgOg/viewform",
  whatsapp_group_link: "https://wa.me/917909228688",
  phone: "7909228688",
  address: "Nas Arcade, Kurial Lane, Cherooty Rd, Mananchira, Kozhikode, Kerala 673001",
  instagram: "@mentrr_learning",
  youtube: "@mentrrlearning",
  website: "www.mentrr.in",
  tagline: "Prepare the mêntrr. way!",
  exam_date: "2026-05-11",
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

// Helpers — derive variants from a phone setting like "7909228688" or "+917909228688"
export function normalizePhone(raw: string) {
  const digits = (raw || "").replace(/\D/g, "");
  // Assume India if 10 digits
  const intl = digits.length === 10 ? `91${digits}` : digits;
  return {
    digits, // local digits, may include country code
    intl, // E.164 without +
    tel: `+${intl}`,
    wa: `https://wa.me/${intl}`,
    display: digits.length === 10
      ? `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
      : raw,
  };
}

export function instagramUrl(handle: string) {
  const h = (handle || "").replace(/^@/, "").trim();
  return h ? `https://instagram.com/${h}` : "#";
}

export function youtubeUrl(handle: string) {
  const h = (handle || "").trim();
  if (!h) return "#";
  if (h.startsWith("http")) return h;
  return `https://youtube.com/${h.startsWith("@") ? h : "@" + h}`;
}

export function websiteUrl(site: string) {
  if (!site) return "#";
  return site.startsWith("http") ? site : `https://${site}`;
}
