import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-background py-32 md:py-48">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 text-center md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
        >
          04 — Collaborate
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-5xl leading-[0.95] md:text-8xl lg:text-9xl"
        >
          Let's create<br />
          something <em className="text-gradient-gold italic">timeless.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-lg text-sm text-muted-foreground"
        >
          Available for editorial, commercial, and personal commissions across Telangana and Andhra Pradesh. Open for upcoming collaborations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-14 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6"
        >
          <ContactButton
            href="https://wa.me/917995526720"
            label="WhatsApp"
            sub="+91 79955 26720"
            primary
          />
          <ContactButton
            href="mailto:mvishnuvardhan004@gmail.com"
            label="Email"
            sub="mvishnuvardhan004@gmail.com"
          />
          <ContactButton
            href="https://www.instagram.com/vardhans_viewfinder?igsh=aG9wNW5mNTVtbmd3"
            label="Instagram"
            sub="@vardhans_viewfinder"
          />
        </motion.div>

        <div className="mt-24 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          <div className="h-px w-16 bg-[var(--gold)]" />
          <p>Hyderabad · South India</p>
        </div>
      </div>

      <footer className="mt-24 border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-10">
          <p className="font-display text-sm tracking-[0.2em]">
            VARDHAN'S<span className="text-[var(--gold)]">.</span>VIEWFINDER
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            © 2026 — Crafted with light & shadow
          </p>
        </div>
        <div className="mx-auto max-w-[1600px] px-6 pb-8 text-right md:px-10">
          <a
            href="https://wa.me/919000137450?text=Hi%20Gino%2C%20I%20saw%20your%20work%20and%20I%27m%20interested%20in%20a%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 transition-all duration-300 hover:text-[var(--gold)] hover:opacity-100"
          >
            Crafted by Gino James
          </a>
        </div>
      </footer>
    </section>
  );
}

function ContactButton({
  href,
  label,
  sub,
  primary,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      className={`group relative flex w-full min-w-[220px] items-center justify-between overflow-hidden border px-6 py-5 text-left transition-colors md:w-auto ${
        primary
          ? "border-[var(--gold)] bg-[var(--gold)]/5"
          : "border-border hover:border-[var(--gold)]"
      }`}
    >
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">{label}</div>
        <div className="mt-1 text-sm text-foreground">{sub}</div>
      </div>
      <span className="ml-6 inline-block text-[var(--gold)] transition-transform duration-500 group-hover:translate-x-2">
        →
      </span>
    </a>
  );
}
