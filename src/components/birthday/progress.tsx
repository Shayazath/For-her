import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type TaskId =
  | "cake"
  | "gifts"
  | "balloons"
  | "puzzle"
  | "scratch"
  | "wheel"
  | "quiz"
  | "treasure"
  | "final";

export const GAME_TASKS: TaskId[] = ["balloons", "puzzle", "scratch", "wheel", "quiz"];
export const ALL_TASKS: TaskId[] = [...GAME_TASKS, "cake", "gifts", "treasure"];

type Ctx = {
  done: Record<string, boolean>;
  complete: (id: TaskId) => void;
  isDone: (id: TaskId) => boolean;
  gamesDone: number;
  secretUnlocked: boolean;
  finaleUnlocked: boolean;
};

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState<Record<string, boolean>>({});

  const complete = useCallback((id: TaskId) => {
    setDone((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  const value = useMemo<Ctx>(() => {
    const gamesDone = GAME_TASKS.filter((t) => done[t]).length;
    return {
      done,
      complete,
      isDone: (id: TaskId) => Boolean(done[id]),
      gamesDone,
      secretUnlocked: gamesDone >= 3 && Boolean(done['treasure']),
      finaleUnlocked: ALL_TASKS.every((t) => done[t]),
    };
  }, [done, complete]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
