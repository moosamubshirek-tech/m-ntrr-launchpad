import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { Plus } from "lucide-react";
import { PageHeader, EmptyState, SkeletonRows, DeleteConfirm, inputCls, labelCls, primaryBtn, cardCls } from "./shared";

export default function ScheduleAdmin() {
  const [items, setItems] = useState<Tables<"schedule">[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ date: "", stream: "Science", subject: "", topic: "", start_time: "", end_time: "" });

  const load = async () => {
    const { data } = await supabase.from("schedule").select("*").order("date").order("start_time");
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.date || !form.subject || !form.topic || !form.start_time || !form.end_time)
      return toast.error("Fill all fields");
    const { error } = await supabase.from("schedule").insert(form);
    if (error) return toast.error(error.message);
    setForm({ date: "", stream: "Science", subject: "", topic: "", start_time: "", end_time: "" });
    toast.success("Class added");
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("schedule").delete().eq("id", id);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader title="Class Schedule" subtitle="Internal — only enrolled students see this on /schedule" />

      <div className={`${cardCls} mb-6`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div><label className={labelCls}>Date</label><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} /></div>
          <div>
            <label className={labelCls}>Stream</label>
            <select value={form.stream} onChange={(e) => setForm({ ...form, stream: e.target.value })} className={inputCls}>
              {["Science", "Commerce", "Humanities", "General"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div><label className={labelCls}>Subject</label><input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} /></div>
          <div className="col-span-2 sm:col-span-1"><label className={labelCls}>Topic</label><input value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className={inputCls} /></div>
          <div><label className={labelCls}>Start</label><input type="time" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} className={inputCls} /></div>
          <div><label className={labelCls}>End</label><input type="time" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} className={inputCls} /></div>
        </div>
        <button onClick={add} className={`${primaryBtn} mt-4`}><Plus size={14} /> Add class</button>
      </div>

      {loading ? (
        <SkeletonRows />
      ) : items.length === 0 ? (
        <EmptyState emoji="📅" title="No classes scheduled" hint="Add upcoming live sessions above" />
      ) : (
        <div className="space-y-2">
          {items.map((s) => (
            <div key={s.id} className="flex items-center gap-3 p-3 border-2 border-border rounded-2xl bg-card text-sm flex-wrap">
              <span className="font-bold w-28 shrink-0">{s.date}</span>
              <span className="text-primary font-bold w-24 shrink-0">{s.stream}</span>
              <span className="flex-1 min-w-[200px]">{s.subject} — {s.topic}</span>
              <span className="text-muted-foreground text-xs">{s.start_time?.slice(0,5)}–{s.end_time?.slice(0,5)}</span>
              <DeleteConfirm onConfirm={() => remove(s.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
