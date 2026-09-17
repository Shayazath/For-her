import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cake as CakeIcon, Wind } from "lucide-react";
import { Chapter } from "./Chapter";
import { bigCelebration, fireworksBurst, burstConfetti } from "./effects";
import { useProgress } from "./progress";
import { celebrant, secretgal } from "@/data/birthday";

const CANDLES = [0, 1, 2, 3, 4];

/** Photos popping around the edges of the screen — never over the cake (centre). */
function PhotoPops({ active, count = 14 }: { active: boolean; count?: number }) {
  const pops = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const side = i % 4; // 0 left, 1 right, 2 top, 3 bottom
        const rand = (min: number, max: number) => min + Math.random() * (max - min);
        const left =
          side === 0 ? rand(1, 16) : side === 1 ? rand(76, 92) : rand(6, 84);
        const top =
          side === 2 ? rand(3, 16) : side === 3 ? rand(72, 88) : rand(8, 80);
        return {
          id: i,
          src: secretgal[i % secretgal.length]!.src,
          left,
          top,
          size: 88 + Math.random() * 72,
          rotate: rand(-16, 16),
          delay: i * 0.16 + Math.random() * 0.2,
        };
      }),
    [count],
  );

  return (
    <AnimatePresence>
      {active && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
          {pops.map((p) => (
            <motion.img
              key={p.id}
              src={p.src}
              alt=""
              initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.3, 1.08, 1, 0.9],
                rotate: p.rotate,
                y: [0, -18, -30],
              }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 3.2, delay: p.delay, ease: "easeOut" }}
              className="glow-gold absolute rounded-xl border-2 border-white/70 object-cover shadow-2xl"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size * 1.15,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

export function Cake() {
  const { complete, isDone } = useProgress();
  const [blown, setBlown] = useState(false);
  const [cut, setCut] = useState(false);
  const [knifeX, setKnifeX] = useState(0);

  const blow = () => {
    if (blown) return;
    setBlown(true);
    burstConfetti(0.75);
  };

  const doCut = () => {
    if (cut) return;
    setCut(true);
    bigCelebration(3000);
    fireworksBurst(4500);
    complete("cake");
  };

  return (
    <Chapter
      id="chapter-cake"
      eyebrow="Chapter 4"
      title="Cake Celebration"
      subtitle="Blow out the candles, then drag the knife across the cake."
    >
      <PhotoPops active={cut} />
      <div className="glass-card glow relative overflow-hidden px-5 py-12">
        {/* Cake */}
        <div className="relative mx-auto flex w-full max-w-sm flex-col items-center">
          {/* candles */}
          <div className="mb-2 flex items-end gap-4">
            {CANDLES.map((c) => (
              <div key={c} className="flex flex-col items-center">
                <AnimatePresence>
                  {!blown && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, y: -24, scale: 0.2 }}
                      className="animate-flicker bg-gold glow-gold mb-1 block size-2.5 rounded-full"
                      style={{ animationDelay: `${c * 0.13}s` }}
                    />
                  )}
                </AnimatePresence>
                <span className="bg-festive block h-10 w-1.5 rounded-full" />
              </div>
            ))}
          </div>

          {/* layers */}
          <motion.div
            animate={cut ? { rotate: [0, -1.5, 1, 0] } : {}}
            className="w-full space-y-1"
          >
            <div className="bg-primary/80 relative mx-auto h-8 w-2/3 rounded-t-2xl">
              {cut && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-background/70 absolute top-0 bottom-0 left-1/2 w-1"
                />
              )}
            </div>
            <div className="bg-accent/70 mx-auto h-12 w-5/6 rounded-lg" />
            <div className="bg-primary/60 mx-auto h-14 w-full rounded-lg" />
            <div className="bg-secondary mx-auto h-3 w-full rounded-b-2xl" />
          </motion.div>

          {cut && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute inset-0"
            >
              <motion.span
                initial={{ x: 0, y: 0, rotate: 0 }}
                animate={{ x: -140, y: 60, rotate: -35 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="bg-primary/70 absolute top-1/2 left-1/2 block h-10 w-10 rounded-md"
              />
              <motion.span
                initial={{ x: 0, y: 0 }}
                animate={{ x: 140, y: 70, rotate: 30 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="bg-accent/70 absolute top-1/2 left-1/2 block h-10 w-10 rounded-md"
              />
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-12 flex flex-col items-center gap-6">
          {!blown ? (
            <button
              onClick={blow}
              className="bg-festive text-primary-foreground cursor-pointer glow inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition-transform hover:scale-105 active:scale-95"
            >
              <Wind className="size-5" /> Blow out the candles
            </button>
          ) : !cut ? (
            <div className="w-full max-w-md">
              <p className="text-muted-foreground mb-3 text-center text-sm">
                Now drag the knife all the way across →
              </p>
              <div className="bg-secondary relative h-14 rounded-full">
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.9}
                  onDrag={(_, info) => setKnifeX(info.offset.x)}
                  onDragEnd={() => {
                    if (knifeX > 120) doCut();
                    setKnifeX(0);
                  }}
                  whileDrag={{ scale: 1.05 }}
                  className="bg-festive text-primary-foreground absolute top-1 left-1 flex size-12 cursor-grab items-center justify-center rounded-full active:cursor-grabbing"
                >
                  <CakeIcon className="size-5" />
                </motion.div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <p className="text-festive font-display text-3xl font-bold">
                Happy Birthday, {celebrant.name}!
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Make a wish — I already know what I'd wish for you.
              </p>
            </motion.div>
          )}
          {isDone("cake") && (
            <p className="text-gold text-[11px] tracking-[0.25em] uppercase">Chapter complete</p>
          )}
        </div>
      </div>
    </Chapter>
  );
}
