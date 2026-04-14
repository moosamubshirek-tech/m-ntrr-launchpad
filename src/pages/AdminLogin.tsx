import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin/dashboard");
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-primary-foreground">
            mêntrr<span className="text-coral">.</span> Admin
          </h1>
          <p className="text-primary-foreground/50 text-sm mt-2">Sign in to manage your platform</p>
        </div>
        <form onSubmit={handleLogin} className="bg-navy-light border border-primary-foreground/10 rounded-2xl p-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-navy border border-primary-foreground/20 rounded-xl px-4 py-3 text-primary-foreground text-sm placeholder:text-primary-foreground/30 focus:border-coral focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-navy border border-primary-foreground/20 rounded-xl px-4 py-3 text-primary-foreground text-sm placeholder:text-primary-foreground/30 focus:border-coral focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-coral text-accent-foreground py-3 rounded-full font-bold hover:bg-coral-light transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
