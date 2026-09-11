import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const BIRTHDAY_RECEIVER_EMAIL = "shayazath21@gmail.com";
const RESEND_FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL");
const SITE_URL = Deno.env.get("SITE_URL");

serve(async (req) => {
  // IMPORTANT: Handle browser CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return json(
        {
          error: "Method not allowed",
        },
        405,
      );
    }

    // Check required secrets
    if (!RESEND_API_KEY || !BIRTHDAY_RECEIVER_EMAIL || !RESEND_FROM_EMAIL) {
      console.error("Missing email configuration");

      return json(
        {
          error: "Email service is not configured.",
        },
        500,
      );
    }

    const body = await req.json();

    const { name, message, gift, senderEmail } = body;

    // Validate request
    if (!name?.trim() || !message?.trim() || !senderEmail?.trim()) {
      return json(
        {
          error: "Missing required information.",
        },
        400,
      );
    }

    // Build sticker URL
    const stickerUrl = gift?.sticker && SITE_URL ? `${SITE_URL}${gift.sticker}` : "";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <body style="
          margin: 0;
          padding: 30px;
          background: #faf7f8;
          font-family: Arial, sans-serif;
        ">

          <div style="
            max-width: 600px;
            margin: auto;
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          ">

            <h1 style="
              text-align: center;
              color: #b8860b;
            ">
              💌 You received a birthday wish
            </h1>

            <p style="
              text-align: center;
              color: #666;
            ">
              {${name}} left a special message for you.
            </p>

            ${
              stickerUrl
                ? `
                  <div style="
                    text-align: center;
                    margin: 25px 0;
                  ">
                    <img
                      src="${escapeHtml(stickerUrl)}"
                      alt="${escapeHtml(gift?.label ?? "Birthday sticker")}"
                      style="
                        width: 140px;
                        height: 140px;
                        object-fit: contain;
                      "
                    />
                  </div>
                `
                : ""
            }

            <div style="
              background: #faf7f8;
              border-radius: 16px;
              padding: 20px;
              margin-top: 20px;
            ">

              <p style="
                font-size: 18px;
                line-height: 1.7;
                white-space: pre-wrap;
              ">
                ${escapeHtml(message)}
              </p>

            </div>

            <p style="
              margin-top: 25px;
              color: #b8860b;
              font-weight: bold;
            ">
              — ${escapeHtml(name)}
            </p>

            <p style="
              color: #777;
              font-size: 13px;
            ">
              ${escapeHtml(gift?.label ?? "Birthday sticker")}
            </p>

            <hr style="
              margin: 30px 0;
              border: none;
              border-top: 1px solid #eee;
            " />

            <p style="
              color: #777;
              font-size: 13px;
              text-align: center;
            ">
              Reply to this birthday wish from the birthday wall.
            </p>

          </div>

        </body>
      </html>
    `;

    // Send email through Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [BIRTHDAY_RECEIVER_EMAIL],
        reply_to: senderEmail.trim(),
        subject: `💌 Birthday wish from ${name.trim()}`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();

      console.error("Resend error:", errorText);

      return json(
        {
          error: "Could not send birthday email.",
          resendError: errorText,
        },
        500,
      );
    }

    return json({
      success: true,
      message: "Birthday wish email sent successfully.",
    });
  } catch (error) {
    console.error("Unexpected email error:", error);

    return json(
      {
        error: "Unexpected email error.",
      },
      500,
    );
  }
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}
