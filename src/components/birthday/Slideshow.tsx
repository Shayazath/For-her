import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { memoriesslide } from "@/data/birthday";
import { Chapter } from "./Chapter";

export function Slideshow() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const current = memoriesslide[index] ?? memoriesslide[0]!;

  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % memoriesslide.length), 4200);
    return () => window.clearInterval(id);
  }, [auto]);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + memoriesslide.length) % memoriesslide.length);

  return (
    <Chapter
      id="chapter-slideshow"
      eyebrow="Chapter 2 ½"
      title="Slideshow of Us"
      subtitle="Sit back — it plays on its own."
    >
      <div className="glass-card glow relative overflow-hidden p-3">
        <div className="relative aspect-16/9 overflow-hidden rounded-xl">
          <img
            src={current.src}
            alt=""
            aria-hidden
            className="absolute inset-0 size-full scale-110 object-cover blur-2xl opacity-40"
          />
          <AnimatePresence mode="popLayout">
            <motion.img
              key={current.id}
              src={current.src}
              alt={current.title}
              width={current.width}
              height={current.height}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1.16 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1 }, scale: { duration: 8, ease: "linear" } }}
              className="absolute inset-0 size-full object-contain"
            />
          </AnimatePresence>

          <div className="from-background via-background/20 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-6 pt-24">
            <motion.p
              key={`cap-${current.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-2xl font-semibold sm:text-3xl"
            >
              {current.title}
            </motion.p>
            <p className="text-muted-foreground mt-1 text-sm">{current.caption}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 px-1 pb-1">
          <button
            aria-label="Previous photo"
            onClick={() => go(-1)}
            className="bg-secondary cursor-pointer hover:bg-accent flex size-10 items-center justify-center rounded-full transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            aria-label={auto ? "Pause slideshow" : "Play slideshow"}
            onClick={() => setAuto((a) => !a)}
            className="bg-festive text-primary-foreground flex size-10 items-center justify-center rounded-full"
          >
            {auto ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <button
            aria-label="Next photo"
            onClick={() => go(1)}
            className="bg-secondary cursor-pointer hover:bg-accent flex size-10 items-center justify-center rounded-full transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>

          <div className="ml-3 flex flex-1 gap-1.5">
            {memoriesslide.map((m, i) => (
              <button
                key={m.id}
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  i === index ? "bg-festive" : "bg-secondary"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Chapter>
  );
}
