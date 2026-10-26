import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { requireAdmin } from "@/config/auth";
import { sanitizeStoryHtml } from "@/utils/sanitize";
import { isReviewStatus, normalizeStoryType, STATUS_PENDING } from "@/utils/storyTypes";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await params;

  try {
    const story = await prisma.customStories.findUnique({
      where: {
        id: slug,
      },
    });

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...story,
      storyType: normalizeStoryType(story.storyType),
      status: story.status ?? STATUS_PENDING,
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

// Moderation: { status: "approved" | "rejected" | "pending" }
export async function PATCH(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await params;

  try {
    const { status } = await req.json();

    if (!isReviewStatus(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const story = await prisma.customStories.update({
      where: { id: slug },
      data: { status },
    });

    return NextResponse.json(story);
  } catch (error) {
    console.error("Error updating story status:", error);
    return NextResponse.json(
      { error: "Failed to update story status" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await params;

  try {
    const deletedStory = await prisma.customStories.delete({
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
