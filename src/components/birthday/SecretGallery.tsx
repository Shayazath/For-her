import { useState } from "react";
import { motion } from "motion/react";
import { Lock, ChevronLeft, ChevronRight } from "lucide-react";
import { memories } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { useProgress } from "./progress";

export function SecretGallery() {
  const { secretUnlocked, gamesDone } = useProgress();
  const [index, setIndex] = useState(0);
  const photo = memories[index] ?? memories[0]!;

  return (
    <Chapter
      id="chapter-secret"
      eyebrow="Chapter 5 ½"
      title="Secret Gallery"
      subtitle={
        secretUnlocked
          ? "Unlocked. These are the ones I kept aside."
          : "Locked. Clear three games and the treasure hunt to open it."
      }
    >
      {!secretUnlocked ? (
        <div className="glass-card mx-auto max-w-md p-12 text-center">
          <motion.div
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Lock className="text-muted-foreground mx-auto size-10" />
          </motion.div>
          <p className="mt-5 text-sm">
            Games cleared: <span className="text-gold font-semibold">{gamesDone}</span> / 3
          </p>
        </div>
      ) : (
        <div className="relative">
          <motion.div
            aria-hidden
            className="bg-accent/30 absolute inset-x-10 -top-10 h-40 rounded-full blur-[100px]"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <div className="glass-card glow relative p-4">
            <motion.img
              key={photo.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              src={photo.src}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              className="h-[26rem] w-full rounded-xl object-cover"
            />
            <div className="flex items-center justify-between gap-4 px-2 pt-4">
              <button
                aria-label="Previous"
                onClick={() => setIndex((i) => (i - 1 + memories.length) % memories.length)}
                className="bg-secondary hover:bg-accent flex size-10 items-center justify-center rounded-full transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>
              <div className="text-center">
                <p className="font-display text-xl font-semibold">{photo.title}</p>
                <p className="text-muted-foreground text-sm">{photo.caption}</p>
              </div>
              <button
                aria-label="Next"
                onClick={() => setIndex((i) => (i + 1) % memories.length)}
                className="bg-secondary cursor-pointer hover:bg-accent flex size-10 items-center justify-center rounded-full transition-colors"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-6 gap-2">
            {memories.map((m, i) => (
              <motion.button
                key={m.id}
                whileHover={{ y: -5 }}
                onClick={() => setIndex(i)}
                className={`overflow-hidden rounded-lg ${i === index ? "ring-primary ring-2" : ""}`}
              >
                <img
                  src={m.src}
                  alt={m.title}
                  width={m.width}
                  height={m.height}
                  loading="lazy"
                  className="h-16 w-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </Chapter>
  );
}
