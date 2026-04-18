import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { Plus, Save } from "lucide-react";
import { PageHeader, EmptyState, SkeletonRows, DeleteConfirm, inputCls, labelCls, primaryBtn, accentBtn, cardCls } from "./shared";

type U = Tables<"universities">;

export default function UniversitiesAdmin() {
  const [items, setItems] = useState<U[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [edits, setEdits] = useState<Record<string, Partial<U>>>({});
  const blank = { name: "", tag: "Central University", streams: "", seats_info: "", estimated_cutoff: "", display_order: 0 };
  const [form, setForm] = useState(blank);

  const load = async () => {
    const { data } = await supabase.from("universities").select("*").order("display_order");
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.name || !form.streams) return toast.error("Name & streams required");
    const { error } = await supabase.from("universities").insert(form);
    if (error) return toast.error(error.message);
    setForm(blank); setShowAdd(false);
    toast.success("Added"); load();
  };

  const setEdit = (id: string, p: Partial<U>) => setEdits((s) => ({ ...s, [id]: { ...s[id], ...p } }));
  const save = async (id: string) => {
    const e = edits[id]; if (!e) return;
    const { error } = await supabase.from("universities").update(e).eq("id", id);
    if (error) return toast.error(error.message);
    setEdits((s) => { const n = { ...s }; delete n[id]; return n; });
    toast.success("Saved"); load();
  };
  const remove = async (id: string) => {
    await supabase.from("universities").delete().eq("id", id);
    toast.success("Deleted"); load();
  };
  const toggleActive = async (u: U) => {
    await supabase.from("universities").update({ active: !u.active }).eq("id", u.id);
    load();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Universities"
        subtitle="Manage the university list shown on the homepage"
        action={
          <button onClick={() => setShowAdd((s) => !s)} className={accentBtn}>
            <Plus size={14} /> {showAdd ? "Close" : "Add University"}
          </button>
        }
      />

      {showAdd && (
        <div className={`${cardCls} mb-6 border-accent`}>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><label className={labelCls}>Name *</label><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className={labelCls}>Tag</label><input className={inputCls} value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} /></div>
            <div><label className={labelCls}>Streams *</label><input className={inputCls} value={form.streams} onChange={(e) => setForm({ ...form, streams: e.target.value })} /></div>
            <div><label className={labelCls}>Seats info</label><input className={inputCls} value={form.seats_info} onChange={(e) => setForm({ ...form, seats_info: e.target.value })} /></div>
            <div><label className={labelCls}>Estimated cutoff</label><input className={inputCls} value={form.estimated_cutoff} onChange={(e) => setForm({ ...form, estimated_cutoff: e.target.value })} /></div>
            <div><label className={labelCls}>Display order</label><input type="number" className={inputCls} value={form.display_order} onChange={(e) => setForm({ ...form, display_order: +e.target.value })} /></div>
          </div>
          <button onClick={add} className={`${primaryBtn} mt-4`}><Save size={14} /> Create</button>
        </div>
      )}

      {loading ? (
        <SkeletonRows />
      ) : items.length === 0 ? (
        <EmptyState emoji="🏛️" title="No universities yet" hint="Add the first university to display on the homepage" />
      ) : (
        <div className="space-y-3">
          {items.map((u) => {
            const dirty = !!edits[u.id];
            return (
              <div key={u.id} className={`${cardCls} ${!u.active ? "opacity-60" : ""}`}>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><label className={labelCls}>Name</label><input defaultValue={u.name} onChange={(e) => setEdit(u.id, { name: e.target.value })} className={inputCls} /></div>
                  <div><label className={labelCls}>Tag</label><input defaultValue={u.tag} onChange={(e) => setEdit(u.id, { tag: e.target.value })} className={inputCls} /></div>
                  <div><label className={labelCls}>Streams</label><input defaultValue={u.streams} onChange={(e) => setEdit(u.id, { streams: e.target.value })} className={inputCls} /></div>
                  <div><label className={labelCls}>Seats info</label><input defaultValue={u.seats_info || ""} onChange={(e) => setEdit(u.id, { seats_info: e.target.value })} className={inputCls} /></div>
                  <div><label className={labelCls}>Cutoff</label><input defaultValue={u.estimated_cutoff || ""} onChange={(e) => setEdit(u.id, { estimated_cutoff: e.target.value })} className={inputCls} /></div>
                  <div><label className={labelCls}>Display order</label><input type="number" defaultValue={u.display_order} onChange={(e) => setEdit(u.id, { display_order: +e.target.value })} className={inputCls} /></div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <div className="flex items-center gap-3">
                    <DeleteConfirm onConfirm={() => remove(u.id)} />
                    <button
                      onClick={() => toggleActive(u)}
                      className={`text-xs font-bold px-3 py-1 rounded-full ${u.active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}
                    >
                      {u.active ? "Active" : "Inactive"}
                    </button>
                  </div>
                  <button onClick={() => save(u.id)} disabled={!dirty} className={`${primaryBtn} disabled:opacity-40`}>
                    <Save size={14} /> Save
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
