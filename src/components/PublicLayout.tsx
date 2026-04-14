import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UrgencyBar from "@/components/UrgencyBar";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function PublicLayout() {
  return (
    <>
      <UrgencyBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
