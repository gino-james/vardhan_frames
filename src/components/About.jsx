import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import portrait from "@/assets/aboutme.jpeg";

const words =
  "I don't just capture images. I capture presence, emotion, and identity.".split(" ");

export function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-background py-32 md:py-48">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-12 md:px-10">
        {/* Image */}
        <div className="relative md:col-span-5 md:col-start-1">
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.img
              src={portrait}
              alt="Vardhan — photographer portrait"
              loading="lazy"
              style={{ y: imgY }}
              className="absolute inset-0 h-[120%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -right-4 hidden border border-[var(--gold)] px-6 py-4 md:block">
            <p className="font-display text-2xl text-gradient-gold">V.</p>
          </div>
        </div>

        {/* Text */}
        <div className="md:col-span-6 md:col-start-7 md:pt-20">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">03 — The Artist</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] md:text-6xl">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.15 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="mr-2 inline-block"
              >
                {w === "presence,"
                  ? <em className="text-gradient-gold not-italic">{w}</em>
                  : w === "emotion,"
                  ? <em className="text-gradient-gold not-italic">{w}</em>
                  : w === "identity."
                  ? <em className="text-gradient-gold not-italic">{w}</em>
                  : w}
              </motion.span>
            ))}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 max-w-lg space-y-5 text-sm leading-relaxed text-muted-foreground"
          >
            <blockquote className="border-l border-[var(--gold)] pl-4 font-display italic text-foreground/80 md:text-lg">
              “A camera can see deep into anything.”
            </blockquote>
            <p>
              Based in Hyderabad, I am a photographer exploring the intersection of fashion, products, and street storytelling.
            </p>
            <p>
              In my first year behind the lens, I’ve focused on building a distinct visual style — creating images that feel intentional, raw, and emotionally grounded.
            </p>
            <p>
              Every frame I capture is driven by curiosity, detail, and the desire to turn ordinary moments into something visually powerful.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-8 border-t border-border pt-8"
          >
            <Stat n="10+" l="Projects" />
            <Stat n="1" l="Year" />
            <Stat n="HYD" l="Location" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div className="font-display text-3xl text-gradient-gold md:text-4xl">{n}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{l}</div>
    </div>
  );
}
