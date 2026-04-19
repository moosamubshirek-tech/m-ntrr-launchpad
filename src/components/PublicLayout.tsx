import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UrgencyBar from "@/components/UrgencyBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function PublicLayout() {
  return (
    <>
      <UrgencyBar />
      <Navbar />
      <main className="pb-[72px] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  );
}
