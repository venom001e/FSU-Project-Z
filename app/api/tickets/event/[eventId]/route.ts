import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { eventId } = params;

    const event = await prisma.event.findUnique({
      where: { eventId },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      title: event.title,
      venue: event.venue,
      date: event.date,
    });

  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}