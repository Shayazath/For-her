import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { scratchWish } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { burstConfetti } from "./effects";
import { useProgress } from "./progress";

export function ScratchCard() {
  const { complete, isDone } = useProgress();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#8d5bb5");
    grad.addColorStop(0.5, "#d76ba5");
    grad.addColorStop(1, "#e3b169");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "600 15px Outfit, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.textAlign = "center";
    ctx.fillText("Scratch here ✨", canvas.width / 2, canvas.height / 2);
  }, []);

  const checkCleared = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    for (let i = 3; i < data.length; i += 40) if (data[i] === 0) clear++;
    if (clear / (data.length / 40) > 0.5) {
      setRevealed(true);
      burstConfetti(0.7);
      complete("scratch");
    }
  };

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 26, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <Chapter
      id="chapter-scratch"
      eyebrow="Game 3"
      title="Scratch Card"
      subtitle="Rub the card to uncover today's wish."
    >
      <div className="glass-card glow relative mx-auto max-w-lg overflow-hidden">
        <div className="flex min-h-52 items-center justify-center p-8 text-center">
          <motion.p
            animate={revealed || isDone("scratch") ? { scale: [0.96, 1] } : {}}
            className="font-display text-2xl leading-snug"
          >
            {scratchWish}
          </motion.p>
        </div>
        {!revealed && !isDone("scratch") && (
          <canvas
            ref={canvasRef}
            onPointerDown={() => (drawing.current = true)}
            onPointerUp={() => {
              drawing.current = false;
              checkCleared();
            }}
            onPointerLeave={() => (drawing.current = false)}
            onPointerMove={scratch}
            className="absolute inset-0 size-full cursor-crosshair touch-none"
          />
        )}
      </div>
    </Chapter>
  );
}
