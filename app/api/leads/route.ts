import { NextResponse } from "next/server";
import { createLead } from "@/lib/db";
import { leadSchema } from "@/lib/leads";

export async function POST(request: Request) {
  const parsed = leadSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Dados inválidos.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  try {
    const lead = await createLead(parsed.data);
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("lead_create_failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Não foi possível registrar o contato agora." }, { status: 503 });
  }
}
