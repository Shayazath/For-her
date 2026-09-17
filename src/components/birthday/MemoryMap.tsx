import { motion } from "motion/react";
import { timellineslide } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { useState } from "react";

export function MemoryMap() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
  } | null>(null);

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
          {timellineslide.map((m, i) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, x: i % 2 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative pl-12 sm:w-1/2 sm:pl-0 ${
                i % 2
                  ? "sm:ml-auto sm:pl-12"
                  : "sm:pr-12 sm:text-right"
              }`}
            >
              <span
                className={`bg-gold glow-gold absolute top-6 left-2.5 size-3 rounded-full sm:left-auto ${
                  i % 2 ? "sm:-left-1.5" : "sm:-right-1.5"
                }`}
              />

              <div className="glass-card overflow-hidden">
                {/* Clickable Image */}
                <img
                  src={m.src}
                  alt={m.title}
                  width={m.width}
                  height={m.height}
                  loading="lazy"
                  onClick={() =>
                    setSelectedImage({
                      src: m.src,
                      title: m.title,
                    })
                  }
                  className="h-44 w-full cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
                />

                <div className="p-5">
                  <p className="text-gold text-[11px] tracking-[0.25em] uppercase">
                    {m.date}
                  </p>

                  <h3 className="mt-1.5 text-xl font-semibold">
                    {m.title}
                  </h3>

                  <p className="text-muted-foreground mt-2 text-sm">
                    {m.caption}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Image Popup / Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20"
            aria-label="Close image"
          >
            ×
          </button>

          {/* Large Image */}
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            src={selectedImage.src}
            alt={selectedImage.title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
          />
        </motion.div>
      )}
    </Chapter>
  );
}