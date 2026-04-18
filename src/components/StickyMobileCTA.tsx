import { useSetting } from "@/hooks/useSettings";

export default function StickyMobileCTA() {
  const enroll = useSetting("enrollment_link");
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t border-border py-3 px-4 flex gap-2"
      style={{ paddingBottom: `calc(0.75rem + env(safe-area-inset-bottom))` }}
    >
      <a
        href={enroll}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-accent text-accent-foreground rounded-full font-bold text-sm py-2.5 text-center"
      >
        Join CUET Batch
      </a>
      <a
        href={enroll}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-primary text-primary-foreground rounded-full font-bold text-sm py-2.5 text-center"
      >
        Join NCET Batch
      </a>
    </div>
  );
}
