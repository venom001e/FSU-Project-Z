"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export default function AdminTicketsPage() {
  const [formData, setFormData] = useState({
    title: "",
    venue: "",
    date: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [createdEvent, setCreatedEvent] = useState<{ eventId: string } | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/tickets/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setCreatedEvent({ eventId: data.eventId });
        setFormData({ title: "", venue: "", date: "" });
        toast({
          title: "Success!",
          description: "Event created successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to create event",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event",
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

  const publicUrl = createdEvent ? `${window.location.origin}/tickets/${createdEvent.eventId}` : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
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
        
        {/* Header */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
            🎫 Ticket Generator - Admin Panel
          </h1>
          <p className="text-gray-600 text-center text-base">
            Create events and generate registration links
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Event Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Create New Event</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    name="venue"
                    type="text"
                    value={formData.venue}
                    onChange={handleInputChange}
                    placeholder="Enter venue location"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="datetime-local"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Event"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Success Message */}
          {createdEvent && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-xl text-green-800 flex items-center">
                  ✅ Event Created Successfully!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-green-700">
                    Your event has been created and is ready for registration.
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <Label className="text-sm font-medium text-green-800">
                      Public Registration Link:
                    </Label>
                    <div className="mt-2 p-3 bg-gray-50 rounded border font-mono text-sm break-all">
                      {publicUrl}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigator.clipboard.writeText(publicUrl)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      📋 Copy Link
                    </Button>
                    <Button
                      onClick={() => window.open(publicUrl, '_blank')}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      🔗 Open Link
                    </Button>
                  </div>

                  <Button
                    onClick={() => setCreatedEvent(null)}
                    variant="ghost"
                    size="sm"
                    className="w-full text-green-700 hover:text-green-800"
                  >
                    Create Another Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}