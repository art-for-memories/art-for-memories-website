import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { requireAdmin } from "@/config/auth";
import { normalizeStoryType } from "@/utils/storyTypes";
import { sanitizeStoryHtml } from "@/utils/sanitize";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;

  try {
    const story = await prisma.story.findUnique({
      where: {
        id: slug,
      },
      select: {
        id: true,
        title: true,
        caption: true,
        author: true,
        type: true,
        date: true,
        image: true,
        kinyarwandaContent: true,
        englishContent: true,
        frenchContent: true,
        file: true,
      },
    });

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...story,
      type: normalizeStoryType(story.type),
      kinyarwandaContent: sanitizeStoryHtml(story.kinyarwandaContent),
      englishContent: sanitizeStoryHtml(story.englishContent),
      frenchContent: sanitizeStoryHtml(story.frenchContent),
    });
  } catch (error) {
    console.error("Error fetching story:", error);
    return NextResponse.json(
      { error: "Failed to fetch story" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await params;

  try {
    const deletedStory = await prisma.story.delete({
      where: {
        id: slug,
      },
    });

    return NextResponse.json(deletedStory, { status: 200 });
  } catch (error) {
    console.error("Error deleting story:", error);
    return NextResponse.json(
      { error: "Failed to delete story" },
      { status: 500 }
    );
  }
}
