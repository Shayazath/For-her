import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { memories, type Memory } from "@/data/birthday";
import { Chapter } from "./Chapter";

export function MemoryGallery() {
  const [open, setOpen] = useState<Memory | null>(null);

  return (
    <Chapter
      id="chapter-memories"
      eyebrow="Chapter 2"
      title="Memory Gallery"
      subtitle="Polaroids from the best days. Tap any photo to live in it a little longer."
    >
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {memories.map((m, i) => (
          <motion.button
            key={m.id}
            onClick={() => setOpen(m)}
            initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
            className="glass-card group block w-full break-inside-avoid p-3 text-left cursor-grab"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={m.src}
                alt={m.title}
                width={m.width}
                height={m.height}
                loading="lazy"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="px-1 pt-3 pb-1">
              <p className="font-script text-primary text-2xl">{m.title}</p>
              <p className="text-muted-foreground mt-1 text-sm">{m.caption}</p>
              <p className="text-gold mt-2 text-[11px] tracking-[0.25em] uppercase">{m.date}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="bg-background/85 fixed inset-0 z-[60] flex items-center justify-center p-5 backdrop-blur-xl"
          >
            <motion.figure
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card glow max-h-[88vh] w-full max-w-3xl overflow-auto p-4"
            >
              <img
                src={open.src}
                alt={open.title}
                width={open.width}
                height={open.height}
                className="h-auto w-full rounded-xl"
              />
              <figcaption className="flex items-end justify-between gap-4 px-1 pt-4">
                <div>
                  <p className="font-display text-2xl font-semibold">{open.title}</p>
                  <p className="text-muted-foreground mt-1 text-sm">{open.caption}</p>
                </div>
                <button
                  aria-label="Close photo"
                  onClick={() => setOpen(null)}
                  className="bg-secondary text-secondary-foreground hover:bg-accent flex size-10 shrink-0 items-center justify-center rounded-full transition-colors"
                >
                  <X className="size-4" />
                </button>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </Chapter>
  );
}
