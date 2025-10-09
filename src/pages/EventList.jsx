import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import EventTypeFilter from "@/components/EventTypeFilter";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  event_type: "Online" | "Offline";
  image_url: string;
  venue?: string;
  price: number;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType, setEventType] = useState("Both");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchQuery, eventType]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      
      setEvents((data as Event[]) || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    // Filter by event type
    if (eventType !== "Both") {
      filtered = filtered.filter((event) => event.event_type === eventType);
    }

    // Filter by search query (title and tags)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query)
      );
    }

    setFilteredEvents(filtered);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-primary">meetup</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Title and Filters */}
        <div className="mb-8">
          <h2 className="mb-6 text-4xl font-bold text-foreground">Meetup Events</h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <EventTypeFilter value={eventType} onChange={setEventType} />
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No events found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                startTime={event.start_time}
                endTime={event.end_time}
                eventType={event.event_type}
                imageUrl={event.image_url}
                venue={event.venue}
                price={event.price}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default EventList;
