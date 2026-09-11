import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods":
    "POST, OPTIONS",
};

const SUPABASE_URL =
  Deno.env.get("SUPABASE_URL");

const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get(
    "SUPABASE_SERVICE_ROLE_KEY",
  );

const RESEND_API_KEY =
  Deno.env.get("RESEND_API_KEY");

const RESEND_FROM_EMAIL =
  Deno.env.get("RESEND_FROM_EMAIL");

serve(async (req) => {
  // ==================================================
  // CORS PREFLIGHT
  // ==================================================

  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // ==================================================
    // ONLY POST REQUESTS
    // ==================================================

    if (req.method !== "POST") {
      return json(
        {
          error: "Method not allowed.",
        },
        405,
      );
    }

    // ==================================================
    // CHECK CONFIGURATION
    // ==================================================

    if (
      !SUPABASE_URL ||
      !SUPABASE_SERVICE_ROLE_KEY ||
      !RESEND_API_KEY ||
      !RESEND_FROM_EMAIL
    ) {
      return json(
        {
          error:
            "Reply service is not configured.",
        },
        500,
      );
    }

    // ==================================================
    // READ REQUEST BODY
    // ==================================================

    const body = await req.json();

    const {
      wishId,
      reply,
    } = body;

    // ==================================================
    // VALIDATE REQUEST
    // ==================================================

    if (
      !wishId ||
      !reply?.trim()
    ) {
      return json(
        {
          error:
            "Please enter a reply.",
        },
        400,
      );
    }

    // ==================================================
    // GET SENDER EMAIL SECURELY
    // ==================================================

    const wishResponse =
      await fetch(
        `${SUPABASE_URL}/rest/v1/guest_wishes?id=eq.${encodeURIComponent(
          wishId,
        )}&select=id,name,message,sender_email`,
        {
          method: "GET",
          headers: {
            apikey:
              SUPABASE_SERVICE_ROLE_KEY,

            Authorization:
              `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,

            "Content-Type":
              "application/json",
          },
        },
      );

    // ==================================================
    // SUPABASE ERROR
    // ==================================================

    if (!wishResponse.ok) {
      const errorText =
        await wishResponse.text();

      console.error(
        "Supabase error:",
        errorText,
      );

      return json(
        {
          error:
            "Could not find this birthday wish.",
        },
        404,
      );
    }

    const wishes =
      await wishResponse.json();

    const wish = wishes[0];

    // ==================================================
    // WISH NOT FOUND
    // ==================================================

    if (!wish) {
      return json(
        {
          error:
            "Birthday wish not found.",
        },
        404,
      );
    }

    // ==================================================
    // SENDER DID NOT PROVIDE EMAIL
    // ==================================================

    if (!wish.sender_email) {
      return json(
        {
          error:
            "This sender did not provide an email address. Please contact them through social media or another way you know to reach them. 💛",
        },
        400,
      );
    }

    // ==================================================
    // CREATE EMAIL HTML
    // ==================================================

    const emailHtml = `
      <!DOCTYPE html>

      <html>
        <body
          style="
            margin: 0;
            padding: 30px;
            background: #faf7f8;
            font-family: Arial, sans-serif;
          "
        >

          <div
            style="
              max-width: 600px;
              margin: auto;
              background: white;
              border-radius: 20px;
              padding: 30px;
            "
          >

            <h1
              style="
                text-align: center;
                color: #b8860b;
              "
            >
              💌 Aaliyah replied to your birthday wish
            </h1>

            <p
              style="
                text-align: center;
                color: #666;
              "
            >
              Your birthday message received a reply!
            </p>

            <div
              style="
                margin-top: 25px;
                padding: 20px;
                border-radius: 16px;
                background: #faf7f8;
              "
            >

              <p
                style="
                  font-size: 18px;
                  line-height: 1.7;
                  white-space: pre-wrap;
                "
              >
                ${escapeHtml(reply.trim())}
              </p>

            </div>

            <p
              style="
                margin-top: 25px;
                color: #b8860b;
                text-align: center;
                font-size: 14px;
              "
            >
              Reply sent from the birthday wall 💖
            </p>

          </div>

        </body>
      </html>
    `;

    // ==================================================
    // SEND EMAIL THROUGH RESEND
    // ==================================================

    const resendResponse =
      await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${RESEND_API_KEY}`,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            from: RESEND_FROM_EMAIL,

            to: [
              wish.sender_email,
            ],

            subject:
              "💌 Aaliyah replied to your birthday wish",

            html: emailHtml,
          }),
        },
      );

    // ==================================================
    // RESEND ERROR
    // ==================================================

    if (!resendResponse.ok) {
      const resendError =
        await resendResponse.text();

      console.error(
        "Resend error:",
        resendError,
      );

      return json(
        {
          error:
            "Could not send the reply email. Please try again.",
          resendError,
        },
        500,
      );
    }

    // ==================================================
    // SUCCESS
    // ==================================================

    return json({
      success: true,
      message:
        "Your reply has been sent successfully! 💌",
    });

  } catch (error) {
    console.error(
      "Reply function error:",
      error,
    );

    return json(
      {
        error:
          "Something went wrong while sending the reply.",
      },
      500,
    );
  }
});

// ==================================================
// ESCAPE HTML
// ==================================================

function escapeHtml(
  value: string,
) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ==================================================
// JSON RESPONSE WITH CORS HEADERS
// ==================================================

function json(
  data: unknown,
  status = 200,
) {
  return new Response(
    JSON.stringify(data),
    {
      status,

      headers: {
        ...corsHeaders,

        "Content-Type":
          "application/json",
      },
    },
  );
}