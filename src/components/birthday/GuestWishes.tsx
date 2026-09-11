import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send } from "lucide-react";
import { Chapter } from "./Chapter";
import { burstConfetti } from "./effects";

type Wish = { id: string; name: string; message: string; emoji: string };

const EMOJIS = ["🎉", "❤️", "🎂", "✨", "🥳", "🎈"];

const SEED: Wish[] = [
  { id: "w1", name: "Meera", message: "Happiest birthday! Save me a slice of cake.", emoji: "🎂" },
  { id: "w2", name: "Rahul", message: "Another year of being the loudest in the group. Love you.", emoji: "🥳" },
  { id: "w3", name: "Ananya", message: "Wishing you everything you keep wishing for others.", emoji: "✨" },
];

export function GuestWishes() {
  const [wishes, setWishes] = useState<Wish[]>(SEED);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState(EMOJIS[0]!);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setWishes((w) => [
      { id: crypto.randomUUID(), name: name.trim(), message: message.trim(), emoji },
      ...w,
    ]);
    setName("");
    setMessage("");
    burstConfetti(0.8);
  };

  return (
    <Chapter
      id="chapter-wishes"
      eyebrow="Everyone else"
      title="Guest Wishes"
      subtitle="Leave a note — it appears on the wall instantly."
    >
      <form onSubmit={submit} className="glass-card mx-auto mb-10 max-w-2xl p-6">
        <div className="grid gap-3 sm:grid-cols-[1fr_2fr_auto]">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-label="Your name"
            className="bg-secondary/60 placeholder:text-muted-foreground focus:ring-ring rounded-full border px-5 py-3 outline-none focus:ring-2"
          />
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your birthday wish"
            aria-label="Your birthday wish"
            className="bg-secondary/60 placeholder:text-muted-foreground focus:ring-ring rounded-full border px-5 py-3 outline-none focus:ring-2"
          />
          <button
            type="submit"
            className="bg-festive text-primary-foreground inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-transform hover:scale-105 active:scale-95"
          >
            <Send className="size-4" /> Send
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setEmoji(e)}
              className={`rounded-full border px-3 py-1.5 text-lg transition-colors ${
                emoji === e ? "border-primary bg-primary/20" : "bg-secondary/50"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </form>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {wishes.map((w, i) => (
            <motion.article
              key={w.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: i < 3 ? i * 0.06 : 0 }}
              whileHover={{ y: -6 }}
              className="glass-card p-6"
            >
              <span className="text-3xl">{w.emoji}</span>
              <p className="mt-3 text-base leading-relaxed">{w.message}</p>
              <p className="text-gold mt-4 text-[11px] tracking-[0.25em] uppercase">— {w.name}</p>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </Chapter>
  );
}
