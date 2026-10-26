import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { requireAdmin } from "@/config/auth";

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await req.json();
    const { name, age, oldPhoto, preservedPhoto, current_memory_id } = body;

    if (!name || Number.isNaN(parseInt(age))) {
      return NextResponse.json({ error: "Name and a numeric age are required" }, { status: 400 });
    }

    if (current_memory_id) {
      const existingArt = await prisma.art.findUnique({
        where: { id: current_memory_id },
      });

      if (!existingArt) {
        return NextResponse.json({ error: "Art not found" }, { status: 404 });
      }

      const updatedArt = await prisma.art.update({
        where: { id: current_memory_id },
        data: {
          name,
          age: parseInt(age),
          ...(oldPhoto && { oldPhoto }),
          ...(preservedPhoto && { preservedPhoto }),
        },
      });

      return NextResponse.json(updatedArt, { status: 200 });
    } else {
      const art = await prisma.art.create({
        data: {
          name,
          age: parseInt(age),
          oldPhoto,
          preservedPhoto,
        },
      });

      return NextResponse.json(art, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating art:", error);
    return NextResponse.json(
      { error: "Failed to create art" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const arts = await prisma.art.findMany({
      select: {
        id: true,
        name: true,
        age: true,
        oldPhoto: true,
        preservedPhoto: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(arts);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch arts" },
      { status: 500 }
    );
  }
}
