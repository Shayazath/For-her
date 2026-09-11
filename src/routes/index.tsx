import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { celebrant } from "@/data/birthday";
import { FloatingBalloons } from "@/components/birthday/effects";
import { ProgressProvider } from "@/components/birthday/progress";
import { MusicPlayer } from "@/components/birthday/MusicPlayer";
import { StepFlow } from "@/components/birthday/StepFlow";

const title = `Happy Birthday, ${celebrant.name} — An Interactive Surprise`;
const description = `A cinematic birthday journey for ${celebrant.name}: memories, games, cake cutting, hidden gifts and one last surprise.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [started, setStarted] = useState(false);

  return (
    <ProgressProvider>
      <FloatingBalloons count={9} />
      <MusicPlayer autoStart={started} />

      <main className="relative z-10">
        <h1 className="sr-only">
          Happy Birthday {celebrant.name} — an interactive birthday surprise
        </h1>
        <StepFlow onStart={() => setStarted(true)} />
      </main>
    </ProgressProvider>
  );
}
