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
  videoUrl: "https://github.com/Shayazath/For-her/releases/download/birthday-video-v1/km_20260917_1080p_30f_20260917_221828.mp4",
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
export type memoriessliddeshow = {
  id: string;
  src: string;
  width: number;
  height: number;
  date: string;
  title: string;
  caption: string;
};
export type timeline = {
  id: string;
  src: string;
  width: number;
  height: number;
  date: string;
  title: string;
  caption: string;
};
export type secretgallist = {
  id: string;
  src: string;
  width: number;
  height: number;
  date: string;
  title: string;
  caption: string;
};

export type giftlist = {
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
    src: '/meetups/mem1.jpg',
    width: 900,
    height: 1200,
    date: "SEP 2026",
    title: "Me shy",
    caption: "The day I admired you and realized how much I loved you.",
  },
  {
    id: "m2",
    src: '/meetups/mem2.png',
    width: 1200,
    height: 900,
    date: "SEP 2026",
    title: "Close up view",
    caption: "The view I wanted to remember forever.",
  },
  {
    id: "m3",
    src: '/meetups/mem3.png',
    width: 900,
    height: 900,
    date: "SEP 2026",
    title: "Cuteness Overloaded",
    caption: "Cute for no reason.",
  },
  {
    id: "m4",
    src: '/meetups/mem4.png',
    width: 1200,
    height: 800,
    date: "SEP 2026",
    title: "Sleepy us",
    caption: "We stayed up talking until the city went quiet.",
  },
  {
    id: "m5",
    src: '/meetups/mem5.png',
    width: 900,
    height: 1200,
    date: "SEP 2026",
    title: "The Eyes",
    caption: "Where I wanna live for rest of my life.",
  },
  {
    id: "m6",
    src: '/meetups/mem6.png',
    width: 1200,
    height: 900,
    date: "SEP 2026",
    title: "The Cute Bag Seller",
    caption: "laughed so hard here I cried.",
  },
   {
    id: "m7",
    src: '/meetups/mem7.jpg',
    width: 1200,
    height: 900,
    date: "SEP 2026",
    title: "Family Meetup",
    caption: "The three idiotic creature in single frame.",
  },
  {
    id: "m8",
    src: '/meetups/mem8.png',
    width: 1200,
    height: 900,
    date: "SEP 2026",
    title: "uffffffffff",
    caption: "The place where I Can stay forever.",
  },
  {
    id: "m9",
    src: '/meetups/mem9.png',
    width: 1200,
    height: 900,
    date: "SEP 2026",
    title: "My Favourite Smile",
    caption: "That smile has no idea how many times it has completely ruined my ability to stay serious.",
  },
  {
    id: "m10",
    src: '/meetups/mem10.png',
    width: 1200,
    height: 900,
    date: "SEP 2026",
    title: "The Gublu",
    caption: "Gublu taking my place for so long.",
  },
  {
    id: "m11",
    src: '/meetups/mem11.jpg',
    width: 1200,
    height: 900,
    date: "SEP 2026",
    title: "Our First Facetime",
    caption: "I felt very happy that day with you.",
  },
  {
    id: "m12",
    src: '/meetups/mem12.jpg',
    width: 1200,
    height: 900,
    date: "SEP 2026",
    title: "Stunned",
    caption: "Stunned by your beauty.",
  },
  {
    id: "m13",
    src: '/meetups/mem13.png',
    width: 1200,
    height: 900,
    date: "SEP 2026",
    title: "Bakchodi forever",
    caption: "I love whatever is wrong with you.",
  },
  {
    id: "m14",
    src: '/meetups/mem14.png',
    width: 1200,
    height: 900,
    date: "SEP 2026",
    title: "Blur view!",
    caption: "Sab dundhla sab dundhla laage... Tujhpe hee focus hai.",
  }
];

export const memoriesslide: memoriessliddeshow[] = [
  {
    id: "m1",
    src: '/slideshowus/ss1.jpg',
    width: 900,
    height: 1200,
    date: "Sep 2026",
    title: "Perfect closeups?",
    caption: "This widgatable helps me alot to remember you every second.",
  },
  {
    id: "m2",
    src: '/slideshowus/ss2.png',
    width: 1200,
    height: 900,
    date: "July 2022",
    title: "Cute You",
    caption: "Casuals! still stunning.",
  },
  {
    id: "m3",
    src: '/slideshowus/ss3.jpg',
    width: 900,
    height: 900,
    date: "December 2022",
    title: "Wait for next one",
    caption: "Wait for next one.",
  },
  {
    id: "m4",
    src: '/slideshowus/ss4.jpg',
    width: 1200,
    height: 800,
    date: "May 2023",
    title: "Written",
    caption: "God written for REAL.",
  },
  {
    id: "m5",
    src: '/slideshowus/ss5.jpg',
    width: 900,
    height: 1200,
    date: "August 2024",
    title: "The Notes",
    caption: "Where I expressed my love for you.",
  },
  {
    id: "m6",
    src: '/slideshowus/ss6.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "The laugh",
    caption: "You not just making me love you also making me laugh.",
  },
  {
    id: "m7",
    src: '/slideshowus/ss7.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "The another personalities of us",
    caption: "Stuffer X Aayrah.",
  },
  {
    id: "m8",
    src: '/slideshowus/ss8.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Roasting you",
    caption: "Roasting is my fav love language because of you.",
  },
  {
    id: "m9",
    src: '/slideshowus/ss9.jpg',
    width: 1200,
    height: 900,
    date: "Today",
   title: "The threaten",
    caption: "You can just threaten me without threatening me.",
  },
  {
    id: "m10",
    src: '/slideshowus/ss10.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Wait for the next one",
    caption: "Wait for the next one.",
   
  },
  {
    id: "m11",
    src: '/slideshowus/ss11.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "The heart",
    caption: "The heart I got from both the personalities of you.",
  },
  {
    id: "m12",
    src: '/slideshowus/ss12.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Slayyyyyyyyyyy",
    caption: "The next meme is my litreal first reaction.",
  },
  {
    id: "m13",
    src: '/slideshowus/ss13.png',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Curvesssss",
    caption: "ufffffffffffffffff.",
  },
  {
    id: "m14",
    src: '/slideshowus/ss14.jpeg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Salutes",
    caption: "For being this gorgeous.",
  },
];
export const timellineslide: timeline[] = [
  {
    id: "m1",
    src: '/timeline/tl1.png',
    width: 900,
    height: 1200,
    date: "Sep 2024",
    title: "The first text that brought us together",
    caption: "The day god decided something.",
  },
  {
    id: "m2",
    src: '/timeline/tl2.png',
    width: 1200,
    height: 900,
    date: "Dec 2024",
    title: "Felt butterflies inside stomach",
    caption: "The moment my heart skipped a beat and my stomach filled with butterflies. 🦋❤️",
  },
  {
    id: "m3",
    src: '/timeline/tl3.png',
    width: 900,
    height: 900,
    date: "Jun 2026",
    title: "A little possessive over you. ❤️",
    caption: "The moment I started feeling possessive about the little things that mattered to us. ❤️",
  },
  {
    id: "m4",
    src: '/timeline/tl4.png',
    width: 1200,
    height: 800,
    date: "Jul 2026",
    title: "Flimyyyyyyyy us",
    caption: "The moment I felt this is gonna work out ❤️",
  },
  {
    id: "m5",
    src: '/timeline/tl5.png',
    width: 900,
    height: 1200,
    date: "August 2026",
    title: "Never had the guts",
    caption: "I’d never have the guts to threaten you. ❤️",
  },
  {
    id: "m6",
    src: '/timeline/tl6.png',
    width: 1200,
    height: 900,
    date: "August 2026",
    title: "Rizzzzzzy me",
    caption: "The bakchodi I only love to do with you",
  },
  {
    id: "m7",
    src: '/timeline/tl7.png',
    width: 1200,
    height: 900,
    date: "August 2026",
    title: "yk HOW",
    caption: "you really know how to make me SHUT",
  },
  {
    id: "m8",
    src: '/timeline/tl8.png',
    width: 1200,
    height: 900,
    date: "August 2026",
    title: "I love you",
    caption: "The untold love.",
  }
];

export const secretgal: secretgallist[] = [
  {
    id: "m1",
    src: '/prettyface/sg1.png',
    width: 1200,
    height: 900,
    date: "Sep 2024",
    title: "The first text that brought us together",
    caption: "The day god decided something.",
  },
  {
    id: "m2",
    src: '/prettyface/sg2.jpg',
    width: 1200,
    height: 900,
    date: "Dec 2024",
    title: "Felt butterflies inside stomach",
    caption: "The moment my heart skipped a beat and my stomach filled with butterflies. 🦋❤️",
  },
  {
    id: "m3",
    src: '/prettyface/sg3.jpg',
    width: 900,
    height: 900,
    date: "Jun 2026",
    title: "A little possessive over you. ❤️",
    caption: "The moment I started feeling possessive about the little things that mattered to us. ❤️",
  },
  {
    id: "m4",
    src: '/prettyface/sg14.jpg',
    width: 1200,
    height: 800,
    date: "Jul 2026",
    title: "Flimyyyyyyyy us",
    caption: "The moment I felt this is gonna work out ❤️",
  },
  {
    id: "m5",
    src: '/prettyface/sg5.jpg',
    width: 900,
    height: 1200,
    date: "August 2026",
    title: "Never had the guts",
    caption: "I’d never have the guts to threaten you. ❤️",
  },
  {
    id: "m6",
    src: '/prettyface/sg6.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Rizzzzzzy me",
    caption: "The bakchodi I only love to do with you",
  },
  {
    id: "m7",
    src: '/prettyface/sg7.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "yk HOW",
    caption: "you really know how to make me SHUT",
  },
  {
    id: "m8",
    src: '/prettyface/sg8.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m9",
    src: '/prettyface/sg9.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m10",
    src: '/prettyface/sg10.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m11",
    src: '/prettyface/sg11.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m12",
    src: '/prettyface/sg12.png',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m13",
    src: '/prettyface/sg13.png',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m14",
    src: '/prettyface/sg14.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m15",
    src: '/prettyface/sg15.png',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m16",
    src: '/prettyface/sg16.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m17",
    src: '/prettyface/sg17.png',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m18",
    src: '/prettyface/sg18.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m19",
    src: '/prettyface/sg19.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m20",
    src: '/prettyface/sg20.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m21",
    src: '/prettyface/sg21.png',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m22",
    src: '/prettyface/sg22.png',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m23",
    src: '/prettyface/sg23.png',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m24",
    src: '/prettyface/sg24.png',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m25",
    src: '/prettyface/sg25.jpg',
    width: 1200,
    height: 900,
    date: "Today",
    title: "Confetti day",
    caption: "This one is yours. Enjoy every second of it.",
  },
  {
    id: "m2",
    src: '/gifts/gift2.png',
    width: 1200,
    height: 900,
    date: "Dec 2024",
    title: "Felt butterflies inside stomach",
    caption: "The moment my heart skipped a beat and my stomach filled with butterflies. 🦋❤️",
  },
    {
    id: "m4",
    src: '/gifts/gift4.png',
    width: 1200,
    height: 800,
    date: "Jul 2026",
    title: "Flimyyyyyyyy us",
    caption: "The moment I felt this is gonna work out ❤️",
  }
];

export const gifto: giftlist[] = [
  {
    id: "m1",
    src: '/gifts/gift1.jpg',
    width: 900,
    height: 1200,
    date: "Sep 2024",
    title: "The first Gift",
    caption: "The first gift I gave you but you just asked for a single flower.",
  },
  {
    id: "m2",
    src: '/gifts/gift2.png',
    width: 1200,
    height: 900,
    date: "Dec 2024",
    title: "The heart",
    caption: "The unreachable hands reached out to me. 🦋❤️",
  },
  {
    id: "m3",
    src: '/gifts/gift3.png',
    width: 900,
    height: 900,
    date: "Jun 2026",
    title: "A little possessive over you. ❤️",
    caption: "The moment I started feeling possessive about the little things that mattered to us. ❤️",
  },
  {
    id: "m4",
    src: '/gifts/gift4.png',
    width: 1200,
    height: 800,
    date: "Jul 2026",
    title: "Kiddy us",
    caption: "How cute we are ❤️",
  }
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
    title: "A Wish from our AREESHA",
    message: "This year, every plan we joked about — we actually do it.",
    quote: "Warning: she felt overwhelmed to have you.",
    src: "/gifts/areesh.mp4",
  },
  {
    title: "A memory",
    message: "Remember the day everything went wrong and you said your first “I LOVE YOU” in our DMs.\
You might have thought that I didn’t care about it, but I actually blushed in the middle of my confused state. That “I love you” made me think things through and helped me throw my fear out of me.\
It’s going to be special to me, always. ❤️",
    quote: "Certified disaster, five stars, would repeat.",
    src: "/gifts/gift5.png",
  },
  {
    title: "A wish",
    message: "The second time you said “I love you,” you got so shy, and somehow that shyness made those three words even more beautiful. 🥺❤️\
I swear, I completely melted in that moment—not just because of what you said, but because of the way you said it.\
Even today, that little moment lives in my heart, wrapped in the sweetest memory of you. ❤️\
",
    quote: "Also: unlimited dessert.",
    src: "/gifts/gift6.png",

  },
  {
    title: "A secret",
    message: "That day, I didn’t even say a single “I love you,” but you said it first. ❤️\
And something in me just decided, “Screw the whole world for this girl, I’ll go to any extreme to keep her by my side.”\
Every “I love you” you give me makes me feel more special, more loved, and somehow even more yours every single day. 🥺❤️",
    quote: "You definitely noticed. You said nothing. Legend.",
    src: "/gifts/gift7.png",
  },
];

export const quiz = [
  {
    question: "What do I call you most often?",
    options: ["Aalu", "Zawja", "Begum", "Naukar ki rani"],
    answer: 1,
  },
  {
    question: "What do I always say when you show \"🖕\"?",
    options: ["\"Sure.\"", "\"Later.\"", "Fuck you.", "\"Tem hai tem\""],
    answer: 3,
  },
  {
    question: "what you are for me?",
    options: ["GirlFriend", "Wife", "Life Partner", "More than that"],
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
  "You're my one and only wish. I hope it comes true.";

export const treasureClues = [
  {
    clue: "My favourite Bollywood movie.",
    answer: "Dil Bechara",
    hint: "I cried",
  },
  {
    clue: "what's my most fav song?",
    answer: "Taare Ginn",
    hint: "We can sing together lying on the terace of our house.",
  },
  {
    clue: "I love you how many times?",
    answer: "Infinite",
    hint: "endless",
  }
];
