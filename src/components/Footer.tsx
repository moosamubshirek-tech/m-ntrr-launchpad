import { Phone, MapPin, Instagram, Youtube, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSetting, useSettings, normalizePhone, instagramUrl, youtubeUrl } from "@/hooks/useSettings";

export default function Footer() {
  const settings = useSettings();
  const enrollLink = settings.enrollment_link;
  const phone = normalizePhone(settings.phone);
  const igHandle = settings.instagram || "";
  const ytHandle = settings.youtube || "";
  const tagline = settings.tagline || "Prepare the mêntrr. way!";
  const address = settings.address || "";

  return (
    <footer className="bg-indigo text-primary-foreground/80 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="lg:pr-8">
            <Link to="/" className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-black text-primary-foreground">mêntrr</span>
              <span className="text-rose text-2xl font-black">.</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Kerala's most trusted CUET & NCET coaching platform. Join thousands of students who secured admissions in top central universities.
            </p>
            <a
              href={phone.wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-rose/10 hover:bg-rose/20 text-rose px-4 py-2.5 rounded-full text-sm font-semibold transition-colors"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="hover:text-rose transition-colors py-1.5 flex items-center gap-2">
                <ArrowRight size={14} className="text-rose" /> Home
              </Link>
              <Link to="/about" className="hover:text-rose transition-colors py-1.5 flex items-center gap-2">
                <ArrowRight size={14} className="text-rose" /> About Us
              </Link>
              <Link to="/courses" className="hover:text-rose transition-colors py-1.5 flex items-center gap-2">
                <ArrowRight size={14} className="text-rose" /> Courses
              </Link>
              <Link to="/results" className="hover:text-rose transition-colors py-1.5 flex items-center gap-2">
                <ArrowRight size={14} className="text-rose" /> Results
              </Link>
              <Link to="/contact" className="hover:text-rose transition-colors py-1.5 flex items-center gap-2">
                <ArrowRight size={14} className="text-rose" /> Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href={phone.tel} className="flex items-center gap-3 hover:text-rose transition-colors py-1.5">
                <div className="w-8 h-8 rounded-full bg-rose/10 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-rose" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/50">Phone</p>
                  <p>{phone.display}</p>
                </div>
              </a>
              {address && (
                <div className="flex items-start gap-3 py-1.5">
                  <div className="w-8 h-8 rounded-full bg-rose/10 flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-rose" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/50">Address</p>
                    <p className="text-sm leading-tight">{address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Follow Us</h4>
            <div className="flex flex-col gap-3 text-sm mb-6">
              {igHandle && (
                <a href={instagramUrl(igHandle)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-rose transition-colors py-1.5">
                  <div className="w-8 h-8 rounded-full bg-rose/10 flex items-center justify-center shrink-0">
                    <Instagram size={14} className="text-rose" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/50">Instagram</p>
                    <p>{igHandle}</p>
                  </div>
                </a>
              )}
              {ytHandle && (
                <a href={youtubeUrl(ytHandle)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-rose transition-colors py-1.5">
                  <div className="w-8 h-8 rounded-full bg-rose/10 flex items-center justify-center shrink-0">
                    <Youtube size={14} className="text-rose" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/50">YouTube</p>
                    <p>{ytHandle}</p>
                  </div>
                </a>
              )}
            </div>
            <a
              href={enrollLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose text-primary-foreground px-6 py-3.5 rounded-full text-sm font-bold btn-cartoon hover:bg-rose-light transition-colors"
            >
              Enroll Now →
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} mêntrr. All rights reserved.</p>
          <p>Made with ❤️ for Kerala students</p>
        </div>
      </div>
    </footer>
  );
}