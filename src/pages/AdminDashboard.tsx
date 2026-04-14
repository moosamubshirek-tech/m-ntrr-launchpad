import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";
import { LogOut, Plus, Trash2, Download, Save } from "lucide-react";

type Tab = "announcements" | "batches" | "schedule" | "toppers" | "testimonials" | "leads" | "settings";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("announcements");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin");
      else setLoading(false);
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) return <div className="min-h-screen bg-navy flex items-center justify-center text-primary-foreground">Loading...</div>;

  const tabs: { key: Tab; label: string }[] = [
    { key: "announcements", label: "Announcements" },
    { key: "batches", label: "Batches" },
    { key: "schedule", label: "Schedule" },
    { key: "toppers", label: "Toppers" },
    { key: "testimonials", label: "Testimonials" },
    { key: "leads", label: "Leads" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-navy py-4 px-4 flex items-center justify-between sticky top-0 z-40">
        <h1 className="text-lg font-black text-primary-foreground">
          mêntrr<span className="text-coral">.</span> Admin
        </h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-primary-foreground/60 hover:text-coral text-sm">
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="flex flex-wrap gap-2 p-4 border-b border-border bg-card sticky top-14 z-30">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
              tab === t.key ? "bg-coral text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        {tab === "announcements" && <AnnouncementsAdmin />}
        {tab === "batches" && <BatchesAdmin />}
        {tab === "schedule" && <ScheduleAdmin />}
        {tab === "toppers" && <ToppersAdmin />}
        {tab === "testimonials" && <TestimonialsAdmin />}
        {tab === "leads" && <LeadsAdmin />}
        {tab === "settings" && <SettingsAdmin />}
      </div>
    </div>
  );
}

// ---- Announcements ----
function AnnouncementsAdmin() {
  const [items, setItems] = useState<Tables<"announcements">[]>([]);
  const [newText, setNewText] = useState("");

  const load = () => supabase.from("announcements").select("*").order("created_at", { ascending: false }).then(({ data }) => { if (data) setItems(data); });
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!newText.trim()) return;
    await supabase.from("announcements").insert({ text: newText });
    setNewText("");
    load();
    toast({ title: "Added!" });
  };

  const toggle = async (id: string, active: boolean) => {
    await supabase.from("announcements").update({ active: !active }).eq("id", id);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("announcements").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Announcements</h2>
      <div className="flex gap-2 mb-6">
        <input value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="New announcement..." className="flex-1 border border-border rounded-xl px-4 py-2 text-sm bg-background focus:border-coral focus:outline-none" />
        <button onClick={add} className="bg-coral text-accent-foreground px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1"><Plus size={14} /> Add</button>
      </div>
      <div className="space-y-2">
        {items.map((a) => (
          <div key={a.id} className="flex items-center gap-3 p-3 border border-border rounded-xl bg-card">
            <button onClick={() => toggle(a.id, a.active)} className={`w-3 h-3 rounded-full shrink-0 ${a.active ? "bg-green-500" : "bg-muted-foreground/30"}`} title="Toggle active" />
            <span className="flex-1 text-sm">{a.text}</span>
            <button onClick={() => remove(a.id)} className="text-destructive hover:text-destructive/80"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Batches ----
function BatchesAdmin() {
  const [items, setItems] = useState<Tables<"batches">[]>([]);
  const load = () => supabase.from("batches").select("*").then(({ data }) => { if (data) setItems(data); });
  useEffect(() => { load(); }, []);

  const update = async (id: string, field: string, value: unknown) => {
    await supabase.from("batches").update({ [field]: value } as never).eq("id", id);
    load();
    toast({ title: "Updated!" });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Batch Management</h2>
      <div className="space-y-4">
        {items.map((b) => (
          <div key={b.id} className="p-4 border border-border rounded-xl bg-card space-y-3">
            <input defaultValue={b.name} onBlur={(e) => update(b.id, "name", e.target.value)} className="w-full font-bold text-sm border-b border-border bg-transparent pb-1 focus:border-coral focus:outline-none" />
            <div className="flex gap-4 flex-wrap">
              <div>
                <label className="text-xs text-muted-foreground">Original ₹</label>
                <input type="number" defaultValue={b.price_original} onBlur={(e) => update(b.id, "price_original", parseInt(e.target.value))} className="w-24 border border-border rounded-lg px-2 py-1 text-sm bg-background block" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Early Bird ₹</label>
                <input type="number" defaultValue={b.price_early_bird} onBlur={(e) => update(b.id, "price_early_bird", parseInt(e.target.value))} className="w-24 border border-border rounded-lg px-2 py-1 text-sm bg-background block" />
              </div>
              <div className="flex items-end gap-2">
                <label className="text-xs text-muted-foreground">Early Bird</label>
                <button onClick={() => update(b.id, "early_bird_active", !b.early_bird_active)} className={`px-3 py-1 rounded-full text-xs font-bold ${b.early_bird_active ? "bg-coral text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                  {b.early_bird_active ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Schedule ----
function ScheduleAdmin() {
  const [items, setItems] = useState<Tables<"schedule">[]>([]);
  const [form, setForm] = useState({ date: "", stream: "Science", subject: "", topic: "", start_time: "", end_time: "" });

  const load = () => supabase.from("schedule").select("*").order("date").order("start_time").then(({ data }) => { if (data) setItems(data); });
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.date || !form.subject || !form.topic || !form.start_time || !form.end_time) return;
    await supabase.from("schedule").insert(form);
    setForm({ date: "", stream: "Science", subject: "", topic: "", start_time: "", end_time: "" });
    load();
    toast({ title: "Class added!" });
  };

  const remove = async (id: string) => {
    await supabase.from("schedule").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Schedule Manager</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="border border-border rounded-lg px-3 py-2 text-sm bg-background" />
        <select value={form.stream} onChange={(e) => setForm({ ...form, stream: e.target.value })} className="border border-border rounded-lg px-3 py-2 text-sm bg-background">
          {["Science", "Commerce", "Humanities", "General"].map((s) => <option key={s}>{s}</option>)}
        </select>
        <input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="border border-border rounded-lg px-3 py-2 text-sm bg-background" />
        <input placeholder="Topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="border border-border rounded-lg px-3 py-2 text-sm bg-background col-span-2 sm:col-span-1" />
        <input type="time" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} className="border border-border rounded-lg px-3 py-2 text-sm bg-background" />
        <input type="time" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} className="border border-border rounded-lg px-3 py-2 text-sm bg-background" />
      </div>
      <button onClick={add} className="bg-coral text-accent-foreground px-4 py-2 rounded-xl text-sm font-bold mb-6 flex items-center gap-1"><Plus size={14} /> Add Class</button>

      <div className="space-y-2">
        {items.map((s) => (
          <div key={s.id} className="flex items-center gap-3 p-3 border border-border rounded-xl bg-card text-sm">
            <span className="font-medium w-24 shrink-0">{s.date}</span>
            <span className="text-coral font-bold w-20 shrink-0">{s.stream}</span>
            <span className="flex-1">{s.subject} — {s.topic}</span>
            <span className="text-muted-foreground text-xs">{s.start_time?.slice(0,5)}-{s.end_time?.slice(0,5)}</span>
            <button onClick={() => remove(s.id)} className="text-destructive"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Toppers ----
function ToppersAdmin() {
  const [items, setItems] = useState<Tables<"toppers">[]>([]);
  const [form, setForm] = useState({ name: "", subject: "", rank: "", university: "" });

  const load = () => supabase.from("toppers").select("*").then(({ data }) => { if (data) setItems(data); });
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.name || !form.subject || !form.rank) return;
    await supabase.from("toppers").insert({ ...form, university: form.university || null });
    setForm({ name: "", subject: "", rank: "", university: "" });
    load();
    toast({ title: "Topper added!" });
  };

  const remove = async (id: string) => {
    await supabase.from("toppers").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Toppers & Results</h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border border-border rounded-lg px-3 py-2 text-sm bg-background" />
        <input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="border border-border rounded-lg px-3 py-2 text-sm bg-background" />
        <input placeholder="Rank (e.g., AIR 1)" value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })} className="border border-border rounded-lg px-3 py-2 text-sm bg-background" />
        <input placeholder="University" value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })} className="border border-border rounded-lg px-3 py-2 text-sm bg-background" />
      </div>
      <button onClick={add} className="bg-coral text-accent-foreground px-4 py-2 rounded-xl text-sm font-bold mb-6 flex items-center gap-1"><Plus size={14} /> Add Topper</button>
      <div className="space-y-2">
        {items.map((t) => (
          <div key={t.id} className="flex items-center gap-3 p-3 border border-border rounded-xl bg-card text-sm">
            <span className="flex-1 font-medium">{t.name}</span>
            <span className="text-coral">{t.rank}</span>
            <span className="text-muted-foreground">{t.subject}</span>
            <button onClick={() => remove(t.id)} className="text-destructive"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Testimonials ----
function TestimonialsAdmin() {
  const [items, setItems] = useState<Tables<"testimonials">[]>([]);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  const load = () => supabase.from("testimonials").select("*").then(({ data }) => { if (data) setItems(data); });
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!url) return;
    await supabase.from("testimonials").insert({ youtube_url: url, student_name: name || null });
    setUrl(""); setName("");
    load();
    toast({ title: "Added!" });
  };

  const remove = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Testimonials</h2>
      <div className="flex gap-2 mb-6">
        <input placeholder="YouTube URL" value={url} onChange={(e) => setUrl(e.target.value)} className="flex-1 border border-border rounded-lg px-3 py-2 text-sm bg-background" />
        <input placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} className="w-40 border border-border rounded-lg px-3 py-2 text-sm bg-background" />
        <button onClick={add} className="bg-coral text-accent-foreground px-4 py-2 rounded-xl text-sm font-bold"><Plus size={14} /></button>
      </div>
      <div className="space-y-2">
        {items.map((t) => (
          <div key={t.id} className="flex items-center gap-3 p-3 border border-border rounded-xl bg-card text-sm">
            <span className="flex-1 truncate">{t.youtube_url}</span>
            <span className="text-muted-foreground">{t.student_name}</span>
            <button onClick={() => remove(t.id)} className="text-destructive"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Leads ----
function LeadsAdmin() {
  const [items, setItems] = useState<Tables<"leads">[]>([]);
  const load = () => supabase.from("leads").select("*").order("created_at", { ascending: false }).then(({ data }) => { if (data) setItems(data); });
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    load();
  };

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Email", "Batch Interest", "Status", "Date"];
    const rows = items.map((l) => [l.name, l.phone || "", l.email || "", l.batch_interest || "", l.status, new Date(l.created_at).toLocaleDateString()]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "leads.csv";
    a.click();
  };

  const statuses = ["New", "Contacted", "Enrolled", "Dropped"];
  const statusColors: Record<string, string> = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-yellow-100 text-yellow-700",
    Enrolled: "bg-green-100 text-green-700",
    Dropped: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Leads ({items.length})</h2>
        <button onClick={exportCSV} className="flex items-center gap-1 text-sm text-coral font-bold hover:underline"><Download size={14} /> Export CSV</button>
      </div>
      <div className="space-y-2">
        {items.map((l) => (
          <div key={l.id} className="p-3 border border-border rounded-xl bg-card text-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold">{l.name}</span>
              <select
                value={l.status}
                onChange={(e) => updateStatus(l.id, e.target.value)}
                className={`text-xs font-bold rounded-full px-3 py-1 border-0 ${statusColors[l.status] || "bg-muted"}`}
              >
                {statuses.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="text-muted-foreground text-xs flex gap-4">
              {l.phone && <span>📱 {l.phone}</span>}
              {l.email && <span>✉️ {l.email}</span>}
              {l.batch_interest && <span>📚 {l.batch_interest}</span>}
              <span>{new Date(l.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-center py-10">No leads yet</p>}
      </div>
    </div>
  );
}

// ---- Settings ----
function SettingsAdmin() {
  const [items, setItems] = useState<Tables<"settings">[]>([]);
  const load = () => supabase.from("settings").select("*").then(({ data }) => { if (data) setItems(data); });
  useEffect(() => { load(); }, []);

  const save = async (id: string, value: string) => {
    await supabase.from("settings").update({ value }).eq("id", id);
    toast({ title: "Saved!" });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div className="space-y-3">
        {items.map((s) => (
          <div key={s.id} className="flex items-center gap-3 p-3 border border-border rounded-xl bg-card">
            <span className="text-sm font-bold text-coral w-32 shrink-0 capitalize">{s.key.replace(/_/g, " ")}</span>
            <input
              defaultValue={s.value}
              onBlur={(e) => save(s.id, e.target.value)}
              className="flex-1 border border-border rounded-lg px-3 py-2 text-sm bg-background focus:border-coral focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
