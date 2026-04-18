import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, Check } from "lucide-react";
import { PageHeader, SkeletonRows, inputCls, labelCls, primaryBtn, cardCls } from "./shared";
import { refreshSettings } from "@/hooks/useSettings";

const SETTINGS_META: Record<string, { label: string; desc: string; type: "text" | "tel" | "date" | "textarea" }> = {
  phone: { label: "Phone Number", desc: "Shown on contact page and footer", type: "tel" },
  address: { label: "Office Address", desc: "Shown on contact page", type: "textarea" },
  instagram: { label: "Instagram Handle", desc: "e.g. @mentrr_learning", type: "text" },
  youtube: { label: "YouTube Channel", desc: "e.g. @mentrrlearning", type: "text" },
  website: { label: "Website URL", desc: "Main domain", type: "text" },
  tagline: { label: "Tagline", desc: "Footer tagline text", type: "text" },
  exam_date: { label: "CUET Exam Date", desc: "Used for the countdown timer", type: "date" },
  whatsapp_group_link: { label: "WhatsApp Group Link", desc: "For the community join button", type: "text" },
  enrollment_link: { label: "Enrollment Form Link", desc: "Drives ALL Enroll Now buttons site-wide", type: "text" },
};

interface Row { id: string; key: string; value: string; }

export default function SettingsAdmin() {
  const [items, setItems] = useState<Row[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("settings").select("*");
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async (key: string, id?: string) => {
    const value = edits[key] ?? "";
    if (id) {
      await supabase.from("settings").update({ value }).eq("id", id);
    } else {
      await supabase.from("settings").insert({ key, value });
    }
    await refreshSettings();
    toast.success(`${SETTINGS_META[key]?.label || key} saved`);
    setSavedKey(key);
    setTimeout(() => setSavedKey(null), 2000);
    setEdits((p) => { const n = { ...p }; delete n[key]; return n; });
    load();
  };

  const getValue = (key: string) => {
    if (edits[key] !== undefined) return edits[key];
    return items.find((i) => i.key === key)?.value || "";
  };

  const allKeys = Array.from(new Set([...Object.keys(SETTINGS_META), ...items.map((i) => i.key)]));

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="Settings" subtitle="Site-wide configuration. Changes apply everywhere immediately." />

      {loading ? (
        <SkeletonRows count={5} />
      ) : (
        <div className="space-y-3">
          {allKeys.map((key) => {
            const meta = SETTINGS_META[key] || { label: key, desc: "Custom setting", type: "text" as const };
            const row = items.find((i) => i.key === key);
            const value = getValue(key);
            const dirty = edits[key] !== undefined;
            const saved = savedKey === key;
            return (
              <div key={key} className={cardCls}>
                <label className={labelCls}>{meta.label}</label>
                <p className="text-xs text-muted-foreground mb-2">{meta.desc}</p>
                {meta.type === "textarea" ? (
                  <textarea
                    value={value}
                    onChange={(e) => setEdits((p) => ({ ...p, [key]: e.target.value }))}
                    rows={3}
                    className={inputCls}
                  />
                ) : (
                  <input
                    type={meta.type}
                    value={value}
                    onChange={(e) => setEdits((p) => ({ ...p, [key]: e.target.value }))}
                    className={inputCls}
                  />
                )}
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => save(key, row?.id)}
                    disabled={!dirty && !saved}
                    className={`${primaryBtn} disabled:opacity-40`}
                  >
                    {saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Save</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
