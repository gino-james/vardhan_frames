import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-fashion.jpg";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const h = (e) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const title = "VARDHAN\nVIEWFINDER".split("");

  return (
    <section ref={ref} id="top" className="relative h-screen w-full overflow-hidden bg-background bg-grain">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={heroImg}
          alt="Fashion photography by Vardhan's Viewfinder"
          className="h-full w-full object-cover object-top opacity-70"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="bg-vignette absolute inset-0" />
      </motion.div>

      {/* Mouse glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
        style={{
          background: `radial-gradient(400px circle at ${mouse.x * 100}% ${mouse.y * 100}%, oklch(0.72 0.12 82 / 0.25), transparent 60%)`,
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mb-6 text-[10px] uppercase tracking-[0.5em] text-[var(--gold)] md:text-xs"
        >
          — Photographer · India ·
        </motion.p>

        <h1 className="font-display text-[clamp(2.5rem,10vw,10rem)] font-medium uppercase leading-[0.95] tracking-tighter">
          {title.map((ch, i) =>
            ch === "\n" ? (
              <br key={i} />
            ) : (
              <motion.span
                key={i}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2 + i * 0.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            )
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ delay: 3.2, duration: 1 }}
          className="mt-6 max-w-xl font-display text-lg italic text-muted-foreground md:text-2xl"
        >
          Capturing stories beyond vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 1 }}
          className="mt-10 flex items-center gap-6"
        >
          <a
            href="#work"
            className="group relative overflow-hidden border border-[var(--gold)] px-8 py-3 text-[11px] uppercase tracking-[0.3em] text-foreground transition-colors hover:text-background"
          >
            <span className="relative z-10">View Portfolio</span>
            <span className="absolute inset-0 -z-0 -translate-y-full bg-[var(--gold)] transition-transform duration-500 group-hover:translate-y-0" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-[var(--gold)] to-transparent">
            <motion.div
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-px bg-[var(--gold)]"
            />
          </div>
        </div>
      </motion.div>

      {/* Side labels */}
      <div className="absolute bottom-8 left-6 z-10 hidden text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:block">
        © 2026 — All Frames Reserved
      </div>
      <div className="absolute bottom-8 right-6 z-10 hidden -rotate-90 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:block">
        Est. 2025
      </div>
    </section>
  );
}
