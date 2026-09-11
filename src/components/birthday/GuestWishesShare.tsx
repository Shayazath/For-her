import { useState, type FormEvent } from "react";
import { Gift, Send, Sparkles } from "lucide-react";
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
  const [message, setMessage] = useState("");
  const [gift, setGift] = useState<VirtualGift>(GIFTS[0]);
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !message.trim() || isSending) return;
    setIsSending(true);
    setFeedback("");
    try {
      await publishGuestWish({ name: name.trim(), message: message.trim(), gift });
      setName("");
      setMessage("");
      setGift(GIFTS[0]);
      setFeedback("Your wish is now part of the birthday wall. Thank you! ✨");
      burstConfetti(0.9);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Your wish could not be sent.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Chapter
      id="chapter-wishes"
      eyebrow="A little love from everyone"
      title="Leave a wish aaiyah wants to reread"
      subtitle="Write from the heart, then send a tiny virtual gift along with it."
    >
      <form
        onSubmit={submit}
        className="glass-card mx-auto max-w-3xl overflow-hidden p-1 shadow-[var(--shadow-card)]"
      >
        <div className="rounded-[calc(var(--radius)-4px)] bg-background/20 p-6 sm:p-9">
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

          <label className="block">
            <span className="text-sm font-medium">Your name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={80}
              required
              placeholder="How should they know you?"
              className="bg-secondary/45 placeholder:text-muted-foreground focus:ring-ring mt-2 w-full rounded-2xl border px-5 py-3.5 outline-none focus:ring-2"
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-medium">Your wish</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
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

          <fieldset className="mt-4">
            <legend className="text-sm font-medium">Choose a virtual gift</legend>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {GIFTS.map((item) => {
                const selected = gift.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGift(item)}
                    aria-pressed={selected}
                    className={`rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ${selected ? "border-gold bg-gold/15 shadow-[var(--shadow-gold)]" : "bg-secondary/35 hover:bg-secondary/55"}`}
                  >
                    <span className="text-3xl" aria-hidden="true">
                      {item.emoji}
                    </span>
                    <span className="mt-2 block text-sm font-semibold">{item.label}</span>
                    <span className="text-muted-foreground mt-1 block text-xs leading-5">
                      {item.note}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p
              className={`text-sm ${feedback.includes("could not") || feedback.includes("set up") ? "text-destructive" : "text-muted-foreground"}`}
              role="status"
            >
              {feedback ||
                (isWishWallConfigured
                  ? "Your note will appear on the shared wall."
                  : "The shared wall is being connected.")}
            </p>
            <button
              type="submit"
              disabled={isSending || !isWishWallConfigured}
              className="bg-festive text-primary-foreground inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Gift className="size-4" /> {isSending ? "Sending..." : "Send wish & gift"}{" "}
              <Send className="size-4" />
            </button>
          </div>
        </div>
      </form>
    </Chapter>
  );
}
