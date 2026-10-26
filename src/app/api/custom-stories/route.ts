import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { isAdmin, requireAdmin } from "@/config/auth";
import { sanitizeStoryHtml } from "@/utils/sanitize";
import { normalizeStoryType, STATUS_PENDING } from "@/utils/storyTypes";

// Public submission endpoint (web form + mobile app). Released mobile builds send
// `imageUrl`/`pdfUrl` and the dropdown labels as `storyType`, so both are accepted.
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const field = (...names: string[]) =>
      names.map((name) => formData.get(name)?.toString().trim()).find(Boolean) || "";

    const firstName = field("firstName");
    const lastName = field("lastName");
    const email = field("email");
    const phone = field("phone");
    const file = field("file", "pdfUrl") || null;
    const image = field("image", "imageUrl") || null;
    const storyType = normalizeStoryType(field("storyType"));
    const title = field("title");
    const author = field("author");
    const date = field("date") || new Date().toISOString();
    const kinyarwandaContent = sanitizeStoryHtml(field("kinyarwandaContent"));
    const englishContent = sanitizeStoryHtml(field("englishContent"));
    const frenchContent = sanitizeStoryHtml(field("frenchContent"));
    const current_story_id = field("current_story_id") || null;

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "First name, last name, email and phone are required" },
        { status: 400 }
      );
    }

    if (Number.isNaN(new Date(date).getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    const data = {
      firstName,
      lastName,
      email,
      phone,
      file,
      storyType,
      title,
      author,
      date: new Date(date),
      kinyarwandaContent: kinyarwandaContent || "No content provided",
      englishContent: englishContent || "No content provided",
      frenchContent: frenchContent || "No content provided",
      image,
    };

    if (current_story_id) {
      // Editing a submission is an admin-only operation
      if (!(await isAdmin())) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const story = await prisma.customStories.update({
        where: { id: current_story_id },
        data,
      });

      return NextResponse.json(story, { status: 200 });
    }

    const story = await prisma.customStories.create({
      data: { ...data, status: STATUS_PENDING },
    });

    // Only acknowledge the submission; never echo stored personal data back
    return NextResponse.json({ success: true, id: story.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating story:", error);
    return NextResponse.json({ error: "Failed to submit story" }, { status: 500 });
  }
}

// Contains submitters' personal data: admins only
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const stories = await prisma.customStories.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        storyType: true,
        title: true,
        author: true,
        date: true,
        file: true,
        image: true,
        kinyarwandaContent: true,
        englishContent: true,
        frenchContent: true,
        status: true,
        publishedStoryId: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const normalizedStories = stories.map((story) => ({
      ...story,
      storyType: normalizeStoryType(story.storyType),
      status: story.status ?? STATUS_PENDING,
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
