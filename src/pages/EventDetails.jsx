import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, IndianRupee, User, Info, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  event_type: "Online" | "Offline";
  image_url: string;
  venue?: string;
  address?: string;
  host: string;
  price: number;
  dress_code?: string;
  age_restrictions?: string;
  tags?: string[];
}

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setEvent(data as Event);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch event details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Event not found</h2>
          <Link to="/">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, "EEE MMM dd yyyy");
  const startTime = event.start_time.slice(0, 5);
  const endTime = event.end_time.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-5 w-5" />
            <h1 className="text-4xl font-bold">meetup</h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2">
            <h1 className="mb-4 text-4xl font-bold text-foreground">{event.title}</h1>
            <p className="mb-6 text-muted-foreground">
              Hosted By: <span className="font-semibold text-foreground">{event.host}</span>
            </p>

            <img
              src={event.image_url}
              alt={event.title}
              className="mb-8 h-96 w-full rounded-lg object-cover shadow-lg"
            />

            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Details:</h2>
              <p className="text-foreground leading-relaxed whitespace-pre-line">{event.description}</p>
            </div>

            {(event.dress_code || event.age_restrictions) && (
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Additional Information:</h2>
                <div className="space-y-2">
                  {event.dress_code && (
                    <p className="text-foreground">
                      <span className="font-semibold">Dress Code:</span> {event.dress_code}
                    </p>
                  )}
                  {event.age_restrictions && (
                    <p className="text-foreground">
                      <span className="font-semibold">Age Restrictions:</span> {event.age_restrictions}
                    </p>
                  )}
                </div>
              </div>
            )}

            {event.tags && event.tags.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">Event Tags:</h2>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Event Info Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {formattedDate} at {startTime}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      to {formattedDate} at {endTime}
                    </p>
                  </div>
                </div>

                {event.venue && event.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">{event.venue}</p>
                      <p className="text-sm text-muted-foreground">{event.address}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {event.price > 0 ? `₹ ${event.price.toLocaleString()}` : "Free"}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Badge variant={event.event_type === "Online" ? "secondary" : "default"} className="w-full justify-center py-2">
                    {event.event_type} Event
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;
