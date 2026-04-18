import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader, StatCard, SkeletonRows, EmptyState, cardCls } from "./shared";
import { Megaphone, GraduationCap, Trophy, Users, Building2, Video, Settings as SettingsIcon } from "lucide-react";

interface RecentLead {
  id: string;
  name: string;
  phone: string | null;
  batch_interest: string | null;
  status: string;
  created_at: string;
}

export default function DashboardHome() {
  const [stats, setStats] = useState({ totalLeads: 0, newToday: 0, batches: 0, toppers: 0 });
  const [recent, setRecent] = useState<RecentLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();

      const [lc, lt, bc, tc, rl] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", todayISO),
        supabase.from("batches").select("id", { count: "exact", head: true }),
        supabase.from("toppers").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id,name,phone,batch_interest,status,created_at").order("created_at", { ascending: false }).limit(5),
      ]);

      setStats({
        totalLeads: lc.count || 0,
        newToday: lt.count || 0,
        batches: bc.count || 0,
        toppers: tc.count || 0,
      });
      setRecent(rl.data || []);
      setLoading(false);
    };
    load();
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const dateStr = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const quickActions = [
    { label: "Announcements", icon: Megaphone, url: "/admin/dashboard/announcements" },
    { label: "Batches", icon: GraduationCap, url: "/admin/dashboard/batches" },
    { label: "Toppers", icon: Trophy, url: "/admin/dashboard/toppers" },
    { label: "Testimonials", icon: Video, url: "/admin/dashboard/testimonials" },
    { label: "Universities", icon: Building2, url: "/admin/dashboard/universities" },
    { label: "Settings", icon: SettingsIcon, url: "/admin/dashboard/settings" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title={`${greeting}, Admin 👋`}
        subtitle={dateStr}
      />

      {loading ? (
        <SkeletonRows count={4} />
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <StatCard emoji="📥" label="Total Leads" value={stats.totalLeads} />
            <StatCard emoji="🔥" label="New Today" value={stats.newToday} accent />
            <StatCard emoji="🎓" label="Active Batches" value={stats.batches} />
            <StatCard emoji="🏆" label="Toppers" value={stats.toppers} />
          </div>

          <div className={`${cardCls} mb-8`}>
            <h3 className="font-black text-foreground mb-4">Recent Leads</h3>
            {recent.length === 0 ? (
              <EmptyState emoji="📭" title="No leads yet" hint="New leads will show up here" />
            ) : (
              <div className="space-y-2">
                {recent.map((l) => (
                  <div key={l.id} className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-background border border-border text-sm">
                    <div className="min-w-0 flex-1">
                      <div className="font-bold truncate">{l.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {l.phone || "—"} · {l.batch_interest || "—"}
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                      {l.status}
                    </span>
                    <span className="text-xs text-muted-foreground hidden sm:block shrink-0">
                      {new Date(l.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                <Link
                  to="/admin/dashboard/leads"
                  className="block text-center text-sm font-bold text-primary hover:underline pt-2"
                >
                  View all leads →
                </Link>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-black text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickActions.map((a) => (
                <Link
                  key={a.url}
                  to={a.url}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-card border-2 border-border hover:border-primary hover:-translate-y-0.5 transition-all"
                >
                  <a.icon className="h-5 w-5 text-primary" />
                  <span className="font-bold text-sm">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
