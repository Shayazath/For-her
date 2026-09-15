import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  ChevronDown,
  ChevronUp,
  GripHorizontal,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "motion/react";

/**
 * Tiny WebAudio music box — no audio files needed.
 * Two gentle looping melodies.
 */

type Track = {
  name: string;
  notes: number[];
  tempo: number;
};

const TRACKS: Track[] = [
  {
    name: "Happy Birthday (music box)",
    tempo: 0.42,
    notes: [
      392,
      392,
      440,
      392,
      523,
      494,
      0,
      392,
      392,
      440,
      392,
      587,
      523,
      0,
      392,
      392,
      784,
      659,
      523,
      494,
      466,
      0,
      698,
      698,
      659,
      523,
      587,
      523,
      0,
    ],
  },

  {
    name: "Starlight (lullaby)",
    tempo: 0.55,
    notes: [
      523,
      659,
      784,
      659,
      587,
      494,
      440,
      494,
      523,
      587,
      659,
      587,
      523,
      494,
      440,
      0,
    ],
  },
];

export function MusicPlayer({
  autoStart,
}: {
  autoStart: boolean;
}) {
  // ==================================================
  // PLAYER STATE
  // ==================================================

  const [playing, setPlaying] =
    useState(false);

  const [trackIndex, setTrackIndex] =
    useState(0);

  const [volume, setVolume] =
    useState(0.35);

  const [step, setStep] =
    useState(0);

  /**
   * Before the first interaction:
   * completely hidden.
   */
  const [hasInteracted, setHasInteracted] =
    useState(false);

  /**
   * true  = full player
   * false = small music circle
   */
  const [showPlayer, setShowPlayer] =
    useState(false);

  // ==================================================
  // DRAG STATE
  // ==================================================

  /**
   * Whether the player has been manually moved.
   *
   * We keep the position in pixels so it stays where
   * the user placed it even when it minimizes.
   */
  const [position, setPosition] =
    useState<{
      x: number;
      y: number;
    } | null>(null);

  // ==================================================
  // REFS
  // ==================================================

  const ctxRef =
    useRef<AudioContext | null>(null);

  const gainRef =
    useRef<GainNode | null>(null);

  const timerRef =
    useRef<number | null>(null);

  const popupTimerRef =
    useRef<number | null>(null);

  const stepRef =
    useRef(0);

  // ==================================================
  // SHOW PLAYER
  // ==================================================

  const revealPlayer = useCallback(() => {
    setHasInteracted(true);
    setShowPlayer(true);

    /**
     * Clear previous timer.
     */
    if (popupTimerRef.current) {
      window.clearTimeout(
        popupTimerRef.current,
      );
    }

    /**
     * Automatically minimize after 3 seconds.
     */
    popupTimerRef.current =
      window.setTimeout(() => {
        setShowPlayer(false);
      }, 3000);
  }, []);

  // ==================================================
  // MINIMIZE
  // ==================================================

  const minimizePlayer =
    useCallback(() => {
      if (popupTimerRef.current) {
        window.clearTimeout(
          popupTimerRef.current,
        );
      }

      popupTimerRef.current = null;

      setShowPlayer(false);
    }, []);

  // ==================================================
  // PLAY
  // ==================================================

  const play = useCallback(() => {
    const AudioCtor =
      window.AudioContext ??
      (
        window as unknown as {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioCtor) {
      return;
    }

    if (!ctxRef.current) {
      const ctx =
        new AudioCtor();

      const gain =
        ctx.createGain();

      gain.gain.value =
        volume;

      gain.connect(
        ctx.destination,
      );

      ctxRef.current = ctx;
      gainRef.current = gain;
    }

    void ctxRef.current.resume();

    setPlaying(true);
  }, [volume]);

  // ==================================================
  // STOP
  // ==================================================

  const stop = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(
        timerRef.current,
      );
    }

    timerRef.current = null;

    setPlaying(false);
  }, []);

  // ==================================================
  // NOTE SCHEDULER
  // ==================================================

  useEffect(() => {
    if (!playing) {
      return;
    }

    const ctx =
      ctxRef.current;

    const master =
      gainRef.current;

    if (!ctx || !master) {
      return;
    }

    const track =
      TRACKS[trackIndex] ??
      TRACKS[0]!;

    let cancelled =
      false;

    const tick = () => {
      if (cancelled) {
        return;
      }

      const idx =
        stepRef.current %
        track.notes.length;

      const freq =
        track.notes[idx] ?? 0;

      if (freq > 0) {
        const now =
          ctx.currentTime;

        const osc =
          ctx.createOscillator();

        const env =
          ctx.createGain();

        osc.type =
          "triangle";

        osc.frequency.value =
          freq;

        env.gain.setValueAtTime(
          0.0001,
          now,
        );

        env.gain.exponentialRampToValueAtTime(
          0.6,
          now + 0.02,
        );

        env.gain.exponentialRampToValueAtTime(
          0.0001,
          now +
            track.tempo *
              1.6,
        );

        osc.connect(env);

        env.connect(master);

        osc.start(now);

        osc.stop(
          now +
            track.tempo *
              1.7,
        );
      }

      stepRef.current =
        (stepRef.current + 1) %
        track.notes.length;

      setStep(
        stepRef.current,
      );

      timerRef.current =
        window.setTimeout(
          tick,
          track.tempo * 1000,
        );
    };

    tick();

    return () => {
      cancelled = true;

      if (timerRef.current) {
        window.clearTimeout(
          timerRef.current,
        );
      }
    };
  }, [
    playing,
    trackIndex,
  ]);

  // ==================================================
  // VOLUME
  // ==================================================

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value =
        volume;
    }
  }, [volume]);

  // ==================================================
  // AUTO START
  // ==================================================

  useEffect(() => {
    if (
      autoStart &&
      !playing
    ) {
      play();

      revealPlayer();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  // ==================================================
  // CLEANUP
  // ==================================================

  useEffect(() => {
    return () => {
      if (popupTimerRef.current) {
        window.clearTimeout(
          popupTimerRef.current,
        );
      }

      if (timerRef.current) {
        window.clearTimeout(
          timerRef.current,
        );
      }
    };
  }, []);

  // ==================================================
  // TRACK
  // ==================================================

  const track =
    TRACKS[trackIndex] ??
    TRACKS[0]!;

  const progress =
    (step /
      track.notes.length) *
    100;

  // ==================================================
  // INITIAL STATE
  // ==================================================

  if (!hasInteracted) {
    return null;
  }

  // ==================================================
  // DRAG POSITION
  // ==================================================

  /**
   * When the player has not been dragged,
   * Tailwind controls its default position.
   *
   * Once dragged, we use x/y.
   */
  const dragStyle =
    position
      ? {
          x: position.x,
          y: position.y,
        }
      : undefined;

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <AnimatePresence mode="wait">

      {/* ==================================================
          FULL MUSIC PLAYER
          ================================================== */}

      {showPlayer ? (
        <motion.div
          key="expanded"

          drag

          dragMomentum={false}

          dragElastic={0.05}

          /**
           * Don't allow the player to be dragged
           * completely outside the screen.
           */
          dragConstraints={{
            top: -300,
            left: -300,
            right: 300,
            bottom: 300,
          }}

          initial={{
            opacity: 0,
            y: 25,
            scale: 0.92,
          }}

          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}

          exit={{
            opacity: 0,
            scale: 0.92,
          }}

          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}

          style={dragStyle}

          /**
           * Important:
           * touch-action prevents dragging from
           * fighting with page scrolling when the
           * player itself is touched.
           */
          className="
            glass-card
            fixed
            bottom-20
            right-3
            z-50
            w-[calc(100vw-2rem)]
            max-w-[17rem]
            p-3
            shadow-[var(--shadow-card)]
            sm:bottom-4
            sm:right-4
            sm:w-[17rem]
            sm:p-4
          "
        >

          {/* ==================================================
              DRAG HANDLE / HEADER
              ================================================== */}

          <div
            className="
              flex
              cursor-grab
              touch-none
              items-center
              gap-2
              active:cursor-grabbing
            "
          >

            {/* MUSIC ICON */}

            <span className="bg-festive text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full">

              <Music className="size-4" />

            </span>

            {/* TRACK NAME */}

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-medium">
                {track.name}
              </p>

              <p className="text-muted-foreground text-[11px]">
                {playing
                  ? "Now playing"
                  : "Paused"}
              </p>

            </div>

            {/* DRAG INDICATOR */}

            <GripHorizontal
              className="
                text-muted-foreground
                hidden
                size-4
                shrink-0
                sm:block
              "
            />

            {/* MINIMIZE */}

            <button
              type="button"
              onClick={
                minimizePlayer
              }
              aria-label="Minimize music player"
              className="
                text-muted-foreground
                hover:bg-secondary/70
                hover:text-primary
                flex
                size-8
                shrink-0
                cursor-pointer
                items-center
                justify-center
                rounded-full
                transition-all
              "
            >
              <ChevronDown className="size-4" />
            </button>

          </div>

          {/* ==================================================
              PROGRESS
              ================================================== */}

          <div className="bg-secondary mt-3 h-1 overflow-hidden rounded-full">

            <div
              className="
                bg-festive
                h-full
                rounded-full
                transition-all
                duration-200
              "
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          {/* ==================================================
              CONTROLS
              ================================================== */}

          <div className="mt-3 flex items-center justify-between gap-2">

            {/* PREVIOUS */}

            <button
              type="button"
              aria-label="Previous track"
              onClick={() => {
                stepRef.current =
                  0;

                setTrackIndex(
                  (i) =>
                    (
                      i -
                      1 +
                      TRACKS.length
                    ) %
                    TRACKS.length,
                );

                revealPlayer();
              }}
              className="
                text-muted-foreground
                hover:text-primary
                flex
                size-8
                shrink-0
                cursor-pointer
                items-center
                justify-center
                rounded-full
                transition-colors
              "
            >
              <SkipBack className="size-4" />
            </button>

            {/* PLAY / PAUSE */}

            <button
              type="button"
              aria-label={
                playing
                  ? "Pause music"
                  : "Play music"
              }
              onClick={() => {
                if (playing) {
                  stop();
                } else {
                  play();
                }

                revealPlayer();
              }}
              className="
                bg-festive
                text-primary-foreground
                glow
                flex
                size-10
                shrink-0
                cursor-pointer
                items-center
                justify-center
                rounded-full
                transition-transform
                hover:scale-105
              "
            >
              {playing ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4" />
              )}
            </button>

            {/* NEXT */}

            <button
              type="button"
              aria-label="Next track"
              onClick={() => {
                stepRef.current =
                  0;

                setTrackIndex(
                  (i) =>
                    (
                      i + 1
                    ) %
                    TRACKS.length,
                );

                revealPlayer();
              }}
              className="
                text-muted-foreground
                hover:text-primary
                flex
                size-8
                shrink-0
                cursor-pointer
                items-center
                justify-center
                rounded-full
                transition-colors
              "
            >
              <SkipForward className="size-4" />
            </button>

            {/* VOLUME */}

            <div className="flex min-w-0 items-center gap-1.5">

              <Volume2 className="text-muted-foreground size-4 shrink-0" />

              <input
                aria-label="Volume"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) =>
                  setVolume(
                    Number(
                      e.target.value,
                    ),
                  )
                }
                className="
                  accent-primary
                  w-14
                  cursor-pointer
                  sm:w-16
                "
              />

            </div>

          </div>

        </motion.div>

      ) : (

        /* ==================================================
           MINIMIZED MUSIC CIRCLE
           ================================================== */

        <motion.div
          key="minimized"

          initial={{
            opacity: 0,
            scale: 0.7,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          exit={{
            opacity: 0,
            scale: 0.7,
          }}

          transition={{
            duration: 0.25,
          }}

          className="
            fixed
            bottom-4
            right-3
            z-50
            sm:right-4
          "
        >

          <div className="relative">

            {/* MUSIC CIRCLE */}

            <button
              type="button"
              onClick={
                revealPlayer
              }
              aria-label="Open music player"
              className="
                glass-card
                flex
                size-11
                cursor-pointer
                items-center
                justify-center
                rounded-full
                shadow-[var(--shadow-card)]
                transition-all
                duration-200
                hover:scale-110
                sm:size-12
              "
            >

              <Music
                className={`
                  size-5
                  text-gold
                  ${
                    playing
                      ? "animate-pulse"
                      : ""
                  }
                `}
              />

            </button>

            {/* PLAYING INDICATOR */}

            {playing && (
              <span className="absolute -right-0.5 -top-0.5 flex size-3">

                <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-60" />

                <span className="relative inline-flex size-3 rounded-full bg-gold" />

              </span>
            )}

            {/* UP ARROW */}

            <span
              className="
                absolute
                -left-1.5
                -top-1.5
                flex
                size-5
                items-center
                justify-center
                rounded-full
                border
                border-gold/30
                bg-background
                text-gold
                shadow-sm
              "
            >
              <ChevronUp className="size-3" />
            </span>

          </div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}