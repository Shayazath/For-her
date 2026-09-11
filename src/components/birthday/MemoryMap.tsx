import { motion } from "motion/react";
import { memories } from "@/data/birthday";
import { Chapter } from "./Chapter";

export function MemoryMap() {
  return (
    <Chapter
      id="chapter-map"
      eyebrow="Memory map"
      title="Our Timeline"
      subtitle="Everything, in the order it happened."
    >
      <div className="relative">
        <div className="bg-festive absolute top-0 bottom-0 left-4 w-px opacity-60 sm:left-1/2" />
        <div className="space-y-10">
          {memories.map((m, i) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, x: i % 2 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className={`relative pl-12 sm:w-1/2 sm:pl-0 ${
                i % 2 ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:text-right"
              }`}
            >
              <span
                className={`bg-gold glow-gold absolute top-6 left-2.5 size-3 rounded-full sm:left-auto ${
                  i % 2 ? "sm:-left-1.5" : "sm:-right-1.5"
                }`}
              />
              <div className="glass-card overflow-hidden">
                <img
                  src={m.src}
                  alt={m.title}
                  width={m.width}
                  height={m.height}
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-gold text-[11px] tracking-[0.25em] uppercase">{m.date}</p>
                  <h3 className="mt-1.5 text-xl font-semibold">{m.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{m.caption}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Chapter>
  );
}
