import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { Plus, Save, Trophy, Pencil } from "lucide-react";
import { PageHeader, EmptyState, SkeletonRows, DeleteConfirm, inputCls, labelCls, primaryBtn, accentBtn, cardCls } from "./shared";

type Topper = Tables<"toppers">;

export default function ToppersAdmin() {
  const [items, setItems] = useState<Topper[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const blank = { name: "", subject: "", rank: "", university: "", photo_url: "" };
  const [form, setForm] = useState(blank);

  const load = async () => {
    const { data } = await supabase.from("toppers").select("*").order("created_at");
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const reset = () => { setForm(blank); setShowAdd(false); setEditingId(null); };

  const save = async () => {
    if (!form.name || !form.subject || !form.rank) return toast.error("Name, subject & rank required");
    const payload = { ...form, university: form.university || null, photo_url: form.photo_url || null };
    if (editingId) {
      const { error } = await supabase.from("toppers").update(payload).eq("id", editingId);
      if (error) return toast.error(error.message);
      toast.success("Updated");
    } else {
      const { error } = await supabase.from("toppers").insert(payload);
      if (error) return toast.error(error.message);
      toast.success("Topper added");
    }
    reset();
    load();
  };

  const startEdit = (t: Topper) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      subject: t.subject,
      rank: t.rank,
      university: t.university || "",
      photo_url: t.photo_url || "",
    });
    setShowAdd(true);
  };

  const remove = async (id: string) => {
    await supabase.from("toppers").delete().eq("id", id);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Toppers & Results"
        subtitle="Showcase top-ranking students"
        action={
          <button onClick={() => { reset(); setShowAdd(true); }} className={accentBtn}>
            <Plus size={14} /> Add Topper
          </button>
        }
      />

      {showAdd && (
        <div className={`${cardCls} mb-6 border-accent`}>
          <h3 className="font-black mb-4">{editingId ? "Edit topper" : "New topper"}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Name *</label>
              <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Rank * (e.g. AIR 1)</label>
              <input className={inputCls} value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Subject *</label>
              <input className={inputCls} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>University</label>
              <input className={inputCls} value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Photo URL (optional)</label>
              <input className={inputCls} value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={save} className={primaryBtn}><Save size={14} /> {editingId ? "Update" : "Add"}</button>
            <button onClick={reset} className="px-4 py-2.5 rounded-full text-sm font-bold text-muted-foreground hover:bg-muted">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <SkeletonRows />
      ) : items.length === 0 ? (
        <EmptyState emoji="🏆" title="No toppers yet" hint="Add students who scored top ranks" />
      ) : (
        <div className="space-y-2">
          {items.map((t) => (
            <div key={t.id} className="flex items-center gap-3 p-3 border-2 border-border rounded-2xl bg-card">
              {t.photo_url ? (
                <img src={t.photo_url} alt={t.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Trophy size={18} className="text-primary" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">{t.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {t.subject}{t.university ? ` · ${t.university}` : ""}
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-bold shrink-0">{t.rank}</span>
              <button onClick={() => startEdit(t)} className="text-muted-foreground hover:text-primary p-1.5 rounded-lg hover:bg-muted">
                <Pencil size={14} />
              </button>
              <DeleteConfirm onConfirm={() => remove(t.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
