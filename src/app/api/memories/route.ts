import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { uploadFile } from "@/utils/uploadFile";
import { isAdmin, requireAdmin } from "@/config/auth";
import { isReviewStatus } from "@/utils/storyTypes";

// Public submission endpoint (web form + mobile app). Field names are part of the
// contract with released mobile builds, so they must stay as they are.
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const firstname = formData.get("firstname")?.toString().trim() || "";
    const lastname = formData.get("lastname")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const memories = formData.get("memories")?.toString().trim() || "";
    const current_memory_id =
      formData.get("current_memory_id")?.toString() || "";
    const victim_full_name = formData.get("victim_full_name")?.toString().trim() || "";

    if (!firstname || !lastname || !email || !phone || !victim_full_name) {
      return NextResponse.json(
        { error: "First name, last name, email, phone and victim full name are required" },
        { status: 400 }
      );
    }

    const imagesEntries = formData.getAll("images").filter((entry) => entry instanceof File);

    if (current_memory_id) {
      // Editing an existing submission is an admin-only operation
      if (!(await isAdmin())) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const existingMemory = await prisma.memories.findUnique({
        where: { id: current_memory_id },
      });

      if (!existingMemory) {
        return NextResponse.json({ error: "Memory not found" }, { status: 404 });
      }

      const memory = await prisma.memories.update({
        where: { id: current_memory_id },
        data: {
          firstName: firstname,
          lastName: lastname,
          email: email,
          phone: phone,
          memory: memories || existingMemory.memory,
          victimFullName: victim_full_name,
        },
      });

      if (imagesEntries.length > 0) {
        await prisma.memoriesImage.deleteMany({
          where: { memoryId: current_memory_id },
        });

        for (const entry of imagesEntries) {
          const url = await uploadFile(entry as File);
          await prisma.memoriesImage.create({
            data: {
              image: url,
              memoryId: memory.id,
            },
          });
        }
      }

      return NextResponse.json({ success: true, message: "Memory updated" });
    }

    const memory = await prisma.memories.create({
      data: {
        firstName: firstname,
        lastName: lastname,
        email: email,
        phone: phone,
        memory: memories,
        victimFullName: victim_full_name,
      },
    });

    for (const entry of imagesEntries) {
      const url = await uploadFile(entry as File);
      await prisma.memoriesImage.create({
        data: {
          image: url,
          memoryId: memory.id,
        },
      });
    }

    // Only acknowledge the submission; never echo stored personal data back
    return NextResponse.json({ success: true, id: memory.id });
  } catch (error) {
    console.error("Error creating memory:", error);
    return NextResponse.json(
      { error: "Failed to create memory" },
      { status: 500 }
    );
  }
}

// Contains submitters' personal data: admins only
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const memories = await prisma.memories.findMany({
      include: {
        MemoriesImage: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(memories);
  } catch (error) {
    console.error("Error fetching memories:", error);
    return NextResponse.json(
      { error: "Failed to fetch memories" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await req.json();
    const { id, firstName, lastName, email, phone, memory, victimFullName, status, images } = body;

    if (!id) {
      return NextResponse.json({ error: "Memory id is required" }, { status: 400 });
    }

    if (status !== undefined && !isReviewStatus(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Undefined fields are left untouched by Prisma, so this works as a partial update
    const updated = await prisma.memories.update({
      where: { id },
      data: { firstName, lastName, email, phone, memory, victimFullName, status },
    });

    if (Array.isArray(images) && images.length > 0) {
      await prisma.memoriesImage.deleteMany({ where: { memoryId: id } });
      await prisma.memoriesImage.createMany({
        data: images.map((image: string) => ({ image, memoryId: id })),
      });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating memory:", error);
    return NextResponse.json(
      { error: "Failed to update memory" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Memory id is required" }, { status: 400 });
    }

    await prisma.memories.delete({ where: { id } });

    return NextResponse.json({ message: "Memory deleted successfully" });
  } catch (error) {
    console.error("Error deleting memory:", error);
    return NextResponse.json(
      { error: "Failed to delete memory" },
      { status: 500 }
    );
  }
}
