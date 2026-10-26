import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { requireAdmin } from "@/config/auth";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;

  try {
    const art = await prisma.art.findUnique({
      where: {
        id: slug,
      },
      select: {
        id: true,
        name: true,
        age: true,
        oldPhoto: true,
        preservedPhoto: true,
      },
    });

    if (!art) {
      return NextResponse.json({ error: "Art not found" }, { status: 404 });
    }

    return NextResponse.json(art);
  } catch (error) {
    console.error("Error fetching art:", error);
    return NextResponse.json(
      { error: "Failed to fetch art" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await params;

  try {
    const deletedArt = await prisma.art.delete({
      where: {
        id: slug,
      },
    });

    return NextResponse.json(deletedArt, { status: 200 });
  } catch (error) {
    console.error("Error deleting art:", error);
    return NextResponse.json(
      { error: "Failed to delete art" },
      { status: 500 }
    );
  }
}
