import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { Plus, Save, Pencil } from "lucide-react";
import { PageHeader, EmptyState, SkeletonRows, DeleteConfirm, inputCls, primaryBtn, cardCls } from "./shared";

export default function AnnouncementsAdmin() {
  const [items, setItems] = useState<Tables<"announcements">[]>([]);
  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!newText.trim()) return;
    const { error } = await supabase.from("announcements").insert({ text: newText });
    if (error) return toast.error(error.message);
    setNewText("");
    toast.success("Announcement added");
    load();
  };

  const toggle = async (id: string, active: boolean) => {
    await supabase.from("announcements").update({ active: !active }).eq("id", id);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("announcements").delete().eq("id", id);
    toast.success("Deleted");
    load();
  };

  const saveEdit = async () => {
    if (!editingId) return;
    await supabase.from("announcements").update({ text: editText }).eq("id", editingId);
    setEditingId(null);
    toast.success("Updated");
    load();
  };

  const activeCount = items.filter((i) => i.active).length;
  const inactiveCount = items.length - activeCount;

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Announcements"
        subtitle={`${activeCount} active · ${inactiveCount} inactive`}
      />

      <div className={`${cardCls} mb-6`}>
        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="New announcement…"
            className={inputCls}
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <button onClick={add} className={primaryBtn}>
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      {loading ? (
        <SkeletonRows />
      ) : items.length === 0 ? (
        <EmptyState emoji="📣" title="No announcements yet" hint="Add one above to display in the urgency bar" />
      ) : (
        <div className="space-y-2">
          {items.map((a) => (
            <div key={a.id} className="flex items-center gap-3 p-3 border-2 border-border rounded-2xl bg-card">
              <button
                onClick={() => toggle(a.id, a.active)}
                className={`w-3 h-3 rounded-full shrink-0 ${a.active ? "bg-green-500" : "bg-muted-foreground/30"}`}
                title="Toggle active"
              />
              {editingId === a.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className={inputCls}
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                  />
                  <button onClick={saveEdit} className="text-primary p-1.5 rounded-lg hover:bg-primary/10">
                    <Save size={14} />
                  </button>
                </>
              ) : (
                <>
                  <span className={`flex-1 text-sm ${!a.active ? "text-muted-foreground line-through" : ""}`}>
                    {a.text}
                  </span>
                  <button
                    onClick={() => { setEditingId(a.id); setEditText(a.text); }}
                    className="text-muted-foreground hover:text-primary p-1.5 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                </>
              )}
              <DeleteConfirm onConfirm={() => remove(a.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
