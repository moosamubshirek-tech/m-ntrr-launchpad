import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import WavyDivider from "@/components/WavyDivider";
import { useSettings, normalizePhone } from "@/hooks/useSettings";

export default function ContactPage() {
  const settings = useSettings();
  const phone = normalizePhone(settings.phone);
  const address = settings.address;
  const [form, setForm] = useState({ name: "", email: "", phone: "", batch_interest: "CUET", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name: form.name,
      email: form.email || null,
      phone: form.phone || null,
      batch_interest: form.batch_interest,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Inquiry Sent! ✅", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", phone: "", batch_interest: "CUET", message: "" });
    }
  };

  return (
    <div className="pt-24">
      <section className="bg-lavender py-20 relative overflow-hidden">
        <div className="blob-indigo w-[300px] h-[300px] -top-10 -left-10" />
        <div className="blob-rose w-[200px] h-[200px] bottom-0 right-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
              Get in <span className="squiggly-underline text-accent">Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have questions? Reach out and we'll help you get started
            </p>
          </ScrollReveal>
        </div>
        <WavyDivider nextBg="white" />
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <ScrollReveal>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-4">Contact Details</h3>
                  <div className="space-y-4">
                    <a href={phone.tel} className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                      <Phone size={18} className="text-accent" /> {phone.display}
                    </a>
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
                      {address}
                    </div>
                    <a
                      href={phone.wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <MessageCircle size={18} className="text-accent" /> WhatsApp Us
                    </a>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-3xl overflow-hidden border-2 border-border h-64" style={{ boxShadow: '4px 4px 0px hsl(var(--foreground) / 0.08)' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.174!2d75.7804!3d11.2588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE1JzMxLjciTiA3NcKwNDYnNDkuNCJF!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="mêntrr location"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal delay={0.15}>
              <form onSubmit={handleSubmit} className="bg-card border-t-[4px] border-primary rounded-3xl p-6 sm:p-8 space-y-4" style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}>
                <h3 className="font-bold text-lg mb-2">Send us a message</h3>
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-2 border-border rounded-2xl px-4 py-3 text-sm bg-background focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border-2 border-border rounded-2xl px-4 py-3 text-sm bg-background focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border-2 border-border rounded-2xl px-4 py-3 text-sm bg-background focus:border-primary focus:outline-none transition-colors"
                />
                <select
                  value={form.batch_interest}
                  onChange={(e) => setForm({ ...form, batch_interest: e.target.value })}
                  className="w-full border-2 border-border rounded-2xl px-4 py-3 text-sm bg-background focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="CUET">CUET UG</option>
                  <option value="NCET">NCET</option>
                  <option value="Both">Both</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent text-accent-foreground py-3 rounded-full font-bold btn-cartoon hover:bg-rose-light transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
