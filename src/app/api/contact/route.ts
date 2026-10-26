import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../lib/prisma";
import { requireAdmin } from "@/config/auth";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(200),
  email: z.string().trim().email("Invalid email address").max(200),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

// Public: messages sent from the Contact Us page
export async function POST(req: Request) {
  try {
    const parsed = contactSchema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid message" },
        { status: 400 }
      );
    }

    await prisma.contactMessage.create({ data: parsed.data });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
