import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, Check, ExternalLink, PlayCircle, FileText } from "lucide-react";
import { PageHeader, SkeletonRows, inputCls, labelCls, primaryBtn, cardCls } from "./shared";
import { refreshSettings } from "@/hooks/useSettings";

const DEMO_MOCK_KEYS = [
  "demo_class_title",
  "demo_class_description",
  "demo_class_link",
  "mock_test_title",
  "mock_test_description",
  "cuet_mock_link",
  "ncet_mock_link",
] as const;

type DemoMockKey = (typeof DEMO_MOCK_KEYS)[number];

const DEMO_MOCK_META: Record<DemoMockKey, { label: string; desc: string; type: "text" | "url" | "textarea" }> = {
  demo_class_title: { label: "Demo Class Card Title", desc: "Heading shown on the demo class card", type: "text" },
  demo_class_description: { label: "Demo Class Description", desc: "Short text under the demo class title", type: "textarea" },
  demo_class_link: { label: "Demo Class Link (YouTube)", desc: "Full YouTube URL — playlist or single video", type: "url" },
  mock_test_title: { label: "Mock Test Card Title", desc: "Heading shown on the mock test card", type: "text" },
  mock_test_description: { label: "Mock Test Description", desc: "Short text under the mock test title", type: "textarea" },
  cuet_mock_link: { label: "CUET Mock Test Link", desc: 'Link for the "CUET Mock →" button', type: "url" },
  ncet_mock_link: { label: "NCET Mock Test Link", desc: 'Link for the "NCET Mock →" button', type: "url" },
};

interface Row {
  id: string;
  key: string;
  value: string;
}

export default function DemoMocksAdmin() {
  const [items, setItems] = useState<Row[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("settings").select("*");
    if (!data) {
      setLoading(false);
      return;
    }
    const filtered = data.filter((s) => DEMO_MOCK_KEYS.includes(s.key as DemoMockKey));
    setItems(filtered);

    const existingKeys = filtered.map((s) => s.key);
    const defaults: Record<string, string> = {
      demo_class_title: "Free Sample Class",
      demo_class_description: "Watch a full live session — see how we teach CUET subjects with clarity and exam focus before you commit.",
      demo_class_link: "https://www.youtube.com/playlist?list=PLA_9eRykc5j3opJL8nE_VrVbJ6jpPPfMM",
      mock_test_title: "Free Mock Test",
      mock_test_description: "Practice with our CUET & NCET sample mock tests — real exam pattern, answer key included.",
      cuet_mock_link: "https://docs.google.com/forms/d/e/1FAIpQLSd8Xx1fSnjswWCsSNVljC5x4_Bu2Hk5XrXUcfJ-zMlrj5QgOg/viewform",
      ncet_mock_link: "https://docs.google.com/forms/d/e/1FAIpQLSd8Xx1fSnjswWCsSNVljC5x4_Bu2Hk5XrXUcfJ-zMlrj5QgOg/viewform",
    };

    const toInsert = DEMO_MOCK_KEYS.filter((k) => !existingKeys.includes(k)).map((k) => ({
      key: k,
      value: defaults[k],
    }));

    if (toInsert.length > 0) {
      await supabase.from("settings").insert(toInsert);
      toInsert.forEach((r) => {
        items.push({ id: "", key: r.key, value: r.value });
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (key: string, id?: string) => {
    const value = edits[key] ?? "";
    if (id) {
      await supabase.from("settings").update({ value }).eq("id", id);
    } else {
      await supabase.from("settings").insert({ key, value });
    }
    await refreshSettings();
    toast.success(`${DEMO_MOCK_META[key as DemoMockKey]?.label || key} saved`);
    setSavedKey(key);
    setTimeout(() => setSavedKey(null), 2000);
    setEdits((p) => {
      const n = { ...p };
      delete n[key];
      return n;
    });
    load();
  };

  const getValue = (key: string) => {
    if (edits[key] !== undefined) return edits[key];
    return items.find((i) => i.key === key)?.value || "";
  };

  const renderField = (key: DemoMockKey) => {
    const meta = DEMO_MOCK_META[key];
    const row = items.find((i) => i.key === key);
    const value = getValue(key);
    const dirty = edits[key] !== undefined;
    const saved = savedKey === key;

    return (
      <div key={key} className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-foreground">{meta.label}</p>
            <p className="text-xs text-muted-foreground">{meta.desc}</p>
          </div>
          {meta.type === "url" && value && (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent flex items-center gap-1 hover:underline shrink-0 ml-2"
            >
              <ExternalLink size={12} /> Open
            </a>
          )}
        </div>
        {meta.type === "textarea" ? (
          <textarea
            value={value}
            onChange={(e) => setEdits((p) => ({ ...p, [key]: e.target.value }))}
            rows={3}
            className={inputCls}
          />
        ) : (
          <input
            type={meta.type === "url" ? "url" : "text"}
            value={value}
            onChange={(e) => setEdits((p) => ({ ...p, [key]: e.target.value }))}
            className={inputCls}
          />
        )}
        <button
          onClick={() => save(key, row?.id)}
          disabled={!dirty && !saved}
          className={`${primaryBtn} disabled:opacity-40 text-xs py-1.5`}
        >
          {saved ? (
            <>
              <Check size={13} /> Saved
            </>
          ) : (
            <>
              <Save size={13} /> Save
            </>
          )}
        </button>
      </div>
    );
  };

  const demoKeys: DemoMockKey[] = ["demo_class_title", "demo_class_description", "demo_class_link"];
  const mockKeys: DemoMockKey[] = [
    "mock_test_title",
    "mock_test_description",
    "cuet_mock_link",
    "ncet_mock_link",
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Demo Class & Mock Tests"
        subtitle="Control the 'Try Before You Enroll' section on the homepage. Changes are live immediately after saving."
      />

      {loading ? (
        <SkeletonRows count={4} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-t-4 border-primary bg-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <PlayCircle size={20} className="text-primary" />
              <h3 className="font-bold text-base">Demo Class Settings</h3>
            </div>
            <p className="text-xs text-muted-foreground -mt-3 mb-4">
              Controls the left card in the "Try Before You Enroll" section.
            </p>
            {demoKeys.map((k) => renderField(k))}
          </div>

          <div className="border-t-4 border-accent bg-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={20} className="text-accent" />
              <h3 className="font-bold text-base">Mock Test Settings</h3>
            </div>
            <p className="text-xs text-muted-foreground -mt-3 mb-4">
              Controls the right card — CUET and NCET mock test buttons separately.
            </p>
            {mockKeys.map((k) => renderField(k))}
          </div>
        </div>
      )}

      <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-muted-foreground">
        💡 <span className="font-medium text-foreground">Tip:</span> After saving, visit the homepage and scroll to the "Try Before You Enroll" section to see your changes live.
      </div>
    </div>
  );
}