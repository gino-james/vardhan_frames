import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import f1 from "@/assets/fashion/model8.webp";
import f2 from "@/assets/fashion/model5.webp";
import s1 from "@/assets/street/Screenshot 2026-04-29 111454.webp";
import p1 from "@/assets/products/Screenshot 2026-04-29 111138.webp";
import hero from "@/assets/hero-fashion.webp";
import featureNew from "@/assets/feature-new.webp";

const items = [
  { src: f1, title: "Soft Presences", subtitle: "Editorial / 2025", tag: "Fashion" },
  { src: s1, title: "Earth In Hands", subtitle: "Hyderabad / 2025", tag: "Street" },
  { src: p1, title: "Cold Charge", subtitle: "Hyderabad / 2025", tag: "Product" },
  { src: hero, title: "Veil Of Silence", subtitle: "Studio / 2025", tag: "Fashion" },
  { src: featureNew, title: "Golden Bloom", subtitle: "Hyderabad / 2025", tag: "Fashion & Beauty" },
  { src: f2, title: "Quiet Presence", subtitle: "Hyderabad / 2025", tag: "Fashion" },
];

export function FeaturedWork() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  // Horizontal scroll — translate based on vertical scroll through section
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-65%"]);

  return (
    <section id="work" ref={ref} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Section label */}
        <div className="absolute left-6 top-24 z-20 md:left-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">01 — Selected</p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">Featured Work</h2>
        </div>

        <div className="absolute right-6 top-24 z-20 hidden text-right md:block">
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Scroll →
          </p>
          <p className="mt-2 max-w-[260px] text-sm text-muted-foreground">
            A curated selection across fashion, commerce, and the street.
          </p>
        </div>

        <motion.div style={{ x }} className="flex gap-6 pl-[10vw] pr-[10vw] will-change-transform">
          {items.map((it, i) => (
            <WorkCard key={i} {...it} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WorkCard({
  src,
  title,
  subtitle,
  tag,
  index,
}) {
  // Different heights for visual rhythm
  const heights = ["h-[75vh]", "h-[65vh]", "h-[80vh]", "h-[70vh]", "h-[75vh]", "h-[68vh]"];
  const h = heights[index % heights.length];

  return (
    <div
      data-cursor-hover
      className={`group relative w-[70vw] shrink-0 overflow-hidden md:w-[42vw] lg:w-[32vw] ${h}`}
    >
      <motion.img
        src={src}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover grayscale-[20%] transition-all duration-[1.2s] ease-out group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-0"
          style={{
            boxShadow: "inset 0 0 120px oklch(0.72 0.12 82 / 0.35)",
          }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--gold)]">{tag}</p>
          <h3 className="mt-2 font-display text-2xl md:text-3xl">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className="text-[10px] tabular-nums text-muted-foreground">
          0{index + 1} / 0{6}
        </div>
      </div>
    </div>
  );
}
