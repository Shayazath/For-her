import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Play, Sparkles } from "lucide-react";
import { celebrant, memories } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { FloatingHearts, bigCelebration, fireworksBurst } from "./effects";
import { ALL_TASKS, useProgress } from "./progress";

export function Fireworks() {
  return (
    <section id="chapter-fireworks" className="relative overflow-hidden px-5 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        onViewportEnter={() => fireworksBurst(4000)}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <p className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
          The sky is yours
        </p>
        <h2 className="text-festive mt-4 text-4xl font-bold sm:text-6xl">Fireworks for You</h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-lg">
          Because ordinary candles were never going to be enough.
        </p>
      </motion.div>
      <FloatingHearts count={18} />
    </section>
  );
}

export function FinalSurprise() {
  const { finaleUnlocked, done } = useProgress();
  const [curtains, setCurtains] = useState(false);
  const [ended, setEnded] = useState(false);
  const remaining = ALL_TASKS.filter((t) => !done[t]).length;
  const hero = memories[5] ?? memories[0]!;

  const openCurtains = () => {
    setCurtains(true);
    bigCelebration(4000);
  };

  return (
    <Chapter
      id="chapter-final"
      eyebrow="Chapter 6"
      title="One Last Surprise Awaits…"
      subtitle={
        finaleUnlocked
          ? "You finished everything. Dim the lights."
          : `Finish every activity above to unlock the finale — ${remaining} left.`
      }
    >
      {!finaleUnlocked ? (
        <div className="glass-card mx-auto max-w-md p-12 text-center">
          <Lock className="text-muted-foreground mx-auto size-10" />
          <p className="text-muted-foreground mt-5 text-sm">
            Cake, gifts, all five games and the treasure hunt.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">
          <div className="glass-card glow relative overflow-hidden">
            <div className="relative aspect-16/9">
              {celebrant.videoUrl ? (
                <video
                  src={celebrant.videoUrl}
                  controls
                  autoPlay={curtains}
                  playsInline
                  onEnded={() => setEnded(true)}
                  className="size-full object-cover"
                />
              ) : (
                <img
                  src={hero.src}
                  alt="Birthday finale"
                  width={hero.width}
                  height={hero.height}
                  loading="lazy"
                  className="size-full object-cover"
                />
              )}

              <AnimatePresence>
                {!curtains && (
                  <>
                    <motion.div
                      exit={{ x: "-100%" }}
                      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-primary/90 absolute inset-y-0 left-0 z-20 w-1/2"
                    />
                    <motion.div
                      exit={{ x: "100%" }}
                      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-primary/90 absolute inset-y-0 right-0 z-20 w-1/2"
                    />
                    <motion.button
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={openCurtains}
                      className="bg-background/80 text-foreground absolute inset-0 z-30 m-auto flex h-14 w-52 items-center justify-center gap-2 rounded-full font-semibold backdrop-blur"
                    >
                      <Play className="size-4" /> Open the curtains
                    </motion.button>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {curtains && !celebrant.videoUrl && (
            <p className="text-muted-foreground mt-4 text-center text-xs">
              Drop your birthday video URL into <code>celebrant.videoUrl</code> and it plays right
              here inside the cinematic frame.
            </p>
          )}

          <AnimatePresence>
            {(ended || curtains) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 1 }}
                onAnimationComplete={() => fireworksBurst(4000)}
                className="relative mt-10 overflow-hidden py-10 text-center"
              >
                <FloatingHearts count={20} />
                <Sparkles className="text-gold mx-auto size-8" />
                <p className="font-script text-festive relative z-10 mt-4 text-4xl leading-tight sm:text-6xl">
                  {celebrant.closing} ❤️
                </p>
                <p className="text-muted-foreground relative z-10 mt-4 text-sm">
                  — made entirely for you, {celebrant.name}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </Chapter>
  );
}
