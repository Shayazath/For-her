import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  Gift,
  Send,
  Sparkles,
  Mail,
} from "lucide-react";

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
  const [gift, setGift] =
    useState<VirtualGift>(GIFTS[0]!);

  // Show 6 stickers initially
  const [visibleGiftCount, setVisibleGiftCount] =
    useState(6);

  const [isSending, setIsSending] =
    useState(false);

  const [feedback, setFeedback] =
    useState("");

  // --------------------------------------------------
  // BIRTHDAY COUNTDOWN
  // --------------------------------------------------
  //
  // September 18, 2026
  // 12:00 AM IST
  //
  // IST = UTC + 5:30
  // Therefore:
  // September 17, 2026
  // 6:30 PM UTC
  // --------------------------------------------------

  const BIRTHDAY_DATE =
    new Date(
      "2026-09-17T18:30:00Z",
    ).getTime();

  const getTimeLeft = () => {
    const difference =
      BIRTHDAY_DATE - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      };
    }

    return {
      days: Math.floor(
        difference /
          (1000 * 60 * 60 * 24),
      ),

      hours: Math.floor(
        (difference /
          (1000 * 60 * 60)) %
          24,
      ),

      minutes: Math.floor(
        (difference /
          (1000 * 60)) %
          60,
      ),

      seconds: Math.floor(
        (difference / 1000) %
          60,
      ),

      expired: false,
    };
  };

  const [timeLeft, setTimeLeft] =
    useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // --------------------------------------------------
  // SEND WISH
  // --------------------------------------------------

  const submit = async (
    event: FormEvent,
  ) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !message.trim() ||
      isSending
    ) {
      return;
    }

    // Validate email only if the user entered one
    if (email.trim()) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailRegex.test(
          email.trim(),
        )
      ) {
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
        email: email.trim() || "",
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
    setVisibleGiftCount(
      (current) =>
        Math.min(
          current + 6,
          GIFTS.length,
        ),
    );
  };

  return (
    <Chapter
      id="chapter-wishes"
      eyebrow="A little love from everyone"
      title="Leave a wish for our cutest Aaliyah wants to reread"
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
                setName(
                  event.target.value,
                )
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
                  setEmail(
                    event.target.value,
                  )
                }
                maxLength={254}
                placeholder="Your email, if you'd like a reply"
                className="bg-secondary/45 placeholder:text-muted-foreground focus:ring-ring w-full rounded-2xl border py-3.5 pl-11 pr-5 outline-none focus:ring-2"
              />
            </div>

            <p className="text-muted-foreground mt-2 text-xs">
              Optional — leave your email if you'd like Aaliyah to reply to you.
            </p>
          </label>

          {/* ==================================================
              BIRTHDAY DELIVERY COUNTDOWN
              ================================================== */}

          {!timeLeft.expired ? (
            <div className="relative mt-5 overflow-hidden rounded-2xl border border-gold/30 bg-gold/5 p-4 sm:p-5">

              {/* Animated background glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gold/10 blur-3xl animate-pulse" />

              <div className="pointer-events-none absolute -bottom-10 -left-10 size-32 rounded-full bg-gold/10 blur-3xl animate-pulse" />

              <div className="relative">

                {/* Header */}
                <div className="flex items-center gap-3">

                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/15">
                    <span className="animate-pulse text-xl">
                      💌
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gold sm:text-base">
                      Your wish is on its way to Aaliyah
                    </p>

                    <p className="text-muted-foreground mt-0.5 text-xs">
                      We're collecting all the birthday wishes for her special night.
                    </p>
                  </div>

                </div>

                {/* Countdown */}
                <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">

                  {/* DAYS */}
                  <div className="rounded-xl border border-gold/20 bg-background/40 px-2 py-3 text-center backdrop-blur-sm">
                    <div className="text-xl font-bold tabular-nums text-gold sm:text-2xl">
                      {String(
                        timeLeft.days,
                      ).padStart(2, "0")}
                    </div>

                    <div className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[10px]">
                      Days
                    </div>
                  </div>

                  {/* HOURS */}
                  <div className="rounded-xl border border-gold/20 bg-background/40 px-2 py-3 text-center backdrop-blur-sm">
                    <div className="text-xl font-bold tabular-nums text-gold sm:text-2xl">
                      {String(
                        timeLeft.hours,
                      ).padStart(2, "0")}
                    </div>

                    <div className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[10px]">
                      Hours
                    </div>
                  </div>

                  {/* MINUTES */}
                  <div className="rounded-xl border border-gold/20 bg-background/40 px-2 py-3 text-center backdrop-blur-sm">
                    <div className="text-xl font-bold tabular-nums text-gold sm:text-2xl">
                      {String(
                        timeLeft.minutes,
                      ).padStart(2, "0")}
                    </div>

                    <div className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[10px]">
                      Min
                    </div>
                  </div>

                  {/* SECONDS */}
                  <div className="rounded-xl border border-gold/30 bg-gold/10 px-2 py-3 text-center shadow-[var(--shadow-gold)]">
                    <div className="text-xl font-bold tabular-nums text-gold animate-pulse sm:text-2xl">
                      {String(
                        timeLeft.seconds,
                      ).padStart(2, "0")}
                    </div>

                    <div className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-gold sm:text-[10px]">
                      Sec
                    </div>
                  </div>

                </div>

                {/* Delivery message */}
                <div className="mt-4 flex items-center justify-center gap-1.5 text-center">

                  <span className="animate-pulse text-sm">
                    ✨
                  </span>

                  <p className="text-xs text-muted-foreground">
                    She'll receive these wishes on{" "}
                    <span className="font-semibold text-gold">
                      September 18 at midnight
                    </span>
                  </p>

                  <span className="animate-pulse text-sm">
                    ✨
                  </span>

                </div>

              </div>
            </div>
          ) : (
            /* ==================================================
               AFTER COUNTDOWN
               ================================================== */

            <div className="relative mt-5 overflow-hidden rounded-2xl border border-gold/40 bg-gold/10 p-5 text-center">

              <div className="pointer-events-none absolute inset-0 bg-gold/5 animate-pulse" />

              <div className="relative">

                <div className="text-3xl animate-bounce">
                  💌✨
                </div>

                <p className="mt-2 text-sm font-bold text-gold sm:text-base">
                  Your wish will reach Aaliyah instantly!
                </p>

                <p className="text-muted-foreground mt-1 text-xs">
                  New birthday wishes are now delivered directly to her.
                </p>

              </div>
            </div>
          )}

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
                setMessage(
                  event.target.value,
                )
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
                .slice(
                  0,
                  visibleGiftCount,
                )
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
                      aria-pressed={
                        selected
                      }
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

            {visibleGiftCount <
              GIFTS.length && (
              <div className="mt-5 flex justify-center">

                <button
                  type="button"
                  onClick={
                    loadMoreStickers
                  }
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
                feedback.includes(
                  "could not",
                ) ||
                feedback.includes(
                  "valid",
                ) ||
                feedback.includes(
                  "error",
                )
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
                  ? "Aaliyah can reply to you by email."
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