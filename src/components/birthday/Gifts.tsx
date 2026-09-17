import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, X } from "lucide-react";
import { gifts } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { burstConfetti } from "./effects";
import { useProgress } from "./progress";

type GiftItem = (typeof gifts)[number];

const isVideo = (src: string) => {
  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(src);
};

export function Gifts() {
  const { complete } = useProgress();

  const [opened, setOpened] = useState<Record<number, boolean>>({});

  // Image currently opened in fullscreen
  const [selectedImage, setSelectedImage] =
    useState<GiftItem | null>(null);

  const unwrap = (i: number) => {
    if (opened[i]) return;

    const next = {
      ...opened,
      [i]: true,
    };

    setOpened(next);

    burstConfetti(0.7);

    if (Object.keys(next).length === gifts.length) {
      complete("gifts");
    }
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
          const mediaIsVideo = isVideo(g.src);

          return (
            <motion.div
              key={g.title}
              whileHover={{
                y: -8,
                rotate: isOpen ? 0 : -1.5,
              }}
              className="
                glass-card
                relative
                min-h-72
                overflow-hidden
                p-5
              "
            >
              <AnimatePresence mode="wait">

                {/* ==========================================
                    CLOSED GIFT
                ========================================== */}
                {!isOpen ? (
                  <motion.button
                    key="wrapped"
                    type="button"
                    onClick={() => unwrap(i)}
                    exit={{
                      scale: 1.2,
                      opacity: 0,
                      y: -30,
                    }}
                    className="
                      flex
                      h-full
                      min-h-64
                      w-full
                      flex-col
                      items-center
                      justify-center
                      gap-4
                    "
                  >
                    <motion.span
                      animate={{
                        y: [0, -8, 0],
                        rotate: [0, 3, -3, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      className="
                        bg-festive
                        text-primary-foreground
                        glow
                        flex
                        size-20
                        items-center
                        justify-center
                        rounded-2xl
                        cursor-grab
                      "
                    >
                      <Gift className="size-9" />
                    </motion.span>

                    <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase">
                      Tap to unwrap
                    </p>
                  </motion.button>
                ) : (

                  /* ==========================================
                     OPENED GIFT
                  ========================================== */
                  <motion.div
                    key="open"
                    initial={{
                      opacity: 0,
                      scale: 0.85,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  >

                    {/* ======================================
                        VIDEO GIFT
                    ====================================== */}
                    {mediaIsVideo ? (
                      <div className="relative overflow-hidden rounded-xl bg-black">
                        <video
                          src={g.src}
                          controls
                          playsInline
                          preload="metadata"
                          className="
                            h-32
                            w-full
                            object-contain
                          "
                        />
                      </div>
                    ) : (

                      /* ======================================
                         IMAGE GIFT
                      ====================================== */
                      <button
                        type="button"
                        onClick={() => setSelectedImage(g)}
                        className="
                          group
                          relative
                          block
                          w-full
                          cursor-pointer
                          overflow-hidden
                          rounded-xl
                          text-left
                        "
                      >
                        <img
                          src={g.src}
                          alt={g.title}
                          loading="lazy"
                          className="
                            h-32
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-110
                          "
                        />

                        {/* Hover overlay */}
                        <div
                          className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            bg-black/35
                            opacity-0
                            transition-opacity
                            duration-300
                            group-hover:opacity-100
                          "
                        >
                          <span
                            className="
                              rounded-full
                              bg-black/50
                              px-4
                              py-2
                              text-xs
                              font-semibold
                              text-white
                              backdrop-blur-md
                            "
                          >
                            Click to view
                          </span>
                        </div>
                      </button>
                    )}

                    {/* ======================================
                        GIFT TITLE
                    ====================================== */}
                    <h3 className="text-primary mt-3 text-lg font-semibold">
                      {g.title}
                    </h3>

                    {/* ======================================
                        GIFT MESSAGE
                    ====================================== */}
                    <p className="mt-1 text-sm">
                      {g.message}
                    </p>

                    {/* ======================================
                        GIFT QUOTE
                    ====================================== */}
                    <p className="text-gold mt-3 text-xs italic">
                      {g.quote}
                    </p>

                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* =====================================================
          IMAGE POPUP / LIGHTBOX
      ====================================================== */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelectedImage(null)}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/85
              p-4
              backdrop-blur-xl
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: 20,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 22,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative
                flex
                max-h-[92vh]
                max-w-5xl
                flex-col
                items-center
              "
            >

              {/* Close button */}
              <button
                type="button"
                aria-label="Close image"
                onClick={() => setSelectedImage(null)}
                className="
                  absolute
                  -right-3
                  -top-3
                  z-20
                  flex
                  size-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/70
                  text-white
                  shadow-xl
                  backdrop-blur-md
                  transition-all
                  hover:scale-110
                  hover:bg-black
                "
              >
                <X className="size-5" />
              </button>

              {/* Large image */}
              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/20
                  bg-black
                  shadow-[0_0_60px_rgba(168,85,247,0.3)]
                "
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="
                    max-h-[78vh]
                    max-w-[90vw]
                    object-contain
                  "
                />
              </div>

              {/* Image title */}
              <div
                className="
                  glass-card
                  mt-4
                  max-w-md
                  px-6
                  py-3
                  text-center
                "
              >
                <p className="font-display text-lg font-semibold">
                  {selectedImage.title}
                </p>

                {selectedImage.message && (
                  <p className="text-muted-foreground mt-1 text-sm">
                    {selectedImage.message}
                  </p>
                )}
              </div>

              <p className="mt-3 text-xs text-white/50">
                Click outside or ✕ to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Chapter>
  );
}