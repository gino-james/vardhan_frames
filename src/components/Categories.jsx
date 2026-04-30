import { motion, AnimatePresence } from "framer-motion";
import catFashion from "@/assets/fashion-gallery/model5.png";
import catProduct from "@/assets/products/Screenshot 2026-04-29 111230.png";
import catStreet from "@/assets/street/Screenshot 2026-04-29 111512.png";
import { useRef, useState } from "react";
import { GalleryModal } from "./GalleryModal";

// New Fashion Gallery Images
import f1 from "@/assets/fashion-gallery/model1.png";
import f2 from "@/assets/fashion-gallery/model2.png";
import f3 from "@/assets/fashion-gallery/model3.png";
import f4 from "@/assets/fashion-gallery/model4.png";

import p1 from "@/assets/products/Screenshot 2026-04-29 111138.png";
import p2 from "@/assets/products/Screenshot 2026-04-29 111204.png";
import p3 from "@/assets/products/Screenshot 2026-04-29 111230.png";
import p4 from "@/assets/products/Screenshot 2026-04-29 111248.png";
import p5 from "@/assets/products/Screenshot 2026-04-29 111306.png";
import p6 from "@/assets/products/Screenshot 2026-04-29 111323.png";

import s1 from "@/assets/street/Screenshot 2026-04-29 111454.png";
import s2 from "@/assets/street/Screenshot 2026-04-29 111512.png";
import s3 from "@/assets/street/Screenshot 2026-04-29 111545.png";
import s4 from "@/assets/street/Screenshot 2026-04-29 111603.png";
import s5 from "@/assets/street/Screenshot 2026-04-29 111621.png";

const cats = [
  {
    title: "Fashion",
    img: catFashion,
    copy: "Editorial narratives, couture, luxury campaigns.",
    count: "",
    galleryImages: [f1, f2, f3, f4],
  },
  {
    title: "Product",
    img: catProduct,
    copy: "Beverages, cosmetics, commercial storytelling.",
    count: "",
    galleryImages: [p1, p2, p3, p4, p5, p6],
  },
  {
    title: "Street",
    img: catStreet,
    copy: "Raw emotion, unscripted moments, real life.",
    count: "",
    galleryImages: [s1, s2, s3, s4, s5],
  },
];

export function Categories() {
  const [activeGallery, setActiveGallery] = useState(null);

  return (
    <section id="categories" className="relative bg-background py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">02 — Disciplines</p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
              Three languages.<br />
              <span className="text-gradient-gold italic">One vision.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Every discipline informs the next. The precision of product, the poetry of fashion, the truth of the street.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cats.map((c, i) => (
            <CategoryCard 
              key={c.title} 
              {...c} 
              index={i} 
              onClick={() => c.galleryImages && c.galleryImages.length > 0 ? setActiveGallery(c.galleryImages) : null}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeGallery && (
          <GalleryModal images={activeGallery} onClose={() => setActiveGallery(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function CategoryCard({
  title,
  img,
  copy,
  count,
  index,
  onClick,
  galleryImages,
}) {
  const ref = useRef(null);

  const handleMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
    ref.current.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      data-cursor-hover={galleryImages ? "true" : undefined}
      className={`group relative aspect-[3/4] overflow-hidden transition-transform duration-300 ${galleryImages ? 'cursor-pointer' : ''}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <img
        src={img}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover transition-all duration-[1.4s] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[var(--gold)]/10 mix-blend-overlay" />
      </div>

      {/* Top number */}
      <div className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">
        0{index + 1}
      </div>
      <div className="absolute right-6 top-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {count}
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-8">
        <h3 className="font-display text-5xl md:text-6xl">
          {title}
        </h3>
        <div className="mt-3 h-px w-12 origin-left scale-x-0 bg-[var(--gold)] transition-transform duration-700 group-hover:scale-x-100" />
        <p className="mt-4 max-w-[260px] text-sm text-muted-foreground opacity-0 transition-opacity delay-100 duration-700 group-hover:opacity-100">
          {copy}
        </p>
        <div className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[var(--gold)] opacity-0 transition-opacity delay-200 duration-700 group-hover:opacity-100">
          Explore <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
        </div>
      </div>
    </motion.div>
  );
}
