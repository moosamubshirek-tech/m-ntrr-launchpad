import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Megaphone,
  GraduationCap,
  Trophy,
  Video,
  Users,
  Building2,
  Settings as SettingsIcon,
  CalendarDays,
  LogOut,
<<<<<<< HEAD
  PlayCircle,
=======
>>>>>>> ed843df3e1ad1e1710a571fbbf28d860abddf8af
} from "lucide-react";

const items = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Announcements", url: "/admin/dashboard/announcements", icon: Megaphone },
  { title: "Batches", url: "/admin/dashboard/batches", icon: GraduationCap },
  { title: "Toppers", url: "/admin/dashboard/toppers", icon: Trophy },
  { title: "Testimonials", url: "/admin/dashboard/testimonials", icon: Video },
  { title: "Leads", url: "/admin/dashboard/leads", icon: Users },
  { title: "Universities", url: "/admin/dashboard/universities", icon: Building2 },
  { title: "Class Schedule", url: "/admin/dashboard/schedule", icon: CalendarDays },
<<<<<<< HEAD
  { title: "Demo & Mocks", url: "/admin/dashboard/demo-mocks", icon: PlayCircle },
=======
>>>>>>> ed843df3e1ad1e1710a571fbbf28d860abddf8af
  { title: "Settings", url: "/admin/dashboard/settings", icon: SettingsIcon },
];

function AppSidebar({ onLogout }: { onLogout: () => void }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-black shrink-0">
            m
          </div>
          {!collapsed && (
            <span className="font-black text-sidebar-foreground text-base">
              mêntrr<span className="text-sidebar-primary">.</span> Admin
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  item.url === "/admin/dashboard"
                    ? location.pathname === "/admin/dashboard"
                    : location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink to={item.url} end={item.url === "/admin/dashboard"}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin");
      else setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/admin");
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Loading...
      </div>
    );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar onLogout={handleLogout} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b border-border bg-card px-4 sticky top-0 z-30">
            <SidebarTrigger />
            <h1 className="font-bold text-foreground text-sm sm:text-base">Admin Panel</h1>
          </header>
          <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
