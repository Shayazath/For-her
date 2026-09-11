import { motion } from "motion/react";
import { ALL_TASKS, useProgress } from "./progress";

const CHAPTERS = [
  { id: "chapter-welcome", label: "Welcome" },
  { id: "chapter-memories", label: "Memories" },
  { id: "chapter-gifts", label: "Gifts" },
  { id: "chapter-cake", label: "Cake" },
  { id: "chapter-balloons", label: "Games" },
  { id: "chapter-secret", label: "Secret" },
  { id: "chapter-final", label: "Finale" },
];

export function JourneyNav() {
  const { done } = useProgress();
  const completed = ALL_TASKS.filter((t) => done[t]).length;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card fixed top-4 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-1 px-3 py-2 md:flex"
    >
      {CHAPTERS.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className="hover:bg-accent/40 rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors"
        >
          {c.label}
        </a>
      ))}
      <span className="bg-border mx-2 h-5 w-px" />
      <span className="text-gold px-2 text-xs font-semibold">
        {completed}/{ALL_TASKS.length}
      </span>
    </motion.nav>
  );
}
