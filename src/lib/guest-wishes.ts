import emailjs from "@emailjs/browser";

export type Gift = {
  id: string;
  sticker: string;
  label: string;
  note: string;
};

export type GuestWish = {
  id: string;
  name: string;
  message: string;
  gift: Gift;
  createdAt: string;
  senderEmail: string | null;
};

export const GIFTS: Gift[] = [
  {
    id: "sticker-1",
    sticker: "/stickers/sticker-1.webp",
    label: "A little love",
    note: "A tiny sticker sent with a big heart",
  },
  {
    id: "sticker-2",
    sticker: "/stickers/sticker-2.webp",
    label: "Just for you",
    note: "A little something to make you smile",
  },
  {
    id: "sticker-3",
    sticker: "/stickers/sticker-3.webp",
    label: "Big hugs",
    note: "Sending you the biggest virtual hug",
  },
  {
    id: "sticker-4",
    sticker: "/stickers/sticker-4.webp",
    label: "Flowers for you",
    note: "A bouquet that lasts forever",
  },
  {
    id: "sticker-5",
    sticker: "/stickers/sticker-5.webp",
    label: "A happy moment",
    note: "Because today deserves extra happiness",
  },
  {
    id: "sticker-6",
    sticker: "/stickers/sticker-6.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-7",
    sticker: "/stickers/sticker-7.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-8",
    sticker: "/stickers/sticker-8.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-9",
    sticker: "/stickers/sticker-9.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-10",
    sticker: "/stickers/sticker-10.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-11",
    sticker: "/stickers/sticker-11.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-12",
    sticker: "/stickers/sticker-12.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-13",
    sticker: "/stickers/sticker-13.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-14",
    sticker: "/stickers/sticker-14.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-15",
    sticker: "/stickers/sticker-15.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-16",
    sticker: "/stickers/sticker-16.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-17",
    sticker: "/stickers/sticker-17.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-18",
    sticker: "/stickers/sticker-18.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-19",
    sticker: "/stickers/sticker-19.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-20",
    sticker: "/stickers/sticker-20.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-21",
    sticker: "/stickers/sticker-21.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-22",
    sticker: "/stickers/sticker-22.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-23",
    sticker: "/stickers/sticker-23.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-24",
    sticker: "/stickers/sticker-24.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-25",
    sticker: "/stickers/sticker-25.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-26",
    sticker: "/stickers/sticker-26.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-27",
    sticker: "/stickers/sticker-27.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-28",
    sticker: "/stickers/sticker-28.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-29",
    sticker: "/stickers/sticker-29.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-30",
    sticker: "/stickers/sticker-30.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-31",
    sticker: "/stickers/sticker-31.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-32",
    sticker: "/stickers/sticker-32.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-33",
    sticker: "/stickers/sticker-33.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
  {
    id: "sticker-34",
    sticker: "/stickers/sticker-34.webp",
    label: "A little surprise",
    note: "Wrapped with birthday love",
  },
];

export const SEED_WISHES: GuestWish[] = [];

// --------------------------------------------------
// ENVIRONMENT
// --------------------------------------------------

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY;

// --------------------------------------------------
// EMAILJS
// --------------------------------------------------

const emailJsServiceId =
  import.meta.env.VITE_EMAILJS_SERVICE_ID;

const emailJsPublicKey =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const emailJsWishTemplateId =
  import.meta.env.VITE_EMAILJS_WISH_TEMPLATE_ID;

const emailJsReplyTemplateId =
  import.meta.env.VITE_EMAILJS_REPLY_TEMPLATE_ID;

const birthdayReceiverEmail =
  import.meta.env.VITE_BIRTHDAY_RECEIVER_EMAIL;

// --------------------------------------------------
// BIRTHDAY EMAIL CUTOFF
// --------------------------------------------------
//
// Before this time:
//   Save wishes only.
//   Supabase Cron + Edge Function sends them.
//
// From this time onward:
//   New wishes with an email are sent immediately.
//
// Sep 18, 2026 12:00 AM IST
// = Sep 17, 2026 18:30 UTC
// --------------------------------------------------

const BIRTHDAY_CUTOFF =
  new Date("2026-09-17T18:30:00Z").getTime();

export const isWishWallConfigured = Boolean(
  supabaseUrl && supabaseAnonKey,
);

// --------------------------------------------------
// DATABASE TYPE
// --------------------------------------------------

type DatabaseWish = {
  id: string;
  name: string;
  message: string;
  gift_id: string;
  created_at: string;
  sender_email: string | null;
};

// --------------------------------------------------
// SUPABASE HEADERS
// --------------------------------------------------

function headers() {
  if (!supabaseAnonKey) {
    throw new Error(
      "The guest wish wall is not configured.",
    );
  }

  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    "Content-Type": "application/json",
  };
}

// --------------------------------------------------
// CONVERT DATABASE WISH
// --------------------------------------------------

function fromDatabaseWish(
  wish: DatabaseWish,
): GuestWish {
  return {
    id: wish.id,
    name: wish.name,
    message: wish.message,

    gift:
      GIFTS.find(
        (gift) => gift.id === wish.gift_id,
      ) ?? GIFTS[0]!,

    createdAt: wish.created_at,

    // Used by GuestWishes to determine whether
    // the reply input should be displayed.
    senderEmail: wish.sender_email,
  };
}

// --------------------------------------------------
// LOAD WISHES
// --------------------------------------------------

export async function loadGuestWishes(): Promise<
  GuestWish[]
> {
  if (!isWishWallConfigured) {
    return SEED_WISHES;
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/guest_wishes?select=id,name,message,gift_id,created_at,sender_email&order=created_at.desc`,
    {
      headers: headers(),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "Supabase load wishes error:",
      errorText,
    );

    throw new Error(
      "Could not load wishes. Please try again shortly.",
    );
  }

  const wishes =
    (await response.json()) as DatabaseWish[];

  return wishes.map(fromDatabaseWish);
}

// --------------------------------------------------
// PUBLISH WISH
// --------------------------------------------------

export async function publishGuestWish(input: {
  name: string;
  message: string;
  gift: Gift;
  email?: string;
}): Promise<GuestWish> {
  if (!isWishWallConfigured) {
    throw new Error(
      "The shared wish wall is being set up. Please try again soon.",
    );
  }

  const name = input.name.trim();
  const message = input.message.trim();
  const email = input.email?.trim() || null;

  if (!name) {
    throw new Error("Please enter your name.");
  }

  if (!message) {
    throw new Error("Please enter a birthday wish.");
  }

  // --------------------------------------------------
  // SAVE WISH TO SUPABASE
  // --------------------------------------------------

  const response = await fetch(
    `${supabaseUrl}/rest/v1/guest_wishes`,
    {
      method: "POST",

      headers: {
        ...headers(),
        Prefer: "return=representation",
      },

      body: JSON.stringify({
        name,
        message,
        gift_id: input.gift.id,

        // Email is optional.
        sender_email: email,
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "Supabase publish error:",
      errorText,
    );

    throw new Error(
      "Your wish could not be sent. Please try again.",
    );
  }

  const [wish] =
    (await response.json()) as DatabaseWish[];

  if (!wish) {
    throw new Error(
      "The wish was saved but could not be read back.",
    );
  }

  const guestWish =
    fromDatabaseWish(wish);

  // --------------------------------------------------
  // EMAIL FLOW
  // --------------------------------------------------
  //
  // BEFORE SEP 18, 2026 12:00 AM IST:
  //
  // Do NOT send email here.
  // Do NOT update scheduling columns.
  // The Supabase Cron job will call the Edge Function.
  //
  // AFTER SEP 18, 2026 12:00 AM IST:
  //
  // Send the email immediately.
  // --------------------------------------------------

  if (email) {
    const now = Date.now();

    if (now >= BIRTHDAY_CUTOFF) {
      try {
        await sendWishNotificationEmail({
          wishId: guestWish.id,
          name: guestWish.name,
          message: guestWish.message,
          gift: guestWish.gift,
          senderEmail: email,
        });

        console.log(
          "Wish notification sent immediately:",
          guestWish.id,
        );
      } catch (error) {
        // Do not fail the wish submission
        // if email sending fails.
        console.error(
          "Immediate wish notification email failed:",
          error,
        );
      }
    } else {
      console.log(
        "Wish saved. Email will be handled by the scheduled birthday job.",
      );
    }
  }

  return guestWish;
}

// --------------------------------------------------
// SEND WISH NOTIFICATION EMAIL
// --------------------------------------------------

async function sendWishNotificationEmail(input: {
  wishId: string;
  name: string;
  message: string;
  gift: Gift;
  senderEmail: string;
}) {
  if (
    !emailJsServiceId ||
    !emailJsPublicKey ||
    !emailJsWishTemplateId ||
    !birthdayReceiverEmail
  ) {
    throw new Error(
      "EmailJS is not configured.",
    );
  }

  await emailjs.send(
    emailJsServiceId,
    emailJsWishTemplateId,

    {
      // Birthday receiver
      to_email: birthdayReceiverEmail,

      // Wish information
      name: input.name,
      message: input.message,
      sender_email: input.senderEmail,

      // Sticker
      gift_name: input.gift.label,

      // Useful if you want to reference the wish later
      wish_id: input.wishId,
    },

    {
      publicKey: emailJsPublicKey,
    },
  );
}

// --------------------------------------------------
// REPLY TO WISH
// --------------------------------------------------

export async function replyToWish(input: {
  wishId: string;
  reply: string;
  senderEmail: string;
  senderName: string;
  originalMessage: string;
}) {
  if (
    !emailJsServiceId ||
    !emailJsPublicKey ||
    !emailJsReplyTemplateId
  ) {
    throw new Error(
      "EmailJS is not configured.",
    );
  }

  const reply = input.reply.trim();

  const senderEmail =
    input.senderEmail?.trim();

  if (!senderEmail) {
    throw new Error(
      "This person did not provide an email address.",
    );
  }

  if (!reply) {
    throw new Error(
      "Please enter a reply.",
    );
  }

  await emailjs.send(
    emailJsServiceId,
    emailJsReplyTemplateId,

    {
      // Send the reply to the original sender
      to_email: senderEmail,

      // Original sender's name
      name: input.senderName,
      original_message: input.originalMessage,

      // Reply message
      reply,

      // Useful if you want to reference the wish later
      wish_id: input.wishId,
    },

    {
      publicKey: emailJsPublicKey,
    },
  );

  return {
    success: true,
  };
}