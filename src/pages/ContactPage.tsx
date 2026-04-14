import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ContactPage() {
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
      <section className="bg-navy py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-black text-primary-foreground mb-4">
              Get in <span className="text-coral">Touch</span>
            </h1>
            <p className="text-primary-foreground/60 max-w-xl mx-auto">
              Have questions? Reach out and we'll help you get started
            </p>
          </ScrollReveal>
        </div>
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
                    <a href="tel:+917909228688" className="flex items-center gap-3 text-muted-foreground hover:text-coral transition-colors">
                      <Phone size={18} className="text-coral" /> 7909 228 688
                    </a>
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <MapPin size={18} className="text-coral mt-0.5 shrink-0" />
                      Nas Arcade, Kurial Lane, Cherooty Rd, Mananchira, Kozhikode, Kerala 673001
                    </div>
                    <a
                      href="https://wa.me/917909228688"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-coral transition-colors"
                    >
                      <MessageCircle size={18} className="text-coral" /> WhatsApp Us
                    </a>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden border border-border h-64">
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
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="font-bold text-lg mb-2">Send us a message</h3>
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:border-coral focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:border-coral focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:border-coral focus:outline-none transition-colors"
                />
                <select
                  value={form.batch_interest}
                  onChange={(e) => setForm({ ...form, batch_interest: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:border-coral focus:outline-none transition-colors"
                >
                  <option value="CUET">CUET UG</option>
                  <option value="NCET">NCET</option>
                  <option value="Both">Both</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-coral text-accent-foreground py-3 rounded-full font-bold hover:bg-coral-light transition-colors disabled:opacity-50"
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
