import { Phone, MapPin, Globe, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const ENROLL_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSd8Xx1fSnjswWCsSNVljC5x4_Bu2Hk5XrXUcfJ-zMlrj5QgOg/viewform";

export default function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground/80 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <Link to="/" className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-black text-primary-foreground">mêntrr</span>
              <span className="text-coral text-2xl font-black">.</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Kerala's most result-driven CUET & NCET coaching platform. Prepare the mêntrr. way!
            </p>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/about" className="hover:text-coral transition-colors">About</Link>
              <Link to="/courses" className="hover:text-coral transition-colors">Courses</Link>
              <Link to="/schedule" className="hover:text-coral transition-colors">Schedule</Link>
              <Link to="/results" className="hover:text-coral transition-colors">Results</Link>
              <Link to="/contact" className="hover:text-coral transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href="tel:+917909228688" className="flex items-center gap-2 hover:text-coral transition-colors">
                <Phone size={14} /> 7909 228 688
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>Nas Arcade, Kurial Lane, Cherooty Rd, Mananchira, Kozhikode, Kerala 673001</span>
              </div>
              <a href="https://www.mentrr.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-coral transition-colors">
                <Globe size={14} /> www.mentrr.in
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Follow Us</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href="https://instagram.com/mentrr_learning" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-coral transition-colors">
                <Instagram size={14} /> @mentrr_learning
              </a>
              <a href="https://youtube.com/@mentrrlearning" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-coral transition-colors">
                <Youtube size={14} /> @mentrrlearning
              </a>
            </div>
            <a
              href={ENROLL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-coral text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold hover:bg-coral-light transition-colors"
            >
              Enroll Now
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} mêntrr. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
