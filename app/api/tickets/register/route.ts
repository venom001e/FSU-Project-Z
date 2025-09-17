import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { eventId, name, email } = await request.json();

    if (!eventId || !name || !email) {
      return NextResponse.json(
        { error: "EventId, name, and email are required" },
        { status: 400 }
      );
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { eventId },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Create ticket
    const ticket = await prisma.ticket.create({
      data: {
        eventId,
        name,
        email,
      },
    });

    return NextResponse.json({
      success: true,
      ticketId: ticket.ticketId,
      name: ticket.name,
      email: ticket.email,
      event: {
        title: event.title,
        venue: event.venue,
        date: event.date,
      },
    });

  } catch (error) {
    console.error("Error registering for event:", error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}