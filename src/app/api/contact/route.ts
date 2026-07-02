import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { firstName, lastName, businessName, email, phone, island, stage, services, message } =
    parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert({
    first_name: firstName,
    last_name: lastName,
    business_name: businessName,
    email,
    phone,
    island,
    stage,
    services,
    message,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
