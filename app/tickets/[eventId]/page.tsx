"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useParams } from "next/navigation";

interface Event {
  title: string;
  venue: string;
  date: string;
}

interface TicketData {
  ticketId: string;
  name: string;
  email: string;
  event: Event;
}

export default function EventRegistrationPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  // Fetch event details when component mounts
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/tickets/event/${eventId}`);
        if (response.ok) {
          const eventData = await response.json();
          setEvent(eventData);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/tickets/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTicket(data);
        toast({
          title: "Registration Successful!",
          description: "Your ticket has been generated.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to register",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register for event",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (ticket) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto p-4 md:p-6">
          {/* FSU Logo */}
          <div className="flex justify-center mb-6">
            <Image 
              src="/logo.png" 
              alt="FSU Logo" 
              width={80} 
              height={80}
              className="object-contain"
            />
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
            <h2 className="text-xl font-bold text-green-800 mb-2">
              🎉 Registration Successful!
            </h2>
            <p className="text-green-700">
              Your digital ticket has been generated below.
            </p>
          </div>

          {/* Digital Ticket */}
          <Card className="border-2 border-purple-200 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl">🎫 Digital Ticket</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Event Details */}
                <div className="text-center border-b border-gray-200 pb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {ticket.event.title}
                  </h3>
                  <p className="text-lg text-gray-700 mb-1">
                    📍 {ticket.event.venue}
                  </p>
                  <p className="text-lg text-gray-700">
                    📅 {formatDate(ticket.event.date)}
                  </p>
                </div>

                {/* Attendee Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <Label className="text-sm font-medium text-gray-600">
                      Attendee Name
                    </Label>
                    <p className="text-lg font-semibold text-gray-900">
                      {ticket.name}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <Label className="text-sm font-medium text-gray-600">
                      Email Address
                    </Label>
                    <p className="text-lg font-semibold text-gray-900">
                      {ticket.email}
                    </p>
                  </div>
                </div>

                {/* Ticket ID */}
                <div className="bg-white p-4 rounded-lg border text-center">
                  <Label className="text-sm font-medium text-gray-600">
                    Ticket ID
                  </Label>
                  <p className="text-xl font-mono font-bold text-purple-600 mt-1">
                    {ticket.ticketId}
                  </p>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <p className="text-blue-800 text-sm">
                    📱 Save this ticket or take a screenshot. Present this at the event entrance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4 justify-center">
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="flex items-center gap-2"
            >
              🖨️ Print Ticket
            </Button>
            <Button
              onClick={() => {
                const ticketText = `Event: ${ticket.event.title}\nVenue: ${ticket.event.venue}\nDate: ${formatDate(ticket.event.date)}\nName: ${ticket.name}\nEmail: ${ticket.email}\nTicket ID: ${ticket.ticketId}`;
                navigator.clipboard.writeText(ticketText);
                toast({
                  title: "Copied!",
                  description: "Ticket details copied to clipboard.",
                });
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              📋 Copy Details
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4 md:p-6">
        {/* FSU Logo */}
        <div className="flex justify-center mb-6">
          <Image 
            src="/logo.png" 
            alt="FSU Logo" 
            width={80} 
            height={80}
            className="object-contain"
          />
        </div>

        {/* Event Details */}
        {event && (
          <Card className="mb-6 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl text-gray-900">
                {event.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2">
                <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
                  📍 <span>{event.venue}</span>
                </p>
                <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
                  📅 <span>{formatDate(event.date)}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">
              🎫 Register for Event
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 py-3 text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "🎫 Register & Get Ticket"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-blue-800 text-center text-sm">
              ℹ️ After registration, you'll receive a digital ticket that you can save or print.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}