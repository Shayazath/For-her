import confetti from "canvas-confetti";
import { useEffect, useMemo, useState } from "react";

/** Random decorative layers are client-only to avoid hydration mismatches. */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

const CONFETTI_COLORS = ["#ff8ac0", "#c084fc", "#ffd479", "#ffffff", "#ff5f9e"];

export function burstConfetti(originY = 0.6) {
  confetti({
    particleCount: 140,
    spread: 90,
    startVelocity: 45,
    origin: { y: originY },
    colors: CONFETTI_COLORS,
    scalar: 1.05,
  });
}

export function bigCelebration(duration = 3500) {
  const end = Date.now() + duration;
  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.75 },
      colors: CONFETTI_COLORS,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.75 },
      colors: CONFETTI_COLORS,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

export function fireworksBurst(duration = 5000) {
  const end = Date.now() + duration;
  const shoot = () => {
    confetti({
      particleCount: 90,
      spread: 360,
      startVelocity: 32,
      ticks: 120,
      gravity: 0.55,
      decay: 0.92,
      shapes: ["circle"],
      colors: CONFETTI_COLORS,
      origin: { x: 0.15 + Math.random() * 0.7, y: 0.15 + Math.random() * 0.45 },
    });
    if (Date.now() < end) setTimeout(shoot, 420);
  };
  shoot();
}

/** Twinkling star field, purely decorative. */
export function Starfield({ count = 70 }: { count?: number }) {
  const mounted = useMounted();
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.6,
        delay: Math.random() * 4,
        duration: 2.4 + Math.random() * 3,
      })),
    [count],
  );

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="animate-twinkle absolute rounded-full bg-foreground"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Balloons drifting upward across the whole page. */
export function FloatingBalloons({ count = 10 }: { count?: number }) {
  const mounted = useMounted();
  const balloons = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 96,
        size: 34 + Math.random() * 42,
        delay: Math.random() * 18,
        duration: 20 + Math.random() * 16,
        tone: i % 3,
      })),
    [count],
  );

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {balloons.map((b) => (
        <span
          key={b.id}
          className="animate-rise absolute bottom-0 block"
          style={{
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        >
          <span
            className={`block rounded-[50%] opacity-60 ${
              b.tone === 0 ? "bg-primary" : b.tone === 1 ? "bg-accent" : "bg-gold"
            }`}
            style={{ width: b.size, height: b.size * 1.22 }}
          />
          <span className="mx-auto block h-10 w-px bg-border" />
        </span>
      ))}
    </div>
  );
}

/** Soft floating hearts, used around the love notes and the finale. */
export function FloatingHearts({ count = 14 }: { count?: number }) {
  const mounted = useMounted();
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 18,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 10,
      })),
    [count],
  );

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="animate-rise absolute bottom-0 text-primary"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}
