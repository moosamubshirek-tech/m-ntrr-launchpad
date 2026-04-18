import { Phone, MapPin, Globe, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useSetting, useSettings, normalizePhone, instagramUrl, youtubeUrl, websiteUrl } from "@/hooks/useSettings";

export default function Footer() {
  const settings = useSettings();
  const enrollLink = settings.enrollment_link;
  const phone = normalizePhone(settings.phone);
  const igHandle = settings.instagram || "";
  const ytHandle = settings.youtube || "";
  const site = settings.website || "";
  const tagline = settings.tagline || "Prepare the mêntrr. way!";
  const address = settings.address || "";

  return (
    <footer className="bg-indigo text-primary-foreground/80 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <Link to="/" className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-black text-primary-foreground">mêntrr</span>
              <span className="text-rose text-2xl font-black">.</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Kerala's most result-driven CUET & NCET coaching platform. {tagline}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/about" className="hover:text-rose transition-colors">About</Link>
              <Link to="/courses" className="hover:text-rose transition-colors">Courses</Link>
              <Link to="/results" className="hover:text-rose transition-colors">Results</Link>
              <Link to="/contact" className="hover:text-rose transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href={phone.tel} className="flex items-center gap-2 hover:text-rose transition-colors">
                <Phone size={14} /> {phone.display}
              </a>
              {address && (
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  <span>{address}</span>
                </div>
              )}
              {site && (
                <a href={websiteUrl(site)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-rose transition-colors">
                  <Globe size={14} /> {site}
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-4">Follow Us</h4>
            <div className="flex flex-col gap-3 text-sm">
              {igHandle && (
                <a href={instagramUrl(igHandle)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-rose transition-colors">
                  <Instagram size={14} /> {igHandle}
                </a>
              )}
              {ytHandle && (
                <a href={youtubeUrl(ytHandle)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-rose transition-colors">
                  <Youtube size={14} /> {ytHandle}
                </a>
              )}
            </div>
            <a
              href={enrollLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-rose text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold btn-cartoon border-primary-foreground/30 hover:bg-rose-light transition-colors"
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
