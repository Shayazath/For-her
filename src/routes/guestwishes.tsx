import { createFileRoute } from "@tanstack/react-router";
import { GuestWishesShare } from "@/components/birthday/GuestWishesShare";
import { FloatingBalloons } from "@/components/birthday/effects";

export const Route = createFileRoute("/guestwishes")({
  head: () => ({
    meta: [
      { title: "Guest Wishes | Happy Birthday" },
      {
        name: "description",
        content: "Leave a birthday wish and see it appear on the wall instantly.",
      },
    ],
  }),
  component: GuestWishesPage,
});

function GuestWishesPage() {
  return (
    <main className="relative z-10 min-h-screen overflow-hidden pt-8">
      <FloatingBalloons count={6} />
      <GuestWishesShare />
    </main>
  );
}
