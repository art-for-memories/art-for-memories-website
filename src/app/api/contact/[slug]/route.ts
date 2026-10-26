import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { requireAdmin } from "@/config/auth";

type Params = { params: Promise<{ slug: string }> };

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await params;

  try {
    await prisma.contactMessage.delete({ where: { id: slug } });

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact message:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
