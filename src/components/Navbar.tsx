import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSetting } from "@/hooks/useSettings";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Courses", path: "/courses" },
  { label: "Results", path: "/results" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const enrollLink = useSetting("enrollment_link");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-indigo/95 backdrop-blur-md py-2 shadow-lg"
          : "bg-indigo py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-1">
          <span className="text-2xl font-black tracking-tight text-primary-foreground">
            mêntrr
          </span>
          <span className="text-rose text-2xl font-black">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm font-semibold transition-colors hover:text-rose-light ${
                location.pathname === l.path
                  ? "text-primary-foreground"
                  : "text-primary-foreground/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={enrollLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-rose text-primary-foreground px-5 py-2 rounded-full text-sm font-bold border-2 border-primary-foreground/20 hover:bg-rose-light transition-all animate-pulse-glow"
          >
            Enroll Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary-foreground p-2 -mr-2 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-indigo/98 backdrop-blur-md border-t border-primary-foreground/10"
          >
            <div className="container mx-auto px-4 py-4 pb-6 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`text-sm font-semibold py-3 border-b border-primary-foreground/10 block w-full ${
                    location.pathname === l.path
                      ? "text-primary-foreground"
                      : "text-primary-foreground/70"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={enrollLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rose text-primary-foreground px-5 py-3.5 rounded-full text-sm font-bold text-center block w-full mt-2"
              >
                Enroll Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
