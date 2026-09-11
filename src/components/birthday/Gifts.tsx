import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift } from "lucide-react";
import { gifts, memories } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { burstConfetti } from "./effects";
import { useProgress } from "./progress";

export function Gifts() {
  const { complete } = useProgress();
  const [opened, setOpened] = useState<Record<number, boolean>>({});

  const unwrap = (i: number) => {
    if (opened[i]) return;
    const next = { ...opened, [i]: true };
    setOpened(next);
    burstConfetti(0.7);
    if (Object.keys(next).length === gifts.length) complete("gifts");
  };

  return (
    <Chapter
      id="chapter-gifts"
      eyebrow="Chapter 3"
      title="Gift Boxes"
      subtitle="Four boxes. Unwrap all of them — no peeking ahead."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {gifts.map((g, i) => {
          const isOpen = Boolean(opened[i]);
          const photo = memories[i % memories.length]!;
          return (
            <motion.button
              key={g.title}
              onClick={() => unwrap(i)}
              whileHover={{ y: -8, rotate: isOpen ? 0 : -1.5 }}
              className="glass-card relative min-h-72 overflow-hidden p-5 text-left"
            >
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.div
                    key="wrapped"
                    exit={{ scale: 1.2, opacity: 0, y: -30 }}
                    className="flex h-full min-h-64 flex-col items-center justify-center gap-4"
                  >
                    <motion.span
                      animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                      className="bg-festive text-primary-foreground glow flex size-20 items-center justify-center rounded-2xl"
                    >
                      <Gift className="size-9" />
                    </motion.span>
                    <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase">
                      Tap to unwrap
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={photo.src}
                      alt={g.title}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      className="h-32 w-full rounded-xl object-cover"
                    />
                    <h3 className="text-primary mt-3 text-lg font-semibold">{g.title}</h3>
                    <p className="mt-1 text-sm">{g.message}</p>
                    <p className="text-gold mt-3 text-xs italic">{g.quote}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </Chapter>
  );
}
