<<<<<<< HEAD
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Play, FileText, ExternalLink } from "lucide-react";
import WavyDivider from "@/components/WavyDivider";
import { supabase } from "@/integrations/supabase/client";

const DEMO_MOCK_KEYS = [
  "demo_class_title",
  "demo_class_description",
  "demo_class_link",
  "mock_test_title",
  "mock_test_description",
  "cuet_mock_link",
  "ncet_mock_link",
] as const;

interface DemoMockSettings {
  demo_class_title: string;
  demo_class_description: string;
  demo_class_link: string;
  mock_test_title: string;
  mock_test_description: string;
  cuet_mock_link: string;
  ncet_mock_link: string;
}

const DEFAULTS: DemoMockSettings = {
  demo_class_title: "Free Sample Class",
  demo_class_description: "Watch a full live session — see how we teach CUET subjects with clarity and exam focus before you commit.",
  demo_class_link: "https://www.youtube.com/playlist?list=PLA_9eRykc5j3opJL8nE_VrVbJ6jpPPfMM",
  mock_test_title: "Free Mock Test",
  mock_test_description: "Practice with our CUET & NCET sample mock tests — real exam pattern, answer key included.",
  cuet_mock_link: "https://docs.google.com/forms/d/e/1FAIpQLSd8Xx1fSnjswWCsSNVljC5x4_Bu2Hk5XrXUcfJ-zMlrj5QgOg/viewform",
  ncet_mock_link: "https://docs.google.com/forms/d/e/1FAIpQLSd8Xx1fSnjswWCsSNVljC5x4_Bu2Hk5XrXUcfJ-zMlrj5QgOg/viewform",
};

export default function FreeDemoSection() {
  const [settings, setSettings] = useState<DemoMockSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("settings").select("key,value");
      if (!data) return;

      const map: Record<string, string> = {};
      data.forEach((row) => {
        if (DEMO_MOCK_KEYS.includes(row.key as typeof DEMO_MOCK_KEYS[number])) {
          map[row.key] = row.value;
        }
      });

      setSettings({
        demo_class_title: map.demo_class_title || DEFAULTS.demo_class_title,
        demo_class_description: map.demo_class_description || DEFAULTS.demo_class_description,
        demo_class_link: map.demo_class_link || DEFAULTS.demo_class_link,
        mock_test_title: map.mock_test_title || DEFAULTS.mock_test_title,
        mock_test_description: map.mock_test_description || DEFAULTS.mock_test_description,
        cuet_mock_link: map.cuet_mock_link || DEFAULTS.cuet_mock_link,
        ncet_mock_link: map.ncet_mock_link || DEFAULTS.ncet_mock_link,
      });
      setLoading(false);
    };
    load();
  }, []);

=======
import ScrollReveal from "@/components/ScrollReveal";
import { Play, FileText } from "lucide-react";
import WavyDivider from "@/components/WavyDivider";
import { useSetting, normalizePhone, youtubeUrl } from "@/hooks/useSettings";

export default function FreeDemoSection() {
  const phone = useSetting("phone");
  const yt = useSetting("youtube");
  const wa = normalizePhone(phone).wa;
  const ytLink = youtubeUrl(yt);
>>>>>>> ed843df3e1ad1e1710a571fbbf28d860abddf8af
  return (
    <section id="free-demo" className="py-20 bg-background relative">
      <div className="section-number">04</div>
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-3">
            Try Before You <span className="squiggly-underline text-accent">Enroll</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Experience our teaching style. Zero commitment.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<<<<<<< HEAD
          {loading ? (
            <>
              <FreeDemoSkeleton />
              <FreeDemoSkeleton />
            </>
          ) : (
            <>
              <ScrollReveal delay={0.1}>
                <div
                  className="bg-card border-t-[4px] border-primary rounded-3xl p-7 text-center h-full card-tilt-left hover:-translate-y-1 transition-all"
                  style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                    <Play className="text-primary ml-0.5" size={26} fill="currentColor" />
                  </div>
                  <h3 className="font-black text-xl mb-3">{settings.demo_class_title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {settings.demo_class_description}
                  </p>
                  <a
                    href={settings.demo_class_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold btn-cartoon hover:bg-indigo-light transition-colors"
                  >
                    Watch Free Class →
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div
                  className="bg-card border-t-[4px] border-accent rounded-3xl p-7 text-center h-full card-tilt-right hover:-translate-y-1 transition-all"
                  style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20">
                    <FileText className="text-accent" size={26} />
                  </div>
                  <h3 className="font-black text-xl mb-3">{settings.mock_test_title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {settings.mock_test_description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={settings.cuet_mock_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent text-accent-foreground px-5 py-2.5 rounded-full font-bold btn-cartoon hover:bg-rose-light transition-colors text-sm"
                    >
                      CUET Mock →
                    </a>
                    <a
                      href={settings.ncet_mock_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-bold btn-cartoon hover:bg-indigo-light transition-colors text-sm"
                    >
                      NCET Mock →
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </>
          )}
=======
          {/* Free Sample Class */}
          <ScrollReveal delay={0.1}>
            <div
              className="bg-card border-t-[4px] border-primary rounded-3xl p-7 text-center h-full card-tilt-left hover:-translate-y-1 transition-all"
              style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                <Play className="text-primary ml-0.5" size={26} fill="currentColor" />
              </div>
              <h3 className="font-black text-xl mb-3">Free Sample Class</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Watch a full live session — see how we teach CUET subjects with clarity and exam focus before you commit.
              </p>
              <a
                href={ytLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold btn-cartoon hover:bg-indigo-light transition-colors"
              >
                Watch Free Class →
              </a>
            </div>
          </ScrollReveal>

          {/* Free Mock Test */}
          <ScrollReveal delay={0.2}>
            <div
              className="bg-card border-t-[4px] border-accent rounded-3xl p-7 text-center h-full card-tilt-right hover:-translate-y-1 transition-all"
              style={{ boxShadow: '5px 5px 0px hsl(var(--foreground) / 0.08)' }}
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-accent/20">
                <FileText className="text-accent" size={26} />
              </div>
              <h3 className="font-black text-xl mb-3">Free Mock Test</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Practice with our CUET & NCET sample mock tests — real exam pattern, answer key included. Get a feel for the actual exam.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`${wa}?text=Hi%2C%20please%20share%20the%20free%20CUET%20mock%20test`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-accent-foreground px-5 py-2.5 rounded-full font-bold btn-cartoon hover:bg-rose-light transition-colors text-sm"
                >
                  CUET Mock →
                </a>
                <a
                  href={`${wa}?text=Hi%2C%20please%20share%20the%20free%20NCET%20mock%20test`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-bold btn-cartoon hover:bg-indigo-light transition-colors text-sm"
                >
                  NCET Mock →
                </a>
              </div>
            </div>
          </ScrollReveal>
>>>>>>> ed843df3e1ad1e1710a571fbbf28d860abddf8af
        </div>
      </div>
      <div className="mt-10">
        <WavyDivider nextBg="lavender" />
      </div>
    </section>
  );
}
<<<<<<< HEAD

function FreeDemoSkeleton() {
  return (
    <div className="bg-card border-t-[4px] border-primary rounded-3xl p-7 text-center h-full animate-pulse">
      <div className="w-14 h-14 rounded-full bg-muted mx-auto mb-4" />
      <div className="h-6 w-32 bg-muted rounded mx-auto mb-3" />
      <div className="h-4 w-48 bg-muted rounded mx-auto mb-2" />
      <div className="h-4 w-40 bg-muted rounded mx-auto mb-6" />
      <div className="h-12 w-36 bg-muted rounded-full mx-auto" />
    </div>
  );
}
=======
>>>>>>> ed843df3e1ad1e1710a571fbbf28d860abddf8af
