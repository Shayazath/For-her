import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { gifto } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { burstConfetti } from "./effects";
import { useProgress } from "./progress";

const SIZE = 3;
const photo = gifto[0]!;

function shuffled(): number[] {
  const order = Array.from({ length: SIZE * SIZE }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = order[i]!;
    order[i] = order[j]!;
    order[j] = a;
  }
  return order.every((v, i) => v === i) ? shuffled() : order;
}

export function Puzzle() {
  const { complete, isDone } = useProgress();
  // Deterministic start (no Math.random during SSR), reshuffled on mount.
  const [tiles, setTiles] = useState<number[]>(() => [4, 1, 6, 3, 0, 8, 2, 7, 5]);
  useEffect(() => setTiles(shuffled()), []);
  const [selected, setSelected] = useState<number | null>(null);
  const solved = tiles.every((v, i) => v === i);

  const click = (pos: number) => {
    if (solved) return;
    if (selected === null) {
      setSelected(pos);
      return;
    }
    const next = [...tiles];
    const a = next[pos]!;
    next[pos] = next[selected]!;
    next[selected] = a;
    setSelected(null);
    setTiles(next);
    if (next.every((v, i) => v === i)) {
      burstConfetti(0.7);
      complete("puzzle");
    }
  };

  return (
    <Chapter
      id="chapter-puzzle"
      eyebrow="Game 2"
      title="Photo Puzzle"
      subtitle="Tap two tiles to swap them. Fix the picture to unlock the memory."
    >
      <div className="mx-auto max-w-md">
        <div className="glass-card grid grid-cols-3 gap-1.5 p-3">
          {tiles.map((tile, pos) => (
            <motion.button
              key={pos}
              layout
              onClick={() => click(pos)}
              whileHover={{ scale: solved ? 1 : 1.03 }}
              className={`aspect-square overflow-hidden rounded-lg bg-cover ${
                selected === pos ? "ring-primary ring-2" : ""
              }`}
              style={{
                backgroundImage: `url(${photo.src})`,
                backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
                backgroundPosition: `${(tile % SIZE) * (100 / (SIZE - 1))}% ${
                  Math.floor(tile / SIZE) * (100 / (SIZE - 1))
                }%`,
              }}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <button
            onClick={() => {
              setTiles(shuffled());
              setSelected(null);
            }}
            className="bg-secondary hover:bg-accent rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Shuffle again
          </button>
          {(solved || isDone("puzzle")) && (
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-script text-primary text-2xl"
            >
              {photo.caption}
            </motion.p>
          )}
        </div>
      </div>
    </Chapter>
  );
}
