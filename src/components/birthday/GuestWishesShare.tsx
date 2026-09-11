import { useState, type FormEvent } from "react";
import { Gift, Send, Sparkles, Mail } from "lucide-react";
import { Chapter } from "./Chapter";
import { burstConfetti } from "./effects";

import {
  GIFTS,
  isWishWallConfigured,
  publishGuestWish,
  type Gift as VirtualGift,
} from "@/lib/guest-wishes";

export function GuestWishesShare() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Currently selected sticker
  const [gift, setGift] = useState<VirtualGift>(GIFTS[0]!);

  // Show 6 stickers initially
  const [visibleGiftCount, setVisibleGiftCount] = useState(6);

  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  // --------------------------------------------------
  // SEND WISH
  // --------------------------------------------------

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !message.trim() || isSending) {
      return;
    }

    // Validate email only if the user entered one
    if (email.trim()) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        setFeedback(
          "Please enter a valid email address.",
        );
        return;
      }
    }

    setIsSending(true);
    setFeedback("");

    try {
      await publishGuestWish({
        name: name.trim(),
        email: email.trim() || undefined,
        message: message.trim(),
        gift,
      });

      // Clear form
      setName("");
      setEmail("");
      setMessage("");
      setGift(GIFTS[0]!);

      setFeedback(
        "Your wish is now part of the birthday wall. Thank you! ✨",
      );

      burstConfetti(0.9);
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Your wish could not be sent.",
      );
    } finally {
      setIsSending(false);
    }
  };

  // --------------------------------------------------
  // LOAD MORE STICKERS
  // --------------------------------------------------

  const loadMoreStickers = () => {
    setVisibleGiftCount((current) =>
      Math.min(current + 6, GIFTS.length),
    );
  };

  return (
    <Chapter
      id="chapter-wishes"
      eyebrow="A little love from everyone"
      title="Leave a wish Aaiyah wants to reread"
      subtitle="Write from the heart, then send a special sticker along with it."
    >
      <form
        onSubmit={submit}
        className="glass-card mx-auto max-w-3xl overflow-hidden p-1 shadow-[var(--shadow-card)]"
      >
        <div className="rounded-[calc(var(--radius)-4px)] bg-background/20 p-6 sm:p-9">

          {/* ==================================================
              HEADER
              ================================================== */}

          <div className="mb-7 flex items-center gap-3 text-gold">
            <span className="rounded-full bg-gold/15 p-3">
              <Sparkles className="size-5" />
            </span>

            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase">
                Your birthday letter
              </p>

              <p className="text-muted-foreground mt-1 text-sm">
                The best wishes have room for a real memory or a little hope.
              </p>
            </div>
          </div>

          {/* ==================================================
              NAME
              ================================================== */}

          <label className="block">
            <span className="text-sm font-medium">
              Your name
            </span>

            <input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              maxLength={80}
              required
              placeholder="How should they know you?"
              className="bg-secondary/45 placeholder:text-muted-foreground focus:ring-ring mt-2 w-full rounded-2xl border px-5 py-3.5 outline-none focus:ring-2"
            />
          </label>

          {/* ==================================================
              EMAIL - OPTIONAL
              ================================================== */}

          <label className="mt-5 block">
            <span className="text-sm font-medium">
              Your email{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </span>

            <div className="relative mt-2">
              <Mail className="text-muted-foreground absolute left-4 top-1/2 size-4 -translate-y-1/2" />

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                maxLength={254}
                placeholder="Your email, if you'd like a reply"
                className="bg-secondary/45 placeholder:text-muted-foreground focus:ring-ring w-full rounded-2xl border py-3.5 pl-11 pr-5 outline-none focus:ring-2"
              />
            </div>

            <p className="text-muted-foreground mt-2 text-xs">
              Optional — leave it empty if you don't want a reply.
            </p>
          </label>

          {/* ==================================================
              MESSAGE
              ================================================== */}

          <label className="mt-5 block">
            <span className="text-sm font-medium">
              Your wish
            </span>

            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              maxLength={1200}
              required
              rows={8}
              placeholder="Write a big, beautiful birthday wish — a favourite memory, a promise, or everything you hope this year brings..."
              className="bg-secondary/45 placeholder:text-muted-foreground focus:ring-ring mt-2 w-full resize-y rounded-2xl border px-5 py-4 leading-7 outline-none focus:ring-2"
            />

            <span className="text-muted-foreground mt-2 block text-right text-xs">
              {message.length}/1200
            </span>
          </label>

          {/* ==================================================
              STICKER SELECTION
              ================================================== */}

          <fieldset className="mt-6">
            <legend className="text-sm font-medium">
              Choose a sticker
            </legend>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {GIFTS
                .slice(0, visibleGiftCount)
                .map((item) => {
                  const selected =
                    gift.id === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setGift(item)
                      }
                      aria-pressed={selected}
                      className={`
                        group
                        relative
                        flex
                        min-h-[190px]
                        cursor-pointer
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        p-4
                        text-center
                        transition-all
                        hover:-translate-y-1
                        hover:scale-[1.02]

                        ${
                          selected
                            ? "border-gold bg-gold/15 shadow-[var(--shadow-gold)]"
                            : "bg-secondary/35 hover:bg-secondary/55"
                        }
                      `}
                    >
                      {/* SELECTED CHECK */}

                      {selected && (
                        <span className="absolute right-3 top-3 rounded-full bg-gold px-2 py-1 text-[10px] font-bold text-black">
                          ✓
                        </span>
                      )}

                      {/* STICKER */}

                      <img
                        src={item.sticker}
                        alt={item.label}
                        loading="lazy"
                        className="h-28 w-28 object-contain transition-transform duration-300 group-hover:scale-110"
                      />

                      {/* LABEL */}

                      <span className="mt-2 block text-sm font-semibold">
                        {item.label}
                      </span>

                      {/* NOTE */}

                      <span className="text-muted-foreground mt-1 block text-xs leading-5">
                        {item.note}
                      </span>
                    </button>
                  );
                })}
            </div>

            {/* ==================================================
                LOAD MORE
                ================================================== */}

            {visibleGiftCount < GIFTS.length && (
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={loadMoreStickers}
                  className="cursor-pointer rounded-full border border-gold/40 bg-gold/10 px-6 py-2.5 text-sm font-medium text-gold transition-all hover:-translate-y-0.5 hover:bg-gold/20 hover:shadow-[var(--shadow-gold)]"
                >
                  Load more stickers
                </button>
              </div>
            )}

            {/* STICKER COUNT */}

            <p className="text-muted-foreground mt-3 text-center text-xs">
              Showing{" "}
              {Math.min(
                visibleGiftCount,
                GIFTS.length,
              )}{" "}
              of {GIFTS.length} stickers
            </p>
          </fieldset>

          {/* ==================================================
              FEEDBACK
              ================================================== */}

          {feedback && (
            <p
              className={`mt-4 text-center text-sm ${
                feedback.includes("could not") ||
                feedback.includes("valid") ||
                feedback.includes("error")
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
              role="status"
            >
              {feedback}
            </p>
          )}

          {/* ==================================================
              FOOTER
              ================================================== */}

          <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

            <p className="text-muted-foreground text-sm">
              {isWishWallConfigured
                ? email.trim()
                  ? "They can reply to you by email."
                  : "Your email is optional."
                : "The shared wall is being connected."}
            </p>

            {/* SEND BUTTON */}

            <button
              type="submit"
              disabled={
                isSending ||
                !isWishWallConfigured
              }
              className="bg-festive text-primary-foreground inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Gift className="size-4" />

              {isSending
                ? "Sending..."
                : "Send wish & sticker"}

              <Send className="size-4" />
            </button>
          </div>
        </div>
      </form>
    </Chapter>
  );
}