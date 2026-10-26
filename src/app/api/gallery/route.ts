import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { requireAdmin } from "@/config/auth";

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    let body;

    try {
      body = await req.json();
    } catch (parseError) {
      console.error("Invalid JSON body:", parseError);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { name, image, current_image_id } = body;

    if (current_image_id) {
      const existingImage = await prisma.gallery.findUnique({
        where: { id: current_image_id },
      });

      if (!existingImage) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
      }

      const updatedImage = await prisma.gallery.update({
        where: { id: current_image_id },
        data: {
          name,
          // Keep the existing image when only the name is edited
          ...(image && { image }),
        },
      });

      return NextResponse.json(updatedImage, { status: 200 });
    } else {
      if (!image) {
        return NextResponse.json({ error: "Image is required" }, { status: 400 });
      }

      const gallery = await prisma.gallery.create({
        data: {
          name,
          image,
        },
      });

      return NextResponse.json(gallery, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating gallery entry:", error);
    return NextResponse.json(
      { error: "Failed to create gallery entry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const galleries = await prisma.gallery.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(galleries, { status: 200 });
  } catch (error) {
    console.error("Error fetching gallery entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery entries" },
      { status: 500 }
    );
  }
}
