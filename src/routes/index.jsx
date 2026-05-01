import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Categories } from "@/components/Categories";

const About = lazy(() => import("@/components/About").then(m => ({ default: m.About })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Vardhan's Viewfinder — Cinematic Photography" },
      {
        name: "description",
        content:
          "Vardhan's Viewfinder — fashion, product & street photography. Capturing stories beyond vision. Luxury editorial and commercial work.",
      },
      { property: "og:title", content: "Vardhan's Viewfinder — Cinematic Photography" },
      {
        property: "og:description",
        content: "Fashion, product & street photography. Capturing stories beyond vision.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background text-foreground">
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <FeaturedWork />
      <Categories />
      
      <Suspense fallback={null}>
        <About />
        <Contact />
      </Suspense>
    </main>
  );
}
