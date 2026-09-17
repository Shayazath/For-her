import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, X as CloseIcon } from "lucide-react";
import { secretgal, quiz } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { burstConfetti } from "./effects";
import { useProgress } from "./progress";

export function Quiz() {
  const { complete } = useProgress();

  const [selectedGift, setSelectedGift] = useState<
    (typeof secretgal)[number] | null
  >(null);

  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quiz[step];

  const choose = (i: number) => {
    if (picked !== null || !q) return;

    setPicked(i);

    const right = i === q.answer;

    if (right) {
      setCorrect((c) => c + 1);
    }

    window.setTimeout(() => {
      setPicked(null);

      if (step + 1 >= quiz.length) {
        setFinished(true);
        burstConfetti(0.7);
        complete("quiz");
      } else {
        setStep((s) => s + 1);
      }
    }, 1100);
  };

  // Always show all 3 gifts
  const gifts = secretgal.slice(0, 3);

  return (
    <Chapter
      id="chapter-quiz"
      eyebrow="Game 5"
      title="Memory Quiz"
      subtitle="How well do you remember us? Every answer brings you one step closer to your gifts."
    >
      <div className="mx-auto max-w-3xl">

        {/* =========================
            QUESTIONS
        ========================== */}
        {!finished && q ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -40,
              }}
              className="glass-card p-7"
            >
              <p className="text-gold text-[11px] tracking-[0.25em] uppercase">
                Question {step + 1} of {quiz.length}
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                {q.question}
              </h3>

              <div className="mt-6 grid gap-3">
                {q.options.map((opt, i) => {
                  const state =
                    picked === null
                      ? "idle"
                      : i === q.answer
                        ? "right"
                        : i === picked
                          ? "wrong"
                          : "idle";

                  return (
                    <button
                      key={opt}
                      onClick={() => choose(i)}
                      className={`
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        border
                        px-5
                        py-3.5
                        text-left
                        transition-all

                        ${
                          state === "right"
                            ? "border-gold bg-gold/15"
                            : state === "wrong"
                              ? "border-destructive bg-destructive/15"
                              : "bg-secondary/60 hover:bg-accent/40"
                        }
                      `}
                    >
                      <span>{opt}</span>

                      {state === "right" && (
                        <Check className="text-gold size-4" />
                      )}

                      {state === "wrong" && (
                        <X className="text-destructive size-4" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (

          /* =========================
             FINAL RESULT
          ========================== */
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
            }}
            className="glass-card glow p-7 text-center"
          >
            {/* Score */}
            <p className="text-gold text-[11px] tracking-[0.25em] uppercase">
              Your Result
            </p>

            <p className="font-display mt-2 text-4xl font-bold">
              {correct} / {quiz.length}
            </p>

            {/* Message */}
            <motion.p
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="font-script text-primary mt-4 text-3xl"
            >
              Win or lose, no worries ❤️
            </motion.p>

            <motion.p
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
              }}
              className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-relaxed"
            >
              No worries if you got everything right or everything wrong.
              You still deserve every gift. I will give you all that I have.
            </motion.p>

            {/* =========================
                THREE CLICKABLE GIFTS
            ========================== */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {gifts.map((m, index) => (
                <motion.button
                  key={m.id}
                  type="button"
                  initial={{
                    opacity: 0,
                    y: 30,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.7 + index * 0.2,
                    duration: 0.5,
                  }}
                  onClick={() => setSelectedGift(m)}
                  className="
                    group
                    overflow-hidden
                    rounded-xl
                    border
                    border-white/10
                    bg-black/20
                    text-left
                    transition-all
                    hover:-translate-y-1
                    hover:border-primary/50
                    hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary
                  "
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={m.src}
                      alt={m.title}
                      width={m.width}
                      height={m.height}
                      loading="lazy"
                      className="
                        h-40
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-110
                      "
                    />

                    {/* Gift number */}
                    <div
                      className="
                        absolute
                        top-2
                        left-2
                        flex
                        size-7
                        items-center
                        justify-center
                        rounded-full
                        bg-black/60
                        text-xs
                        font-semibold
                        text-white
                        backdrop-blur-sm
                      "
                    >
                      {index + 1}
                    </div>

                    {/* Click overlay */}
                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        bg-black/30
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    >
                      <span
                        className="
                          rounded-full
                          bg-white/20
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
                  </div>

                  {/* Title */}
                  <div className="p-3">
                    <p className="text-sm font-semibold">
                      {m.title}
                    </p>

                    {m.caption && (
                      <p className="text-muted-foreground mt-1 line-clamp-1 text-xs">
                        {m.caption}
                      </p>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Final line */}
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1.5,
              }}
              className="font-script text-gold mt-8 text-2xl"
            >
              Because you are the gift. ❤️
            </motion.p>
          </motion.div>
        )}

        {/* ==================================================
            FULLSCREEN PHOTO POPUP / LIGHTBOX
        ================================================== */}
        <AnimatePresence>
          {selectedGift && (
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
              onClick={() => setSelectedGift(null)}
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
              {/* Photo container */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  y: 30,
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
                  aria-label="Close photo"
                  onClick={() => setSelectedGift(null)}
                  className="
                    absolute
                    -right-3
                    -top-3
                    z-30
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
                  <CloseIcon className="size-5" />
                </button>

                {/* Large image */}
                <div
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/20
                    bg-black
                    shadow-[0_0_60px_rgba(168,85,247,0.25)]
                  "
                >
                  <img
                    src={selectedGift.src}
                    alt={selectedGift.title}
                    width={selectedGift.width}
                    height={selectedGift.height}
                    className="
                      max-h-[78vh]
                      max-w-[90vw]
                      object-contain
                    "
                  />
                </div>

                {/* Title / caption */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.15,
                  }}
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
                    {selectedGift.title}
                  </p>

                  {selectedGift.caption && (
                    <p className="text-muted-foreground mt-1 text-sm">
                      {selectedGift.caption}
                    </p>
                  )}
                </motion.div>

                <p className="mt-3 text-xs text-white/50">
                  Click outside or ✕ to close
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  );
}