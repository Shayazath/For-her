export type Gift = {
  id: string;
  emoji: string;
  label: string;
  note: string;
};

export type GuestWish = {
  id: string;
  name: string;
  message: string;
  gift: Gift;
  createdAt: string;
};

export const GIFTS: Gift[] = [
  { id: "cake", emoji: "🎂", label: "A birthday cake", note: "For the sweetest year ahead" },
  { id: "bouquet", emoji: "💐", label: "A flower bouquet", note: "A little beauty for your day" },
  { id: "stars", emoji: "✨", label: "A pocketful of stars", note: "For every wish still to come" },
  { id: "balloon", emoji: "🎈", label: "A lucky balloon", note: "Filled with bright new memories" },
  { id: "present", emoji: "🎁", label: "A surprise present", note: "Wrapped with so much love" },
  { id: "heart", emoji: "💖", label: "A big heart", note: "Always in your corner" },
];

export const SEED_WISHES: GuestWish[] = [
  {
    id: "seed-meera",
    name: "Meera",
    message:
      "May this next chapter bring you gentle mornings, big laughter, and all the little moments that make a year unforgettable. Save me a slice of cake — I am celebrating you from here.",
    gift: GIFTS[0],
    createdAt: "2026-08-30T08:00:00.000Z",
  },
  {
    id: "seed-ananya",
    name: "Ananya",
    message:
      "You make ordinary days feel warmer just by being in them. I hope this birthday gives some of that magic back to you, with every dream getting a little closer.",
    gift: GIFTS[2],
    createdAt: "2026-08-29T08:00:00.000Z",
  },
];

type DatabaseWish = {
  id: string;
  name: string;
  message: string;
  gift_id: string;
  created_at: string;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isWishWallConfigured = Boolean(supabaseUrl && supabaseAnonKey);

function headers() {
  if (!supabaseAnonKey) throw new Error("The guest wish wall is not configured.");
  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    "Content-Type": "application/json",
  };
}

function fromDatabaseWish(wish: DatabaseWish): GuestWish {
  return {
    id: wish.id,
    name: wish.name,
    message: wish.message,
    gift: GIFTS.find((gift) => gift.id === wish.gift_id) ?? GIFTS[4],
    createdAt: wish.created_at,
  };
}

export async function loadGuestWishes(): Promise<GuestWish[]> {
  if (!isWishWallConfigured) return SEED_WISHES;
  const response = await fetch(
    `${supabaseUrl}/rest/v1/guest_wishes?select=id,name,message,gift_id,created_at&order=created_at.desc`,
    { headers: headers() },
  );
  if (!response.ok) throw new Error("Could not load wishes. Please try again shortly.");
  return ((await response.json()) as DatabaseWish[]).map(fromDatabaseWish);
}

export async function publishGuestWish(input: {
  name: string;
  message: string;
  gift: Gift;
}): Promise<GuestWish> {
  if (!isWishWallConfigured)
    throw new Error("The shared wish wall is being set up. Please try again soon.");
  const response = await fetch(`${supabaseUrl}/rest/v1/guest_wishes`, {
    method: "POST",
    headers: { ...headers(), Prefer: "return=representation" },
    body: JSON.stringify({ name: input.name, message: input.message, gift_id: input.gift.id }),
  });
  if (!response.ok) throw new Error("Your wish could not be sent. Please try again.");
  const [wish] = (await response.json()) as DatabaseWish[];
  return fromDatabaseWish(wish);
}
