import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { requireAdmin } from "@/config/auth";
import { sanitizeStoryHtml } from "@/utils/sanitize";
import { normalizeStoryType, STATUS_APPROVED } from "@/utils/storyTypes";

type Params = { params: Promise<{ slug: string }> };

// Approves a community submission and copies it into the public Story collection
export async function POST(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await params;

  try {
    const submission = await prisma.customStories.findUnique({ where: { id: slug } });

    if (!submission) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    if (submission.publishedStoryId) {
      return NextResponse.json(
        { error: "Story already published", storyId: submission.publishedStoryId },
        { status: 409 }
      );
    }

    const story = await prisma.story.create({
      data: {
        title: submission.title || "Untitled",
        caption: "",
        author: submission.author || `${submission.firstName} ${submission.lastName}`,
        type: normalizeStoryType(submission.storyType),
        date: submission.date,
        image: submission.image,
        file: submission.file,
        kinyarwandaContent: sanitizeStoryHtml(submission.kinyarwandaContent),
        englishContent: sanitizeStoryHtml(submission.englishContent),
        frenchContent: sanitizeStoryHtml(submission.frenchContent),
      },
    });

    await prisma.customStories.update({
      where: { id: slug },
      data: { status: STATUS_APPROVED, publishedStoryId: story.id },
    });

    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    console.error("Error publishing story:", error);
    return NextResponse.json(
      { error: "Failed to publish story" },
      { status: 500 }
    );
  }
}
