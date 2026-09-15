import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL =
  Deno.env.get("SUPABASE_URL")!;

const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const EMAILJS_SERVICE_ID =
  Deno.env.get("EMAILJS_SERVICE_ID")!;

const EMAILJS_PUBLIC_KEY =
  Deno.env.get("EMAILJS_PUBLIC_KEY")!;

const EMAILJS_WISH_TEMPLATE_ID =
  Deno.env.get("EMAILJS_WISH_TEMPLATE_ID")!;

const BIRTHDAY_RECEIVER_EMAIL =
  Deno.env.get("BIRTHDAY_RECEIVER_EMAIL")!;
const EMAILJS_PRIVATE_KEY =
  Deno.env.get("EMAILJS_PRIVATE_KEY")!;
const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
);

Deno.serve(async (req) => {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return json(
        {
          error: "Method not allowed",
        },
        405,
      );
    }

    console.log(
      "Starting scheduled birthday email job...",
    );

    // --------------------------------------------------
    // GET ALL GUEST WISHES WITH AN EMAIL
    // --------------------------------------------------

    const {
      data: wishes,
      error: wishesError,
    } = await supabase
      .from("guest_wishes")
      .select(
        "id,name,message,gift_id,sender_email,created_at",
      )
      .not("sender_email", "is", null)
      .order("created_at", {
        ascending: true,
      });

    if (wishesError) {
      console.error(
        "Could not load guest wishes:",
        wishesError,
      );

      throw wishesError;
    }

    console.log(
      `Found ${wishes?.length ?? 0} wishes with email addresses.`,
    );

    // No wishes to send
    if (!wishes || wishes.length === 0) {
      return json({
        success: true,
        message:
          "No guest wishes with email addresses found.",
        sent: 0,
        failed: 0,
        total: 0,
      });
    }

    // --------------------------------------------------
    // SEND EMAILS
    // --------------------------------------------------

    let sent = 0;
    let failed = 0;

    for (const wish of wishes) {
      try {
        console.log(
          `Sending wish ${wish.id} from ${wish.name}...`,
        );

        const emailResponse = await fetch(
          "https://api.emailjs.com/api/v1.0/email/send",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              service_id:
                EMAILJS_SERVICE_ID,

              template_id:
                EMAILJS_WISH_TEMPLATE_ID,

              user_id:
                EMAILJS_PUBLIC_KEY,

                accessToken: EMAILJS_PRIVATE_KEY,


              template_params: {
                // Birthday receiver
                to_email:
                  BIRTHDAY_RECEIVER_EMAIL,

                // Guest information
                name: wish.name,

                message: wish.message,

                sender_email:
                  wish.sender_email,

                // Sticker
                gift_name:
                  "A little surprise",

                // Wish ID
                wish_id: wish.id,
              },
            }),
          },
        );

        // --------------------------------------------------
        // EMAIL FAILED
        // --------------------------------------------------

        if (!emailResponse.ok) {
          const errorText =
            await emailResponse.text();

          console.error(
            `EmailJS failed for wish ${wish.id}:`,
            errorText,
          );

          failed++;

          continue;
        }

        // --------------------------------------------------
        // EMAIL SUCCESS
        // --------------------------------------------------

        console.log(
          `Successfully sent wish ${wish.id}.`,
        );

        sent++;

        // EmailJS allows approximately 1 request/second.
        // Wait before sending the next email.
        await new Promise(
          (resolve) =>
            setTimeout(resolve, 1100),
        );
      } catch (error) {
        console.error(
          `Unexpected error while sending wish ${wish.id}:`,
          error,
        );

        failed++;
      }
    }

    // --------------------------------------------------
    // FINAL RESPONSE
    // --------------------------------------------------

    console.log(
      `Birthday email job completed. Sent: ${sent}, Failed: ${failed}`,
    );

    return json({
      success: true,
      message:
        "Scheduled birthday wishes processed.",
      sent,
      failed,
      total: wishes.length,
    });
  } catch (error) {
    console.error(
      "Scheduled birthday email job failed:",
      error,
    );

    return json(
      {
        success: false,
        error:
          "Scheduled birthday email job failed.",
      },
      500,
    );
  }
});

// --------------------------------------------------
// JSON RESPONSE HELPER
// --------------------------------------------------

function json(
  data: unknown,
  status = 200,
) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        "Content-Type":
          "application/json",
      },
    },
  );
}