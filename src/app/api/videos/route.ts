import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { requireAdmin } from "@/config/auth";

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await req.json();
    const { files, title, caption, current_video_id } = body;

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { error: "Files must be a non-empty array" },
        { status: 400 }
      );
    }

    if (current_video_id) {
      const existingVideo = await prisma.video.findUnique({
        where: { id: current_video_id },
      });

      if (!existingVideo) {
        return NextResponse.json({ error: "Video not found" }, { status: 404 });
      }

      await prisma.video.update({
        where: { id: current_video_id },
        data: {
          url: files[0],
          title: title || existingVideo.title,
          caption: caption || existingVideo.caption,
        },
      });

      return NextResponse.json(
        { message: "Video updated successfully" },
        { status: 200 }
      );
    }

    const createPromises = files.map((fileUrl) =>
      prisma.video.create({
        data: {
          url: fileUrl,
          title: title || "Untitled",
          caption: caption || "No caption provided",
        },
      })
    );

    await Promise.all(createPromises);

    return NextResponse.json(
      { message: "Videos created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing video request:", error);
    return NextResponse.json(
      { error: "Failed to process video request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      select: {
        id: true,
        url: true,
        title: true,
        caption: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
