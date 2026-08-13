import { NextResponse } from "next/server";
import { blueprintSignupSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = blueprintSignupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_BLUEPRINT_LIST_ID;

  if (!apiKey || !listId) {
    throw new Error(
      "Brevo env vars are not configured (BREVO_API_KEY / BREVO_BLUEPRINT_LIST_ID)",
    );
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email: parsed.data.email,
      attributes: { FIRSTNAME: parsed.data.firstName },
      listIds: [Number(listId)],
      updateEnabled: true,
    }),
  });

  // Brevo returns 204 when updateEnabled resubscribes an existing contact,
  // 201 for a brand-new one — both mean success.
  if (!res.ok && res.status !== 204) {
    const errBody = await res.json().catch(() => null);
    return NextResponse.json(
      { error: errBody?.message ?? "Failed to subscribe" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
