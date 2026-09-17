import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gifto } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { burstConfetti } from "./effects";
import { useProgress } from "./progress";

const TOTAL = 12;
const PRIZE_INDEXES = [1, 4, 6, 9];
const PRIZE_MESSAGES = [
  "The first gift I gave you but you just asked for a single flower.",
  "The unreachable hands reached out to me. 🦋❤️",
  "The moment I started feeling possessive about the little things that mattered to us. ❤️.",
  "How cute we are ❤️",
];

export function BalloonGame() {
  const { complete, isDone } = useProgress();
  const [popped, setPopped] = useState<number[]>([]);
  const [reveal, setReveal] = useState<{ index: number; prizeIdx: number } | null>(null);
  const [score, setScore] = useState(0);

  const balloons = useMemo(
    () =>
      Array.from({ length: TOTAL }, (_, i) => ({
        id: i,
        left: 4 + (i % 6) * 16 + (i % 2 ? 3 : -3),
        delay: (i % 6) * 1.2 + Math.floor(i / 6) * 3,
        duration: 13 + (i % 5) * 2,
        tone: i % 3,
        prizeIdx: PRIZE_INDEXES.indexOf(i),
      })),
    [],
  );

  const pop = (id: number, prizeIdx: number) => {
    if (popped.includes(id)) return;
    setPopped((p) => [...p, id]);
    if (prizeIdx >= 0) {
      setScore((s) => s + 1);
      setReveal({ index: id, prizeIdx });
      burstConfetti(0.7);
      if (score + 1 >= PRIZE_INDEXES.length) complete("balloons");
    }
  };

  return (
    <Chapter
      id="chapter-balloons"
      eyebrow="Game 1"
      title="Balloon Pop"
      subtitle="Four of these balloons are hiding memories. Pop until you find them all."
    >
      <div className="glass-card relative h-[28rem] overflow-hidden">
        <div className="glass-card absolute top-4 left-4 z-20 px-4 py-2 text-sm">
          Found <span className="text-gold font-semibold">{score}</span> / {PRIZE_INDEXES.length}
        </div>
        {isDone("balloons") && (
          <div className="glass-card text-gold absolute top-4 right-4 z-20 px-4 py-2 text-xs tracking-[0.2em] uppercase">
            Cleared
          </div>
        )}

        {balloons.map((b) =>
          popped.includes(b.id) ? null : (
            <button
              key={b.id}
              aria-label="Pop balloon"
              onClick={() => pop(b.id, b.prizeIdx)}
              className="animate-rise absolute bottom-0 z-10 cursor-grab"
              style={{
                left: `${b.left}%`,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`,
              }}
            >
              <span
                className={`block size-14 rounded-[50%] transition-transform hover:scale-110 ${
                  b.tone === 0 ? "bg-primary" : b.tone === 1 ? "bg-accent" : "bg-gold"
                }`}
              />
              <span className="mx-auto block h-8 w-px bg-border" />
            </button>
          ),
        )}

        <AnimatePresence>
          {reveal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReveal(null)}
              className="bg-background/80 absolute inset-0 z-30 flex items-center justify-center p-6 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.7, rotate: -4, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="glass-card glow w-full max-w-xs p-4 text-center"
              >
                {(() => {
                  const photo = gifto[reveal.prizeIdx % gifto.length]!;
                  return (
                    <img
                      src={photo.src}
                      alt={photo.title}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      className="h-56 w-full rounded-xl object-cover"
                    />
                  );
                })()}
                <p className="font-script text-primary mt-3 text-2xl">
                  {PRIZE_MESSAGES[reveal.prizeIdx] ?? "A memory for you."}
                </p>
                <p className="text-muted-foreground mt-2 text-xs">Tap anywhere to keep playing</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  );
}
