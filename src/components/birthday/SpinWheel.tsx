import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { wheelSlices } from "@/data/birthday";
import { Chapter } from "./Chapter";
import { burstConfetti } from "./effects";
import { useProgress } from "./progress";
import { supabase } from "@/lib/supabase";

const SLICE = 360 / wheelSlices.length;

type RewardType =
  | "hidden_photo"
  | "birthday_wish"
  | "silly_quote"
  | "tiny_memory"
  | "secret_message"
  | "free_favour";

const rewardMap: Record<string, RewardType> = {
  "A hidden photo": "hidden_photo",
  "A birthday wish": "birthday_wish",
  "A silly quote": "silly_quote",
  "A tiny memory": "tiny_memory",
  "A secret message": "secret_message",
  "One free favour": "free_favour",
};

const sillyQuotes = [
  "Remember that you wanted ajab and you got this gajab. 😋🤙"
];

const memories = [
  "Remember the day I told you that I was having attachment issues and how far we’ve come since then. 🥺",
];

const secretMessages = [
  "I’m ready to take you to the pahad and do the things we can’t \
  even imagine—running a small café with big, big dreams, making and selling different varieties of Maggi,\
   and living our life with our two little babies and our pet. Starting our mornings with coffee and ending \
   our nights by spilling lots and lots of tea. But dhoodh is mandatory for me. ❤️"
];

export function SpinWheel() {
  const { complete } = useProgress();

  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [rewardType, setRewardType] = useState<RewardType | null>(null);

  const [spinning, setSpinning] = useState(false);

  const [input, setInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);
    setRewardType(null);
    setInput("");
    setSaved(false);

    const picked = Math.floor(
      Math.random() * wheelSlices.length,
    );

    const target =
  rotation +
  360 * 5 +
  (270 - picked * SLICE - SLICE / 2);

    setRotation(target);

    window.setTimeout(() => {
      const selectedReward = wheelSlices[picked] ?? null;

      setResult(selectedReward);
      setRewardType(
        selectedReward ? rewardMap[selectedReward] : null,
      );

      setSpinning(false);

      burstConfetti(0.7);
      complete("wheel");
    }, 3600);
  };

  const saveResponse = async () => {
    if (!input.trim() || !rewardType) return;

    setSaving(true);

    const { error } = await supabase
      .from("wheel_rewards")
      .insert({
        reward_type: rewardType,
        content: input.trim(),
      });

    setSaving(false);

    if (error) {
      console.error("Failed to save reward:", error);
      return;
    }

    setSaved(true);
    setInput("");
  };

  const closeReward = () => {
    setResult(null);
    setRewardType(null);
    setInput("");
    setSaved(false);
  };

  return (
    <Chapter
      id="chapter-wheel"
      eyebrow="Game 4"
      title="Spin the Wheel"
      subtitle="One spin, one little surprise."
    >
      <div className="flex flex-col items-center gap-8">

        {/* WHEEL */}
        <div className="relative">

          {/* Pointer */}
          <span
            className="
              bg-gold
              glow-gold
              absolute
              -top-3
              left-1/2
              z-30
              size-5
              -translate-x-1/2
              rotate-45
              rounded-sm
              border-2
              border-white/30
            "
          />

          <motion.div
            animate={{ rotate: rotation }}
            transition={{
              duration: 3.5,
              ease: [0.12, 0.8, 0.05, 1],
            }}
            className="
              glow
              relative
              size-72
              overflow-hidden
              rounded-full
              border-4
              border-white/30
              shadow-2xl
              sm:size-80
            "
            style={{
              background: `conic-gradient(
                ${wheelSlices
                  .map((_, i) => {
                    const c =
                      i % 3 === 0
                        ? "#ff5f9e"
                        : i % 3 === 1
                          ? "#a855f7"
                          : "#ffd479";

                    return `${c} ${i * SLICE}deg ${(i + 1) * SLICE}deg`;
                  })
                  .join(", ")}
              )`,
            }}
          >

            {/* Slice separators */}
            {wheelSlices.map((_, i) => (
              <span
                key={`line-${i}`}
                className="
                  absolute
                  top-1/2
                  left-1/2
                  h-1/2
                  w-px
                  origin-bottom
                  bg-white/30
                "
                style={{
                  transform: `translate(-50%, -100%) rotate(${i * SLICE}deg)`,
                }}
              />
            ))}

            {/* Wheel text */}
            {wheelSlices.map((slice, i) => {
              const angle = i * SLICE + SLICE / 2;

              return (
                <div
                  key={slice}
                  className="absolute top-1/2 left-1/2 z-10"
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      rotate(${angle}deg)
                      translateY(-92px)
                    `,
                  }}
                >
                  <span
                    className="
                      flex
                      w-[68px]
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/40
                      bg-black/35
                      px-1.5
                      py-1.5
                      text-center
                      font-display
                      text-[10px]
                      font-bold
                      leading-[1.1]
                      text-white
                      shadow-lg
                      backdrop-blur-sm
                      drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
                    "
                  >
                    {slice}
                  </span>
                </div>
              );
            })}

            {/* Center */}
            <span
              className="
                absolute
                top-1/2
                left-1/2
                z-20
                flex
                size-14
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border-2
                border-white/30
                bg-background/90
                shadow-xl
                backdrop-blur-md
              "
            >
              <span className="size-3 rounded-full bg-gold shadow-[0_0_12px_rgba(255,212,121,0.9)]" />
            </span>

          </motion.div>
        </div>

        {/* SPIN BUTTON */}
        <button
          onClick={spin}
          disabled={spinning}
          className="
            bg-festive
            text-primary-foreground
            cursor-pointer
            glow
            rounded-full
            px-9
            py-4
            font-semibold
            transition-all
            hover:scale-105
            hover:shadow-xl
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {spinning ? "Spinning…" : "Spin"}
        </button>

        {/* ================================
            REWARD MODAL
        ================================= */}
        <AnimatePresence>
          {result && rewardType && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/70
                px-5
                backdrop-blur-md
              "
              onClick={closeReward}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                }}
                onClick={(e) => e.stopPropagation()}
                className="
                  glass-card
                  relative
                  w-full
                  max-w-md
                  overflow-hidden
                  p-8
                  text-center
                  shadow-2xl
                "
              >

                {/* =========================
                    HIDDEN PHOTO
                ========================== */}
                {rewardType === "hidden_photo" && (
                  <HiddenPhoto />
                )}

                {/* =========================
                    BIRTHDAY WISH
                ========================== */}
                {rewardType === "birthday_wish" && (
                  <InputReward
                    emoji="💌"
                    title="Make a Birthday Wish"
                    description="Close your eyes, make a wish, and write it here..."
                    placeholder="I wish for..."
                    input={input}
                    setInput={setInput}
                    saving={saving}
                    saved={saved}
                    saveResponse={saveResponse}
                  />
                )}

                {/* =========================
                    SILLY QUOTE
                ========================== */}
                {rewardType === "silly_quote" && (
                  <MessageReward
                    emoji="😂"
                    title="A Silly Little Quote"
                    message={
                      sillyQuotes[
                        Math.floor(
                          Math.random() * sillyQuotes.length,
                        )
                      ]
                    }
                  />
                )}

                {/* =========================
                    TINY MEMORY
                ========================== */}
                {rewardType === "tiny_memory" && (
                  <MessageReward
                    emoji="🧠"
                    title="A Tiny Memory"
                    message={
                      memories[
                        Math.floor(
                          Math.random() * memories.length,
                        )
                      ]
                    }
                  />
                )}

                {/* =========================
                    SECRET MESSAGE
                ========================== */}
                {rewardType === "secret_message" && (
                  <MessageReward
                    emoji="💖"
                    title="A Secret Message"
                    message={
                      secretMessages[
                        Math.floor(
                          Math.random() * secretMessages.length,
                        )
                      ]
                    }
                  />
                )}

                {/* =========================
                    FREE FAVOUR
                ========================== */}
                {rewardType === "free_favour" && (
                  <InputReward
                    emoji="🎁"
                    title="One Free Favour"
                    description="You've officially earned one favour. What shall it be?"
                    placeholder="I want you to..."
                    input={input}
                    setInput={setInput}
                    saving={saving}
                    saved={saved}
                    saveResponse={saveResponse}
                  />
                )}

                {/* CLOSE */}
                <button
                  onClick={closeReward}
                  className="
                    mt-7
                    rounded-full
                    border
                    border-white/20
                    px-6
                    py-2
                    text-sm
                    text-white/70
                    transition
                    hover:bg-white/10
                  "
                >
                  Close
                </button>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </Chapter>
  );
}


/* =====================================================
   HIDDEN PHOTO
===================================================== */

function HiddenPhoto() {
  return (
    <div>
      <div className="mb-4 text-5xl">
        📸
      </div>

      <p className="text-gold text-[11px] uppercase tracking-[0.25em]">
        You found it
      </p>

      <h2 className="font-script mt-2 text-3xl text-primary">
        A Hidden Photo
      </h2>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/20 shadow-xl">
        <img
          src="/birthday/hidden-photo.jpg"
          alt="A hidden memory"
          className="h-auto w-full object-cover"
        />
      </div>

      <p className="mt-4 text-sm text-white/60">
        A little memory, just for you. ❤️
      </p>
    </div>
  );
}


/* =====================================================
   TEXT MESSAGE REWARD
===================================================== */

function MessageReward({
  emoji,
  title,
  message,
}: {
  emoji: string;
  title: string;
  message: string;
}) {
  return (
    <div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 250,
        }}
        className="text-6xl"
      >
        {emoji}
      </motion.div>

      <p className="text-gold mt-5 text-[11px] uppercase tracking-[0.25em]">
        Your reward
      </p>

      <h2 className="font-script mt-2 text-3xl text-primary">
        {title}
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="
          mt-6
          rounded-2xl
          border
          border-white/20
          bg-white/5
          p-6
        "
      >
        <p className="text-lg leading-relaxed text-white/90">
          {message}
        </p>
      </motion.div>
    </div>
  );
}


/* =====================================================
   INPUT REWARD
===================================================== */

function InputReward({
  emoji,
  title,
  description,
  placeholder,
  input,
  setInput,
  saving,
  saved,
  saveResponse,
}: {
  emoji: string;
  title: string;
  description: string;
  placeholder: string;
  input: string;
  setInput: (value: string) => void;
  saving: boolean;
  saved: boolean;
  saveResponse: () => void;
}) {
  return (
    <div>
      <div className="text-5xl">
        {emoji}
      </div>

      <p className="text-gold mt-4 text-[11px] uppercase tracking-[0.25em]">
        You won
      </p>

      <h2 className="font-script mt-2 text-3xl text-primary">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-white/60">
        {description}
      </p>

      {!saved ? (
        <>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="
              mt-6
              w-full
              resize-none
              rounded-2xl
              border
              border-white/20
              bg-black/20
              p-4
              text-sm
              text-white
              outline-none
              placeholder:text-white/30
              focus:border-gold
            "
          />

          <button
            onClick={saveResponse}
            disabled={!input.trim() || saving}
            className="
              bg-festive
              mt-4
              w-full
              rounded-full
              px-6
              py-3
              font-semibold
              transition
              hover:scale-[1.02]
              disabled:opacity-50,
              cursor-pointer
            "
          >
            {saving ? "Saving..." : "Send it 💕"}
          </button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="
            mt-6
            rounded-2xl
            border
            border-green-400/20
            bg-green-400/10
            p-5
          "
        >
          <div className="text-3xl">💌</div>

          <p className="mt-2 font-semibold text-white">
            It's saved!
          </p>

          <p className="mt-1 text-sm text-white/60">
            Your message has been safely sent. ❤️
          </p>
        </motion.div>
      )}
    </div>
  );
}