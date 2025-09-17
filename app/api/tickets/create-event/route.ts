import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, venue, date } = await request.json();

    if (!title || !venue || !date) {
      return NextResponse.json(
        { error: "Title, venue, and date are required" },
        { status: 400 }
      );
    }

    // Create event in database
    const event = await prisma.event.create({
      data: {
        title,
        venue,
        date: new Date(date),
      },
    });

    return NextResponse.json({
      success: true,
      eventId: event.eventId,
    });

  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}