import { useState } from "react";
import { motion } from "motion/react";
import { loveNotes } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { FloatingHearts } from "./effects";

export function LoveNotes() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  return (
    <Chapter
      id="chapter-notes"
      eyebrow="Little words"
      title="Love Notes"
      subtitle="Tap a card — each one hides a second message."
    >
      <div className="relative">
        <FloatingHearts count={12} />
        <div className="relative z-10 grid gap-5 sm:grid-cols-2">
          {loveNotes.map((note, i) => {
            const isFlipped = Boolean(flipped[i]);
            return (
              <motion.button
                key={note.front}
                onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
                whileHover={{ y: -6 }}
                className="[perspective:1200px]"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-44 w-full [transform-style:preserve-3d] cursor-grab"
                >
                  <div className="glass-card absolute inset-0 flex items-center justify-center p-7 text-center [backface-visibility:hidden]">
                    <p className="font-display text-xl leading-snug">{note.front}</p>
                  </div>
                  <div className="glass-card glow absolute inset-0 flex items-center justify-center p-7 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <p className="font-script text-primary text-2xl leading-snug">{note.back}</p>
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </Chapter>
  );
}
