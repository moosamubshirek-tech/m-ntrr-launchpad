import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PublicLayout from "@/components/PublicLayout";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import SchedulePage from "./pages/SchedulePage";
import ResultsPage from "./pages/ResultsPage";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardHome from "./pages/admin/DashboardHome";
import AnnouncementsAdmin from "./pages/admin/AnnouncementsAdmin";
import BatchesAdmin from "./pages/admin/BatchesAdmin";
import ToppersAdmin from "./pages/admin/ToppersAdmin";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin";
import LeadsAdmin from "./pages/admin/LeadsAdmin";
import UniversitiesAdmin from "./pages/admin/UniversitiesAdmin";
import ScheduleAdmin from "./pages/admin/ScheduleAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="announcements" element={<AnnouncementsAdmin />} />
            <Route path="batches" element={<BatchesAdmin />} />
            <Route path="toppers" element={<ToppersAdmin />} />
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="leads" element={<LeadsAdmin />} />
            <Route path="universities" element={<UniversitiesAdmin />} />
            <Route path="schedule" element={<ScheduleAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
