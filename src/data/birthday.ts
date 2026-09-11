import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";

/**
 * Everything personal lives here — swap the name, photos, wishes,
 * quiz answers and the final video URL and the whole site updates.
 */
export const celebrant = {
  name: "Aaliyah",
  greeting: "Happy Birthday",
  subtitle: "A little journey I built just for you",
  closing: "Thank You For Being The Best Part Of My Life",
  videoUrl: "",
};

export type Memory = {
  id: string;
  src: string;
  width: number;
  height: number;
  date: string;
  title: string;
  caption: string;
};

export const memories: Memory[] = [
  {
    id: "m1",
    src: memory1,
    width: 900,
    height: 1200,
    date: "March 2021",
    title: "The first laugh",
    caption: "The day I learned your laugh is my favourite sound.",
  },
  {
    id: "m2",
    src: memory2,
    width: 1200,
    height: 900,
    date: "July 2022",
    title: "Rooftop lights",
    caption: "We stayed up talking until the city went quiet.",
  },
  {
    id: "m3",
    src: memory3,
    width: 900,
    height: 900,
    date: "December 2022",
    title: "Tiny surprises",
    caption: "You always act surprised, even when you guessed it.",
  },
  {
    id: "m4",
    src: memory4,
    width: 1200,
    height: 800,
    date: "May 2023",
    title: "That sunset",
    caption: "Pink skies and no plans — still the best day.",
  },
  {
    id: "m5",
    src: memory5,
    width: 900,
    height: 1200,
    date: "August 2024",
    title: "Cake o'clock",
    caption: "One candle for every reason I'm grateful for you.",
  },
  {
    id: "m6",
    src: memory6,
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
];

export const loveNotes = [
  {
    front: "You make ordinary days feel like festivals.",
    back: "And this year I plan to celebrate every single one with you.",
  },
  {
    front: "Your kindness is unfairly unlimited.",
    back: "I hope the world gives it all back to you today.",
  },
  {
    front: "Some people are sunshine. You're the whole sky.",
    back: "Never dim it for anybody.",
  },
  {
    front: "Thank you for every 2 AM conversation.",
    back: "I still remember all of them.",
  },
];

export const gifts = [
  {
    title: "A promise",
    message: "This year, every plan we joked about — we actually do it.",
    quote: "Warning: contains excessive spontaneity.",
  },
  {
    title: "A memory",
    message: "Remember the day everything went wrong and we laughed anyway?",
    quote: "Certified disaster, five stars, would repeat.",
  },
  {
    title: "A wish",
    message: "May you get everything you're too humble to ask for.",
    quote: "Also: unlimited dessert.",
  },
  {
    title: "A secret",
    message: "I've been planning this surprise for weeks. Badly hiding it too.",
    quote: "You definitely noticed. You said nothing. Legend.",
  },
];

export const quiz = [
  {
    question: "Where did we take the very first photo together?",
    options: ["A rooftop", "The park at golden hour", "A café", "A bus stop"],
    answer: 1,
  },
  {
    question: "What do I always say when you say \"just five more minutes\"?",
    options: ["\"Sure.\"", "\"You said that an hour ago.\"", "Nothing", "\"Timer started.\""],
    answer: 1,
  },
  {
    question: "Our unofficial anthem is a song about…",
    options: ["Summer", "Staying up late", "Going home", "Dancing badly"],
    answer: 3,
  },
];

export const wheelSlices = [
  "A hidden photo",
  "A birthday wish",
  "A silly quote",
  "A tiny memory",
  "A secret message",
  "One free favour",
];

export const scratchWish =
  "May this year be the softest, brightest, luckiest one yet. I'm so glad you exist.";

export const treasureClues = [
  {
    clue: "I hold the light you blow away. Find me before the sweetness.",
    answer: "candle",
    hint: "It sits on the cake.",
  },
  {
    clue: "I float, I pop, and I hide your memories.",
    answer: "balloon",
    hint: "You popped a few already.",
  },
  {
    clue: "I explode in colour but never hurt a soul.",
    answer: "confetti",
    hint: "It's raining it all over this page.",
  },
];
