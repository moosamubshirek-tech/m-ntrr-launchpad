import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { Plus, Save } from "lucide-react";
import { PageHeader, EmptyState, SkeletonRows, DeleteConfirm, inputCls, labelCls, primaryBtn, accentBtn, cardCls } from "./shared";

type Batch = Tables<"batches">;
type EditState = Record<string, Partial<Batch> & { features_text?: string }>;

export default function BatchesAdmin() {
  const [items, setItems] = useState<Batch[]>([]);
  const [edits, setEdits] = useState<EditState>({});
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    exam: "CUET",
    price_original: 0,
    price_early_bird: 0,
    early_bird_active: true,
    enrollment_link: "",
    features_text: "",
    seats_total: 50,
    seats_filled: 0,
  });

  const load = async () => {
    const { data } = await supabase.from("batches").select("*").order("created_at");
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const setEdit = (id: string, patch: Partial<Batch> & { features_text?: string }) => {
    setEdits((p) => ({ ...p, [id]: { ...p[id], ...patch } }));
  };

  const save = async (id: string) => {
    const e = edits[id];
    if (!e) return;
    const update: Partial<Batch> = { ...e };
    if (e.features_text !== undefined) {
      update.features = e.features_text.split("\n").map((s) => s.trim()).filter(Boolean);
      delete (update as { features_text?: string }).features_text;
    }
    const { error } = await supabase.from("batches").update(update).eq("id", id);
    if (error) return toast.error(error.message);
    setEdits((p) => { const n = { ...p }; delete n[id]; return n; });
    toast.success("Saved");
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("batches").delete().eq("id", id);
    toast.success("Batch deleted");
    load();
  };

  const addBatch = async () => {
    if (!form.name || !form.enrollment_link) return toast.error("Name & enrollment link required");
    const { error } = await supabase.from("batches").insert({
      name: form.name,
      exam: form.exam,
      price_original: form.price_original,
      price_early_bird: form.price_early_bird,
      early_bird_active: form.early_bird_active,
      enrollment_link: form.enrollment_link,
      features: form.features_text.split("\n").map((s) => s.trim()).filter(Boolean),
      seats_total: form.seats_total,
      seats_filled: form.seats_filled,
    });
    if (error) return toast.error(error.message);
    toast.success("Batch added");
    setForm({ name: "", exam: "CUET", price_original: 0, price_early_bird: 0, early_bird_active: true, enrollment_link: "", features_text: "", seats_total: 50, seats_filled: 0 });
    setShowAdd(false);
    load();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Batches"
        subtitle="Manage course batches, pricing, and seat availability"
        action={
          <button onClick={() => setShowAdd((s) => !s)} className={accentBtn}>
            <Plus size={14} /> {showAdd ? "Close" : "Add Batch"}
          </button>
        }
      />

      {showAdd && (
        <div className={`${cardCls} mb-6 border-accent`}>
          <h3 className="font-black mb-4">New Batch</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Name</label>
              <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Exam</label>
              <select className={inputCls} value={form.exam} onChange={(e) => setForm({ ...form, exam: e.target.value })}>
                <option>CUET</option>
                <option>NCET</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Original ₹</label>
              <input type="number" className={inputCls} value={form.price_original} onChange={(e) => setForm({ ...form, price_original: +e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Early Bird ₹</label>
              <input type="number" className={inputCls} value={form.price_early_bird} onChange={(e) => setForm({ ...form, price_early_bird: +e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Total Seats</label>
              <input type="number" className={inputCls} value={form.seats_total} onChange={(e) => setForm({ ...form, seats_total: +e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Seats Filled</label>
              <input type="number" className={inputCls} value={form.seats_filled} onChange={(e) => setForm({ ...form, seats_filled: +e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Enrollment Link</label>
              <input className={inputCls} value={form.enrollment_link} onChange={(e) => setForm({ ...form, enrollment_link: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Features (one per line)</label>
              <textarea className={inputCls} rows={4} value={form.features_text} onChange={(e) => setForm({ ...form, features_text: e.target.value })} />
            </div>
            <label className="flex items-center gap-2 sm:col-span-2 text-sm">
              <input type="checkbox" checked={form.early_bird_active} onChange={(e) => setForm({ ...form, early_bird_active: e.target.checked })} />
              Early bird pricing active
            </label>
          </div>
          <button onClick={addBatch} className={`${primaryBtn} mt-4`}>
            <Save size={14} /> Create batch
          </button>
        </div>
      )}

      {loading ? (
        <SkeletonRows count={2} />
      ) : items.length === 0 ? (
        <EmptyState emoji="🎓" title="No batches yet" hint="Add one above to start enrolling students" />
      ) : (
        <div className="space-y-4">
          {items.map((b) => {
            const e = edits[b.id] || {};
            const featuresText = e.features_text ?? (b.features?.join("\n") || "");
            const dirty = Object.keys(edits[b.id] || {}).length > 0;
            return (
              <div key={b.id} className={cardCls}>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2 flex items-center gap-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-bold">{b.exam}</span>
                    <input
                      defaultValue={b.name}
                      onChange={(ev) => setEdit(b.id, { name: ev.target.value })}
                      className="flex-1 font-black text-base bg-transparent border-b-2 border-transparent focus:border-primary outline-none pb-1"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Original ₹</label>
                    <input type="number" defaultValue={b.price_original} onChange={(ev) => setEdit(b.id, { price_original: +ev.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Early Bird ₹</label>
                    <input type="number" defaultValue={b.price_early_bird} onChange={(ev) => setEdit(b.id, { price_early_bird: +ev.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Total Seats</label>
                    <input type="number" defaultValue={b.seats_total} onChange={(ev) => setEdit(b.id, { seats_total: +ev.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Seats Filled</label>
                    <input type="number" defaultValue={b.seats_filled} onChange={(ev) => setEdit(b.id, { seats_filled: +ev.target.value })} className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Enrollment Link</label>
                    <input defaultValue={b.enrollment_link} onChange={(ev) => setEdit(b.id, { enrollment_link: ev.target.value })} className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Features (one per line)</label>
                    <textarea
                      value={featuresText}
                      onChange={(ev) => setEdit(b.id, { features_text: ev.target.value })}
                      rows={5}
                      className={inputCls}
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      defaultChecked={b.early_bird_active}
                      onChange={(ev) => setEdit(b.id, { early_bird_active: ev.target.checked })}
                    />
                    Early bird active
                  </label>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <DeleteConfirm onConfirm={() => remove(b.id)} />
                  <button onClick={() => save(b.id)} disabled={!dirty} className={`${primaryBtn} disabled:opacity-40`}>
                    <Save size={14} /> Save changes
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
