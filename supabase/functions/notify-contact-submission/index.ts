import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const WEBHOOK_SECRET = Deno.env.get("CONTACT_NOTIFY_SECRET");
const NOTIFY_TO = Deno.env.get("NOTIFY_TO_EMAIL") ?? "info@ashrodesign.net";
const NOTIFY_FROM = Deno.env.get("NOTIFY_FROM_EMAIL") ?? "onboarding@resend.dev";

type ContactRow = {
  first_name: string;
  last_name: string;
  business_name: string;
  email: string;
  phone: string;
  island: string;
  stage: string;
  services: string[];
  message: string;
};

Deno.serve(async (req: Request) => {
  if (req.headers.get("x-webhook-secret") !== WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { record }: { record: ContactRow } = await req.json();

  const html = `
    <h2>New strategy-call lead</h2>
    <p><strong>${record.first_name} ${record.last_name}</strong> — ${record.business_name}</p>
    <p>Email: <a href="mailto:${record.email}">${record.email}</a><br/>
    Phone: ${record.phone}</p>
    <p>Island: ${record.island}<br/>
    Stage: ${record.stage}<br/>
    Services: ${record.services?.join(", ") || "—"}</p>
    <p>${record.message || "(no message)"}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      subject: `New lead: ${record.business_name}`,
      html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return new Response(`Resend error: ${errText}`, { status: 502 });
  }

  return new Response("ok", { status: 200 });
});
