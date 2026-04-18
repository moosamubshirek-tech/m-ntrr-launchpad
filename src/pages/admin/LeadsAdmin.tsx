import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { Download, MessageCircle, StickyNote, Save } from "lucide-react";
import { PageHeader, EmptyState, SkeletonRows, inputCls, ghostBtn, cardCls } from "./shared";

type Lead = Tables<"leads">;
const STATUSES = ["New", "Contacted", "Enrolled", "Dropped"];
const BATCHES = ["All", "CUET", "NCET", "Both"];
const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Enrolled: "bg-green-100 text-green-700",
  Dropped: "bg-red-100 text-red-700",
};

export default function LeadsAdmin() {
  const [items, setItems] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [batchFilter, setBatchFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [openNotes, setOpenNotes] = useState<string | null>(null);
  const [noteEdits, setNoteEdits] = useState<Record<string, string>>({});

  const load = async () => {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    load();
  };

  const saveNote = async (id: string) => {
    await supabase.from("leads").update({ notes: noteEdits[id] || "" }).eq("id", id);
    toast.success("Note saved");
    setNoteEdits((p) => { const n = { ...p }; delete n[id]; return n; });
    load();
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { New: 0, Contacted: 0, Enrolled: 0, Dropped: 0 };
    items.forEach((l) => { if (c[l.status] !== undefined) c[l.status]++; });
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((l) => {
      if (statusFilter !== "All" && l.status !== statusFilter) return false;
      if (batchFilter !== "All" && (l.batch_interest || "").toUpperCase() !== batchFilter.toUpperCase() &&
          !(batchFilter === "Both" && l.batch_interest === "Both")) {
        if (batchFilter === "CUET" && !(l.batch_interest || "").toUpperCase().includes("CUET")) return false;
        if (batchFilter === "NCET" && !(l.batch_interest || "").toUpperCase().includes("NCET")) return false;
        if (batchFilter === "Both" && l.batch_interest !== "Both") return false;
      }
      if (search) {
        const s = search.toLowerCase();
        if (!l.name.toLowerCase().includes(s) && !(l.phone || "").includes(s)) return false;
      }
      return true;
    });
  }, [items, statusFilter, batchFilter, search]);

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Email", "Batch", "Status", "Notes", "Date"];
    const rows = filtered.map((l) => [
      l.name, l.phone || "", l.email || "", l.batch_interest || "", l.status,
      (l.notes || "").replace(/"/g, '""'),
      new Date(l.created_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "leads.csv";
    a.click();
  };

  const cleanPhone = (p: string) => p.replace(/\D/g, "").replace(/^91/, "");

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title={`Leads (${items.length})`}
        subtitle="Track inquiries from forms, quiz, and homepage"
        action={
          <button onClick={exportCSV} className={ghostBtn}>
            <Download size={14} /> Export CSV
          </button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {STATUSES.map((s) => (
          <div key={s} className={`px-3 py-2 rounded-2xl border-2 border-border bg-card text-center`}>
            <div className="text-xl font-black">{counts[s]}</div>
            <div className="text-xs text-muted-foreground">{s}</div>
          </div>
        ))}
      </div>

      <div className={`${cardCls} mb-4 space-y-3`}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or phone…"
          className={inputCls}
        />
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-bold text-muted-foreground self-center">Status:</span>
          {["All", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-bold text-muted-foreground self-center">Batch:</span>
          {BATCHES.map((b) => (
            <button
              key={b}
              onClick={() => setBatchFilter(b)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${batchFilter === b ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <SkeletonRows />
      ) : filtered.length === 0 ? (
        <EmptyState emoji="📭" title="No matching leads" hint="Try changing the filters" />
      ) : (
        <div className="space-y-2">
          {filtered.map((l) => (
            <div key={l.id} className="p-3 border-2 border-border rounded-2xl bg-card text-sm">
              <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                <span className="font-bold">{l.name}</span>
                <div className="flex items-center gap-2">
                  {l.phone && (
                    <a
                      href={`https://wa.me/91${cleanPhone(l.phone)}`}
                      target="_blank"
                      rel="noopener"
                      className="text-[#25D366] hover:opacity-80 p-1.5 rounded-lg hover:bg-muted"
                      title="WhatsApp"
                    >
                      <MessageCircle size={16} />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setOpenNotes(openNotes === l.id ? null : l.id);
                      if (openNotes !== l.id) setNoteEdits((p) => ({ ...p, [l.id]: l.notes || "" }));
                    }}
                    className="text-muted-foreground hover:text-primary p-1.5 rounded-lg hover:bg-muted"
                    title="Notes"
                  >
                    <StickyNote size={16} />
                  </button>
                  <select
                    value={l.status}
                    onChange={(e) => updateStatus(l.id, e.target.value)}
                    className={`text-xs font-bold rounded-full px-3 py-1 border-0 ${statusColors[l.status] || "bg-muted"}`}
                  >
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="text-muted-foreground text-xs flex gap-3 flex-wrap">
                {l.phone && <span>📱 {l.phone}</span>}
                {l.email && <span>✉️ {l.email}</span>}
                {l.batch_interest && <span>📚 {l.batch_interest}</span>}
                <span>{new Date(l.created_at).toLocaleDateString()}</span>
              </div>
              {l.notes && openNotes !== l.id && (
                <div className="mt-2 text-xs text-foreground bg-background border border-border rounded-xl p-2">
                  📝 {l.notes}
                </div>
              )}
              {openNotes === l.id && (
                <div className="mt-3 flex gap-2">
                  <textarea
                    value={noteEdits[l.id] ?? ""}
                    onChange={(e) => setNoteEdits((p) => ({ ...p, [l.id]: e.target.value }))}
                    rows={2}
                    placeholder="Add a note…"
                    className={inputCls}
                  />
                  <button onClick={() => saveNote(l.id)} className="bg-primary text-primary-foreground px-3 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0">
                    <Save size={12} /> Save
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
