import { useCallback, useEffect, useRef, useState } from "react";
import { Music, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { motion } from "motion/react";

/**
 * Tiny WebAudio music box — no audio files needed, so the surprise never
 * breaks because of a missing mp3. Two gentle looping melodies.
 */
type Track = { name: string; notes: number[]; tempo: number };

const TRACKS: Track[] = [
  {
    name: "Happy Birthday (music box)",
    tempo: 0.42,
    notes: [
      392, 392, 440, 392, 523, 494, 0, 392, 392, 440, 392, 587, 523, 0, 392, 392, 784, 659, 523,
      494, 466, 0, 698, 698, 659, 523, 587, 523, 0,
    ],
  },
  {
    name: "Starlight (lullaby)",
    tempo: 0.55,
    notes: [523, 659, 784, 659, 587, 494, 440, 494, 523, 587, 659, 587, 523, 494, 440, 0],
  },
];

export function MusicPlayer({ autoStart }: { autoStart: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.35);
  const [step, setStep] = useState(0);

  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const stop = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    const AudioCtor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    if (!ctxRef.current) {
      const ctx = new AudioCtor();
      const gain = ctx.createGain();
      gain.gain.value = volume;
      gain.connect(ctx.destination);
      ctxRef.current = ctx;
      gainRef.current = gain;
    }
    void ctxRef.current.resume();
    setPlaying(true);
  }, [volume]);

  // note scheduler
  useEffect(() => {
    if (!playing) return;
    const ctx = ctxRef.current;
    const master = gainRef.current;
    if (!ctx || !master) return;
    const track = TRACKS[trackIndex] ?? TRACKS[0]!;

    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const idx = stepRef.current % track.notes.length;
      const freq = track.notes[idx] ?? 0;
      if (freq > 0) {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const env = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        env.gain.setValueAtTime(0.0001, now);
        env.gain.exponentialRampToValueAtTime(0.6, now + 0.02);
        env.gain.exponentialRampToValueAtTime(0.0001, now + track.tempo * 1.6);
        osc.connect(env);
        env.connect(master);
        osc.start(now);
        osc.stop(now + track.tempo * 1.7);
      }
      stepRef.current = (stepRef.current + 1) % track.notes.length;
      setStep(stepRef.current);
      timerRef.current = window.setTimeout(tick, track.tempo * 1000);
    };
    tick();

    return () => {
      cancelled = true;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [playing, trackIndex]);

  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.value = volume;
  }, [volume]);

  useEffect(() => {
    if (autoStart && !playing) play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  const track = TRACKS[trackIndex] ?? TRACKS[0]!;
  const progress = (step / track.notes.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="glass-card fixed right-4 bottom-4 z-50 w-[17rem] p-4"
    >
      <div className="flex items-center gap-2">
        <span className="bg-festive text-primary-foreground flex size-8 items-center justify-center rounded-full">
          <Music className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{track.name}</p>
          <p className="text-muted-foreground text-[11px]">
            {playing ? "Now playing" : "Paused"}
          </p>
        </div>
      </div>

      <div className="bg-secondary mt-3 h-1 overflow-hidden rounded-full">
        <div
          className="bg-festive h-full rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          aria-label="Previous track"
          onClick={() => {
            stepRef.current = 0;
            setTrackIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length);
          }}
          className="hover:text-primary text-muted-foreground transition-colors"
        >
          <SkipBack className="size-4" />
        </button>
        <button
          aria-label={playing ? "Pause music" : "Play music"}
          onClick={() => (playing ? stop() : play())}
          className="bg-festive text-primary-foreground glow flex size-10 items-center justify-center rounded-full transition-transform hover:scale-105"
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <button
          aria-label="Next track"
          onClick={() => {
            stepRef.current = 0;
            setTrackIndex((i) => (i + 1) % TRACKS.length);
          }}
          className="hover:text-primary text-muted-foreground transition-colors"
        >
          <SkipForward className="size-4" />
        </button>
        <div className="flex items-center gap-1.5">
          <Volume2 className="text-muted-foreground size-4" />
          <input
            aria-label="Volume"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="accent-primary w-16"
          />
        </div>
      </div>
    </motion.div>
  );
}
