import { useState } from "react";
import { motion } from "motion/react";
import { wheelSlices } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { burstConfetti } from "./effects";
import { useProgress } from "./progress";

const SLICE = 360 / wheelSlices.length;

export function SpinWheel() {
  const { complete } = useProgress();
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const picked = Math.floor(Math.random() * wheelSlices.length);
    const target = rotation + 360 * 5 + (360 - picked * SLICE - SLICE / 2);
    setRotation(target);
    window.setTimeout(() => {
      setResult(wheelSlices[picked] ?? null);
      setSpinning(false);
      burstConfetti(0.7);
      complete("wheel");
    }, 3600);
  };

  return (
    <Chapter
      id="chapter-wheel"
      eyebrow="Game 4"
      title="Spin the Wheel"
      subtitle="One spin, one little reward. You can spin as many times as you like."
    >
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <span className="bg-gold glow-gold absolute -top-2 left-1/2 z-20 size-4 -translate-x-1/2 rotate-45 rounded-sm" />
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 3.5, ease: [0.12, 0.8, 0.05, 1] }}
            className="glow relative size-72 rounded-full border-4 sm:size-80"
            style={{
              background: `conic-gradient(${wheelSlices
                .map((_, i) => {
                  const c = i % 3 === 0 ? "#ff5f9e" : i % 3 === 1 ? "#a855f7" : "#ffd479";
                  return `${c} ${i * SLICE}deg ${(i + 1) * SLICE}deg`;
                })
                .join(", ")})`,
            }}
          >
            {wheelSlices.map((slice, i) => (
              <span
                key={slice}
                className="text-primary-foreground absolute top-1/2 left-1/2 w-28 origin-left text-[11px] font-semibold"
                style={{
                  transform: `rotate(${i * SLICE + SLICE / 2}deg) translateX(20px)`,
                }}
              >
                {slice}
              </span>
            ))}
            <span className="bg-background/90 absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full border" />
          </motion.div>
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className="bg-festive text-primary-foreground glow rounded-full px-9 py-4 font-semibold transition-transform hover:scale-105 active:scale-95 disabled:opacity-60"
        >
          {spinning ? "Spinning…" : "Spin"}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card px-8 py-5 text-center"
          >
            <p className="text-gold text-[11px] tracking-[0.25em] uppercase">You won</p>
            <p className="font-script text-primary mt-1 text-3xl">{result}</p>
          </motion.div>
        )}
      </div>
    </Chapter>
  );
}
