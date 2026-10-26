import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { requireAdmin } from "@/config/auth";
import { sanitizeStoryHtml } from "@/utils/sanitize";
import { normalizeStoryType } from "@/utils/storyTypes";

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const formData = await req.formData();

    const title = formData.get("title")?.toString().trim() || "";
    const caption = formData.get("caption")?.toString() || "";
    const author = formData.get("author")?.toString() || "";
    const type = normalizeStoryType(formData.get("type")?.toString());
    const date = formData.get("date")?.toString() || new Date().toISOString();
    // Empty means "keep the current value" when editing
    const image = formData.get("image")?.toString() || undefined;
    const file = formData.get("file")?.toString() || undefined;
    const kinyarwandaContent = sanitizeStoryHtml(formData.get("kinyarwandaContent")?.toString());
    const englishContent = sanitizeStoryHtml(formData.get("englishContent")?.toString());
    const frenchContent = sanitizeStoryHtml(formData.get("frenchContent")?.toString());
    const current_story_id =
      formData.get("current_story_id")?.toString() || null;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (Number.isNaN(new Date(date).getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    const story = current_story_id
      ? await prisma.story.update({
          where: { id: current_story_id },
          data: {
            title,
            caption,
            author,
            type,
            date: new Date(date),
            kinyarwandaContent,
            englishContent,
            frenchContent,
            file,
            image,
          },
        })
      : await prisma.story.create({
          data: {
            title,
            caption,
            author,
            type,
            date: new Date(date),
            kinyarwandaContent: kinyarwandaContent || "No content provided",
            englishContent: englishContent || "No content provided",
            frenchContent: frenchContent || "No content provided",
            file,
            image,
          },
        });

    return NextResponse.json(story, { status: current_story_id ? 200 : 201 });
  } catch (error) {
    console.error("Error saving story:", error);
    return NextResponse.json({ error: "Failed to save story" }, { status: 500 });
  }
}

// Public: used by the website and the mobile app (which expects a bare array)
export async function GET() {
  try {
    const stories = await prisma.story.findMany({
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
      orderBy: {
        date: "desc",
      },
    });

    const normalizedStories = stories.map((story) => ({
      ...story,
      type: normalizeStoryType(story.type),
      kinyarwandaContent: sanitizeStoryHtml(story.kinyarwandaContent),
      englishContent: sanitizeStoryHtml(story.englishContent),
      frenchContent: sanitizeStoryHtml(story.frenchContent),
    }));

    return NextResponse.json(normalizedStories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}
