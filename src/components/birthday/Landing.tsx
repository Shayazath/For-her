import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import { celebrant } from "@/data/birthday";
import { Starfield, burstConfetti } from "./effects";

function useTyped(text: string, active: boolean, speed = 95) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, active, speed]);
  return out;
}
const countdown = [
  "I love 1",
  "I love 2",
  "I love 3"
];

export function Landing({ onStart }: { onStart: () => void }) {
  const [count, setCount] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const typed = useTyped(`${celebrant.greeting} ❤️`, true);

  useEffect(() => {
    if (count === null) return;
    if (count === 0) {
      burstConfetti(0.7);
      setStarted(true);
      const id = window.setTimeout(() => {
        onStart();
        document.getElementById("chapter-welcome")?.scrollIntoView({ behavior: "smooth" });
      }, 900);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setCount((c) => (c ?? 1) - 1), 900);
    return () => window.clearTimeout(id);
  }, [count, onStart]);

  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">
      <Starfield count={90} />

      <motion.div
        aria-hidden
        className="bg-primary/25 absolute -top-32 left-1/2 size-[34rem] -translate-x-1/2 rounded-full blur-[120px]"
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-gold relative z-10 text-xs font-semibold tracking-[0.4em] uppercase"
      >
        A surprise, hand-made
      </motion.p>

      <h1 className="relative z-10 mt-6 text-5xl font-bold sm:text-7xl md:text-8xl">
        <span className="text-festive">{typed}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="bg-primary ml-2 inline-block h-[1em] w-[3px] align-middle"
        />
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="font-script text-primary relative z-10 mt-4 text-4xl sm:text-6xl"
      >
        {celebrant.name}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="text-muted-foreground relative z-10 mt-6 max-w-md text-base"
      >
        {celebrant.subtitle}. Turn the sound on, take your time, and open every single thing.
      </motion.p>

      <div className="relative z-10 mt-12 flex min-h-28 items-center justify-center">
        <AnimatePresence mode="wait">
          {count === null ? (
            <motion.button
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setCount(0)}
              className="bg-festive text-primary-foreground glow group inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg font-semibold transition-transform hover:scale-[1.04] active:scale-95"
            >
              <Sparkles className="size-5 transition-transform group-hover:rotate-12" />
              Start the Journey
            </motion.button>
          ) : started ? (
            <motion.p
              key="go"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-festive text-5xl font-bold"
            >
              Let's go ✨
            </motion.p>
          ) : (
            <motion.span
              key={count}
              initial={{ opacity: 0, scale: 2, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.5 }}
              className="text-gold glow-gold flex flex-row size-24 items-center justify-center rounded-full border text-5xl font-bold whitespace-nowrap"
            >
              {countdown[count]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-muted-foreground absolute bottom-8 text-xs tracking-[0.3em] uppercase"
      >
        LOVE YOU
      </motion.div>
    </header>
  );
}
