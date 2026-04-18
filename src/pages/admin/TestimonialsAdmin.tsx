import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { Plus, Save } from "lucide-react";
import { PageHeader, EmptyState, SkeletonRows, DeleteConfirm, inputCls, labelCls, primaryBtn, cardCls } from "./shared";

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  return m ? m[1] : null;
}

type T = Tables<"testimonials">;

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<T[]>([]);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderEdits, setOrderEdits] = useState<Record<string, number>>({});

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("display_order").order("created_at");
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!url) return toast.error("YouTube URL required");
    const { error } = await supabase.from("testimonials").insert({ youtube_url: url, student_name: name || null });
    if (error) return toast.error(error.message);
    setUrl(""); setName("");
    toast.success("Added");
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    toast.success("Deleted");
    load();
  };

  const saveOrder = async (id: string) => {
    if (orderEdits[id] === undefined) return;
    await supabase.from("testimonials").update({ display_order: orderEdits[id] }).eq("id", id);
    setOrderEdits((p) => { const n = { ...p }; delete n[id]; return n; });
    toast.success("Order saved");
    load();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader title="Testimonials" subtitle="YouTube student testimonial videos" />

      <div className={`${cardCls} mb-6`}>
        <div className="grid sm:grid-cols-[1fr_auto] gap-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>YouTube URL</label>
              <input className={inputCls} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://youtu.be/..." />
            </div>
            <div>
              <label className={labelCls}>Student name</label>
              <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="flex items-end">
            <button onClick={add} className={primaryBtn}><Plus size={14} /> Add</button>
          </div>
        </div>
      </div>

      {loading ? (
        <SkeletonRows />
      ) : items.length === 0 ? (
        <EmptyState emoji="🎬" title="No testimonials yet" hint="Add YouTube links to show on the homepage" />
      ) : (
        <div className="space-y-2">
          {items.map((t) => {
            const id = getYouTubeId(t.youtube_url);
            const dirty = orderEdits[t.id] !== undefined;
            return (
              <div key={t.id} className="flex items-center gap-3 p-3 border-2 border-border rounded-2xl bg-card">
                {id ? (
                  <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt="" className="w-20 h-12 object-cover rounded-lg shrink-0" />
                ) : (
                  <div className="w-20 h-12 bg-muted rounded-lg shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{t.student_name || "Unnamed"}</div>
                  <div className="text-xs text-muted-foreground truncate">{t.youtube_url}</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <input
                    type="number"
                    defaultValue={t.display_order}
                    onChange={(e) => setOrderEdits((p) => ({ ...p, [t.id]: +e.target.value }))}
                    className="w-14 border-2 border-border rounded-lg px-2 py-1 text-sm bg-background text-center"
                    title="Display order"
                  />
                  {dirty && (
                    <button onClick={() => saveOrder(t.id)} className="text-primary p-1.5 rounded-lg hover:bg-primary/10">
                      <Save size={14} />
                    </button>
                  )}
                </div>
                <DeleteConfirm onConfirm={() => remove(t.id)} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
