import { useState } from "react";
import { motion } from "motion/react";
import { KeyRound, Lightbulb } from "lucide-react";
import { treasureClues } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { burstConfetti } from "./effects";
import { useProgress } from "./progress";

export function TreasureHunt() {
  const { complete, isDone } = useProgress();
  const [step, setStep] = useState(0);
  const [guess, setGuess] = useState("");
  const [wrong, setWrong] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const clue = treasureClues[step];
  const solved = step >= treasureClues.length;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clue) return;
    if (guess.trim().toLowerCase() === clue.answer) {
      setGuess("");
      setWrong(false);
      setShowHint(false);
      burstConfetti(0.7);
      if (step + 1 >= treasureClues.length) complete("treasure");
      setStep((s) => s + 1);
    } else {
      setWrong(true);
    }
  };

  return (
    <Chapter
      id="chapter-treasure"
      eyebrow="Chapter 5"
      title="Treasure Hunt"
      subtitle="Solve every clue to earn the key to the secret gallery."
    >
      <div className="glass-card mx-auto max-w-xl p-8">
        <div className="mb-6 flex justify-center gap-2">
          {treasureClues.map((c, i) => (
            <span
              key={c.answer}
              className={`h-1.5 w-14 rounded-full ${i < step ? "bg-festive" : "bg-secondary"}`}
            />
          ))}
        </div>

        {solved || isDone("treasure") ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <KeyRound className="text-gold glow-gold mx-auto size-10" />
            <p className="font-display mt-4 text-2xl font-semibold">The key is yours</p>
            <p className="text-muted-foreground mt-2 text-sm">
              The secret gallery below is unlocked once you've cleared three games too.
            </p>
          </motion.div>
        ) : (
          <>
            <p className="font-script text-primary text-center text-3xl leading-snug">
              “{clue?.clue}”
            </p>
            <form onSubmit={submit} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <input
                value={guess}
                onChange={(e) => {
                  setGuess(e.target.value);
                  setWrong(false);
                }}
                placeholder="Type your answer…"
                aria-label="Your answer"
                className="bg-secondary/60 placeholder:text-muted-foreground focus:ring-ring flex-1 rounded-full border px-5 py-3 outline-none focus:ring-2"
              />
              <button
                type="submit"
                className="bg-festive text-primary-foreground rounded-full px-7 py-3 font-semibold transition-transform hover:scale-105 active:scale-95"
              >
                Unlock
              </button>
            </form>
            <div className="mt-4 flex items-center justify-between text-sm">
              {wrong ? (
                <p className="text-destructive">Not quite — try again.</p>
              ) : (
                <span className="text-muted-foreground">Clue {step + 1} of {treasureClues.length}</span>
              )}
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="text-gold inline-flex items-center gap-1.5 hover:underline"
              >
                <Lightbulb className="size-4" /> Hint
              </button>
            </div>
            {showHint && <p className="text-muted-foreground mt-2 text-sm">{clue?.hint}</p>}
          </>
        )}
      </div>
    </Chapter>
  );
}
