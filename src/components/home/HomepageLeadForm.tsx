import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import WavyDivider from "@/components/WavyDivider";
import { CheckCircle2 } from "lucide-react";

export default function HomepageLeadForm() {
  const [form, setForm] = useState({ name: "", phone: "", batch_interest: "CUET" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name: form.name,
      phone: form.phone,
      batch_interest: form.batch_interest,
      status: "New",
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: "Couldn't save your details. Try again.", variant: "destructive" });
    } else {
      setDone(true);
      toast({ title: "Got it! We'll call you back ✅" });
    }
  };

  return (
    <section className="py-20 bg-lavender relative">
      <div className="section-number right-10 left-auto">10</div>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div
            className="max-w-xl mx-auto bg-card border-t-[4px] border-accent rounded-3xl p-7 sm:p-8 card-tilt-right"
            style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}
          >
            <h2 className="text-2xl sm:text-3xl font-black text-center mb-2">
              Get a <span className="squiggly-underline text-accent">Free Callback</span>
            </h2>
            <p className="text-muted-foreground text-center text-sm mb-6">
              Leave your number. We'll call you and answer all your questions.
            </p>

            {done ? (
              <div className="text-center py-6">
                <CheckCircle2 className="mx-auto mb-3 text-green-500" size={42} />
                <p className="font-bold text-foreground">Thanks, {form.name}!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Our team will call you on {form.phone} within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-2 border-border rounded-2xl px-4 py-3 text-sm bg-background focus:border-primary focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border-2 border-border rounded-2xl px-4 py-3 text-sm bg-background focus:border-primary focus:outline-none"
                />
                <select
                  value={form.batch_interest}
                  onChange={(e) => setForm({ ...form, batch_interest: e.target.value })}
                  className="w-full border-2 border-border rounded-2xl px-4 py-3 text-sm bg-background focus:border-primary focus:outline-none"
                >
                  <option value="CUET">CUET</option>
                  <option value="NCET">NCET</option>
                  <option value="Both">Both CUET & NCET</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent text-accent-foreground py-3 rounded-full font-bold btn-cartoon hover:bg-rose-light transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Call Me Back →"}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="white" />
      </div>
    </section>
  );
}
