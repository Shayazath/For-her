import { useEffect, useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Lock } from "lucide-react";
import { celebrant } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { useProgress, type TaskId } from "./progress";
import { Landing } from "./Landing";
import { MemoryGallery } from "./MemoryGallery";
import { Slideshow } from "./Slideshow";
import { LoveNotes } from "./LoveNotes";
import { MemoryMap } from "./MemoryMap";
import { Gifts } from "./Gifts";
import { Cake } from "./Cake";
import { BalloonGame } from "./BalloonGame";
import { Puzzle } from "./Puzzle";
import { ScratchCard } from "./ScratchCard";
import { SpinWheel } from "./SpinWheel";
import { Quiz } from "./Quiz";
import { TreasureHunt } from "./TreasureHunt";
import { SecretGallery } from "./SecretGallery";
import { Fireworks, FinalSurprise } from "./FinalSurprise";
import { GuestWishes } from "./GuestWishes";

const m = motion;

function Welcome() {
  return (
    <Chapter
      id="chapter-welcome"
      eyebrow="Chapter 1"
      title="Welcome to Your Day"
      subtitle="One step at a time. Finish each one to unlock the next."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        {[
          { n: "01", t: "Memories", d: "Photos, polaroids and a timeline of everything." },
          { n: "02", t: "Play", d: "Balloons, puzzles, wheels, quizzes and clues." },
          { n: "03", t: "Surprise", d: "Cake, fireworks and the last reveal." },
        ].map((c, i) => (
          <m.div
            key={c.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -8 }}
            className="glass-card p-7"
          >
            <p className="font-display text-gold text-3xl">{c.n}</p>
            <h3 className="mt-3 text-xl font-semibold">{c.t}</h3>
            <p className="text-muted-foreground mt-2 text-sm">{c.d}</p>
          </m.div>
        ))}
      </div>
    </Chapter>
  );
}

function FinaleStep() {
  return (
    <>
      <Fireworks />
      <FinalSurprise />
      <GuestWishes />
    </>
  );
}

type Step = {
  label: string;
  Component: ComponentType;
  gate?: TaskId;
  hint?: string;
};

// const STEPS: Step[] = [
//   { label: "Welcome", Component: Welcome },
//   { label: "Gallery", Component: MemoryGallery },
//   { label: "Slideshow", Component: Slideshow },
//   { label: "Notes", Component: LoveNotes },
//   { label: "Timeline", Component: MemoryMap },
//   { label: "Gifts", Component: Gifts, gate: "gifts", hint: "Unwrap the gifts to continue." },
//   { label: "Cake", Component: Cake, gate: "cake", hint: "Blow the candles and cut the cake." },
//   {
//     label: "Balloons",
//     Component: BalloonGame,
//     gate: "balloons",
//     hint: "Pop the balloons to continue.",
//   },
//   { label: "Puzzle", Component: Puzzle, gate: "puzzle", hint: "Solve the puzzle to continue." },
//   { label: "Scratch", Component: ScratchCard, gate: "scratch", hint: "Scratch the card fully." },
//   { label: "Wheel", Component: SpinWheel, gate: "wheel", hint: "Spin the wheel to continue." },
//   { label: "Quiz", Component: Quiz, gate: "quiz", hint: "Finish the quiz to continue." },
//   {
//     label: "Treasure",
//     Component: TreasureHunt,
//     gate: "treasure",
//     hint: "Crack every clue to continue.",
//   },
//   { label: "Secret", Component: SecretGallery },
//   { label: "Finale", Component: FinaleStep },
// ];
const STEPS: Step[] = [
  { label: "Welcome", Component: Welcome },
  { label: "Gallery", Component: MemoryGallery },
  { label: "Slideshow", Component: Slideshow },
  { label: "Notes", Component: LoveNotes },
  { label: "Timeline", Component: MemoryMap },
  { label: "Gifts", Component: Gifts },
  { label: "Cake", Component: Cake},
  {
    label: "Balloons",
    Component: BalloonGame
  },
  { label: "Puzzle", Component: Puzzle},
  { label: "Scratch", Component: ScratchCard},
  { label: "Wheel", Component: SpinWheel},
  { label: "Quiz", Component: Quiz},
  {
    label: "Treasure",
    Component: TreasureHunt
  },
  { label: "Secret", Component: SecretGallery },
  { label: "Finale", Component: FinaleStep },
];
export function StepFlow({ onStart }: { onStart: () => void }) {
  const { isDone } = useProgress();
  const [index, setIndex] = useState(-1); // -1 = landing
  const step = index >= 0 ? STEPS[index] : undefined;
  const unlocked = !step?.gate || isDone(step.gate);
  const isLast = index === STEPS.length - 1;

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  if (index < 0) {
    return (
      <Landing
        onStart={() => {
          onStart();
          setIndex(0);
        }}
      />
    );
  }

  return (
    <div className="pb-28">
      <div className="mx-auto w-full max-w-6xl px-5 pt-24">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gold font-semibold tracking-[0.25em] uppercase">
            Step {index + 1} of {STEPS.length}
          </span>
          <span className="text-muted-foreground">{step?.label}</span>
        </div>
        <div className="bg-secondary/60 mt-3 h-1.5 w-full overflow-hidden rounded-full">
          <motion.div
            className="bg-festive h-full"
            initial={false}
            animate={{ width: `${((index + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {step && <step.Component />}
        </motion.div>
      </AnimatePresence>

      <div className="glass-card fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-3 px-4 py-3">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm transition-colors disabled:opacity-40"
        >
          Back
        </button>
        {isLast ? (
          <p className="text-muted-foreground text-xs">
            That's everything, {celebrant.name} ❤️
          </p>
        ) : unlocked ? (
          <button
            onClick={() => setIndex((i) => Math.min(STEPS.length - 1, i + 1))}
            className="bg-festive text-primary-foreground flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            Next <ArrowRight className="size-4" />
          </button>
        ) : (
          <span className="text-muted-foreground flex items-center gap-2 text-xs">
            <Lock className="size-3.5" /> {step?.hint ?? "Finish this step to continue."}
          </span>
        )}
      </div>
    </div>
  );
}
