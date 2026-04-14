import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Courses", path: "/courses" },
  { label: "Schedule", path: "/schedule" },
  { label: "Results", path: "/results" },
  { label: "Contact", path: "/contact" },
];

const ENROLL_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSd8Xx1fSnjswWCsSNVljC5x4_Bu2Hk5XrXUcfJ-zMlrj5QgOg/viewform";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

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
          ? "bg-navy/95 backdrop-blur-md py-2 shadow-lg"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-1">
          <span className="text-2xl font-black tracking-tight text-primary-foreground">
            mêntrr
          </span>
          <span className="text-coral text-2xl font-black">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm font-semibold transition-colors hover:text-coral ${
                location.pathname === l.path
                  ? "text-coral"
                  : "text-primary-foreground/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={ENROLL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-coral text-primary-foreground px-5 py-2 rounded-full text-sm font-bold animate-pulse-glow hover:bg-coral-light transition-colors"
          >
            Enroll Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary-foreground"
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
            className="md:hidden bg-navy/98 backdrop-blur-md border-t border-primary-foreground/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`text-sm font-semibold py-2 ${
                    location.pathname === l.path
                      ? "text-coral"
                      : "text-primary-foreground/80"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={ENROLL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-coral text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold text-center"
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
