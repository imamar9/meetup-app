import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EventCard from './EventCard';
import useFetch from '../hooks/useFetch';

const EventListings = () => {
    const { data: allEvents, loading, error } = useFetch('/api/events', []);
    const [eventType, setEventType] = useState('Both');
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSearchTerm(params.get('search') || '');
    }, [location.search]);

    if (loading) {
        return <div className="container py-5"><p className="text-center">Loading events...</p></div>;
    }

    if (error) {
        return <div className="container py-5"><p className="text-center text-danger">Error: {error}</p></div>;
    }

    const filteredEvents = allEvents.filter(event => {
        // Filter by event type
        const matchesType = eventType === 'Both' || event.type.includes(eventType);
        // Filter by search term (case-insensitive, checks title, description, tags)
        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch =
            event.title.toLowerCase().includes(lowerSearch) ||
            event.description.toLowerCase().includes(lowerSearch) ||
            (event.tags && event.tags.some(tag => tag.toLowerCase().includes(lowerSearch)));
        return matchesType && (searchTerm === '' || matchesSearch);
    });

    return (
        <div className="container py-5">
            <div className="row mb-4 align-items-center">
                <div className="col">
                    <h1 className="mb-0 fw-bold" style={{ fontSize: '2.5rem' }}>Meetup Events</h1>
                </div>
                <div className="col-auto">
                    <select 
                        className="form-select event-type-select"
                        value={eventType} 
                        onChange={(e) => setEventType(e.target.value)}
                        style={{ minWidth: '220px' }}
                    >
                        <option value="Both">Select Event Type</option>
                        <option value="Online">Online Event</option>
                        <option value="Offline">Offline Event</option>
                    </select>
                </div>
            </div>

            <div className="row g-4">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <div key={event.id} className="col-12 col-sm-6 col-md-6 col-lg-4">
                            <EventCard event={event} />
                        </div>
                    ))
                ) : (
                    <div className="col">
                        <p className="text-center mt-5">No events found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
