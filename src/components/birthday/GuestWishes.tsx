import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, X, Mail } from "lucide-react";

import { Chapter } from "./Chapter";

import { loadGuestWishes, replyToWish, type GuestWish } from "./../../lib/guest-wishes";

export function GuestWishes() {
  // ==================================================
  // WISHES
  // ==================================================

  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==================================================
  // SELECTED WISH
  // ==================================================

  const [selectedWish, setSelectedWish] = useState<GuestWish | null>(null);

  // ==================================================
  // REPLY
  // ==================================================

  const [reply, setReply] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [replyFeedback, setReplyFeedback] = useState("");

  // ==================================================
  // LOAD WISHES
  // ==================================================

  useEffect(() => {
    async function loadWishes() {
      try {
        setLoading(true);
        setError("");

        const data = await loadGuestWishes();

        setWishes(data);
      } catch (err) {
        console.error(err);

        setError("Could not load birthday wishes.");
      } finally {
        setLoading(false);
      }
    }

    loadWishes();
  }, []);

  // ==================================================
  // ESC TO CLOSE POPUP
  // ==================================================

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedWish(null);
      }
    }

    if (selectedWish) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedWish]);

  // ==================================================
  // RESET REPLY WHEN OPENING A NEW WISH
  // ==================================================

  useEffect(() => {
    setReply("");
    setReplyFeedback("");
  }, [selectedWish]);

  // ==================================================
  // SEND REPLY
  // ==================================================

  const submitReply = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedWish || !selectedWish.senderEmail || !reply.trim() || sendingReply) {
      return;
    }

    try {
      setSendingReply(true);
      setReplyFeedback("");

      await replyToWish({
        wishId: selectedWish.id,
        reply: reply.trim(),
        senderEmail: selectedWish.senderEmail,
        senderName: selectedWish.name,
        originalMessage: selectedWish.message,
      });

      setReply("");

      setReplyFeedback("Your reply has been sent successfully! 💌");
    } catch (error) {
      console.error(error);

      setReplyFeedback(error instanceof Error ? error.message : "Could not send your reply.");
    } finally {
      setSendingReply(false);
    }
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <Chapter
      id="chapter-wishes"
      eyebrow="Everyone else"
      title="Birthday Wishes"
      subtitle="See all the beautiful wishes people have left."
    >
      {/* ==================================================
          ERROR
          ================================================== */}

      {error && (
        <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {/* ==================================================
          LOADING
          ================================================== */}

      {loading ? (
        <div className="py-16 text-center">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="mx-auto mb-4 text-3xl"
          >
            💌
          </motion.div>

          <p className="text-muted-foreground">Loading birthday wishes...</p>
        </div>
      ) : wishes.length === 0 ? (
        /* ==================================================
           EMPTY STATE
           ================================================== */

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="py-16 text-center"
        >
          <div className="mb-4 text-5xl">💌</div>

          <p className="text-muted-foreground">No wishes yet.</p>

          <p className="text-muted-foreground mt-1 text-sm">
            Birthday wishes from everyone will appear here.
          </p>
        </motion.div>
      ) : (
        /* ==================================================
           WISH CARDS
           ================================================== */

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {wishes.map((wish, i) => (
              <motion.article
                key={wish.id}
                layout
                initial={{
                  opacity: 0,
                  y: 30,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.5,
                  delay: i < 3 ? i * 0.06 : 0,
                }}
                whileHover={{
                  y: -6,
                }}
                className="glass-card flex h-[340px] flex-col p-6"
              >
                {/* ==================================================
                    STICKER + DATE
                    ================================================== */}

                <div className="flex items-start justify-between">
                  <img
                    src={wish.gift.sticker}
                    alt={wish.gift.label}
                    className="h-20 w-20 object-contain"
                  />

                  <span className="text-muted-foreground text-xs">
                    {new Date(wish.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* ==================================================
                    WISH PREVIEW
                    ================================================== */}

                <p className="mt-4 line-clamp-4 text-base leading-relaxed">{wish.message}</p>

                {/* ==================================================
                    CARD FOOTER
                    ================================================== */}

                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedWish(wish)}
                    className="text-gold cursor-pointer text-sm font-medium transition-all hover:translate-x-1 hover:opacity-80"
                  >
                    Read more →
                  </button>

                  <p className="text-gold mt-3 text-xs">{wish.gift.label}</p>

                  <p className="text-gold mt-2 text-[11px] tracking-[0.25em] uppercase">
                    — {wish.name}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ======================================================
          FULL WISH POPUP
          ====================================================== */}

      <AnimatePresence>
        {selectedWish && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5 backdrop-blur-md"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelectedWish(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Birthday wish"
              initial={{
                opacity: 0,
                scale: 0.75,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
                y: 40,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              onClick={(event) => event.stopPropagation()}
              className="glass-card relative w-full max-w-2xl overflow-hidden rounded-3xl p-8 shadow-2xl"
            >
              {/* ==================================================
                  DECORATIVE GLOW
                  ================================================== */}

              <div className="pointer-events-none absolute -left-20 -top-20 size-40 rounded-full bg-pink-500/20 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-20 -right-20 size-40 rounded-full bg-purple-500/20 blur-3xl" />

              {/* ==================================================
                  CLOSE BUTTON
                  ================================================== */}

              <button
                type="button"
                onClick={() => setSelectedWish(null)}
                aria-label="Close birthday wish"
                className="absolute right-5 top-5 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full border bg-secondary/50 transition-all hover:scale-110 hover:bg-secondary"
              >
                <X className="size-4" />
              </button>

              {/* ==================================================
                  STICKER
                  ================================================== */}

              <motion.div
                initial={{
                  scale: 0,
                  rotate: -20,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 300,
                }}
                className="relative mb-5 flex justify-center"
              >
                <img
                  src={selectedWish.gift.sticker}
                  alt={selectedWish.gift.label}
                  className="h-36 w-36 object-contain"
                />
              </motion.div>

              {/* ==================================================
                  TITLE
                  ================================================== */}

              <p className="text-gold relative mb-2 text-center text-xs tracking-[0.3em] uppercase">
                A Birthday Wish
              </p>

              <h3 className="relative mb-6 text-center text-2xl font-semibold">For Aaliyah 💖</h3>

              {/* ==================================================
                  FULL MESSAGE
                  ================================================== */}

              <div className="relative mx-auto max-w-xl px-2">
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
                  {/* Decorative quote */}
                  <div className="pointer-events-none absolute -left-2 -top-4 text-5xl leading-none opacity-20">
                    “
                  </div>

                  <div className="pointer-events-none absolute -bottom-8 -right-2 text-5xl leading-none opacity-20">
                    ”
                  </div>

                  <p
                    className="
                      max-h-[260px]
                      overflow-y-auto
                      text-center
                      text-lg
                      leading-relaxed
                      whitespace-pre-wrap
                      break-words
                      pr-3
                      birthday-scrollbar
                    "
                  >
                    {selectedWish.message}
                  </p>
                </div>
              </div>

              {/* ==================================================
                  STICKER INFO
                  ================================================== */}

              <div className="relative mt-7 text-center">
                <p className="text-gold text-sm font-medium">{selectedWish.gift.label}</p>

                <p className="text-muted-foreground mt-1 text-xs">{selectedWish.gift.note}</p>
              </div>

              {/* ==================================================
                  SENDER
                  ================================================== */}

              <div className="relative mt-6 text-center">
                <p className="text-gold text-sm tracking-[0.2em] uppercase">
                  — {selectedWish.name}
                </p>

                <p className="text-muted-foreground mt-2 text-xs">
                  {new Date(selectedWish.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* ==================================================
                  REPLY SECTION
                  ================================================== */}

              <div className="relative mt-8 border-t pt-7">
                {/* ==================================================
                    IF SENDER PROVIDED EMAIL
                    ================================================== */}

                {selectedWish.senderEmail ? (
                  <>
                    <div className="mb-4 text-center">
                      <p className="text-sm font-semibold">Want to reply?</p>

                      <p className="text-muted-foreground mt-1 text-xs">
                        Send a message back to the person who left this wish.
                      </p>
                    </div>

                    {/* ==================================================
                        REPLY FORM
                        ================================================== */}

                    <form onSubmit={submitReply} className="space-y-3">
                      <textarea
                        value={reply}
                        onChange={(event) => setReply(event.target.value)}
                        maxLength={1000}
                        rows={4}
                        required
                        placeholder="Write your reply..."
                        className="bg-secondary/45 placeholder:text-muted-foreground focus:ring-ring w-full resize-none rounded-2xl border px-5 py-4 outline-none focus:ring-2"
                      />

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-muted-foreground text-xs">{reply.length}/1000</span>

                        <button
                          type="submit"
                          disabled={sendingReply || !reply.trim()}
                          className="bg-festive text-primary-foreground inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Send className="size-4" />

                          {sendingReply ? "Sending..." : "Send reply"}
                        </button>
                      </div>
                    </form>

                    {/* ==================================================
                        REPLY FEEDBACK
                        ================================================== */}

                    {replyFeedback && (
                      <div
                        className={`
                          mt-4
                          rounded-2xl
                          border
                          p-4
                          text-center
                          text-sm
                          ${
                            replyFeedback.includes("successfully")
                              ? "border-green-500/30 bg-green-500/10 text-green-400"
                              : "border-red-500/30 bg-red-500/10 text-red-400"
                          }
                        `}
                      >
                        {replyFeedback}
                      </div>
                    )}
                  </>
                ) : (
                  /* ==================================================
                     IF SENDER DID NOT PROVIDE EMAIL
                     ================================================== */

                  <div className="rounded-2xl border border-gold/20 bg-gold/5 p-5 text-center">
                    <Mail className="text-gold mx-auto mb-2 size-5" />

                    <p className="text-sm font-medium">No email address provided</p>

                    <p className="text-muted-foreground mt-2 text-xs leading-5">
                      This person didn't provide an email address, so you can't reply to them
                      directly. Please contact them through social media or another way you know to
                      reach them.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Chapter>
  );
}
