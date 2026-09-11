import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X } from "lucide-react";
import { memories, quiz } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { burstConfetti } from "./effects";
import { useProgress } from "./progress";

export function Quiz() {
  const { complete } = useProgress();
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quiz[step];

  const choose = (i: number) => {
    if (picked !== null || !q) return;
    setPicked(i);
    const right = i === q.answer;
    if (right) setCorrect((c) => c + 1);
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

  const unlocked = memories.slice(0, Math.max(correct, 1));

  return (
    <Chapter
      id="chapter-quiz"
      eyebrow="Game 5"
      title="Memory Quiz"
      subtitle="How well do you remember us? Every right answer unlocks a photo."
    >
      <div className="mx-auto max-w-2xl">
        {!finished && q ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="glass-card p-7"
            >
              <p className="text-gold text-[11px] tracking-[0.25em] uppercase">
                Question {step + 1} of {quiz.length}
              </p>
              <h3 className="mt-3 text-2xl font-semibold">{q.question}</h3>
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
                      className={`flex items-center justify-between rounded-xl border px-5 py-3.5 text-left transition-all ${
                        state === "right"
                          ? "border-gold bg-gold/15"
                          : state === "wrong"
                            ? "border-destructive bg-destructive/15"
                            : "bg-secondary/60 hover:bg-accent/40"
                      }`}
                    >
                      <span>{opt}</span>
                      {state === "right" && <Check className="text-gold size-4" />}
                      {state === "wrong" && <X className="text-destructive size-4" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card glow p-7 text-center"
          >
            <p className="font-display text-3xl font-bold">
              {correct} / {quiz.length} right
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              {correct === quiz.length
                ? "Flawless. You remember everything."
                : "Close enough — you still unlocked photos."}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {unlocked.map((m) => (
                <motion.img
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  src={m.src}
                  alt={m.title}
                  width={m.width}
                  height={m.height}
                  loading="lazy"
                  className="h-28 w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Chapter>
  );
}
