import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { requireAdmin } from "@/config/auth";

type Params = { params: Promise<{ slug: string }> };

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await params;

  try {
    const deletedImage = await prisma.gallery.delete({
      where: {
        id: slug,
      },
    });

    return NextResponse.json(deletedImage, { status: 200 });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
