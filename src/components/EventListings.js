import React, { useState } from 'react';
import EventCard from './EventCard';
import useFetch from '../hooks/useFetch';

const EventListings = ({ searchTerm }) => {
    const { data: allEvents, loading, error } = useFetch('/api/events', []);
    const [eventType, setEventType] = useState('Both');

    if (loading) {
        return <div className="container py-5"><p className="text-center">Loading events...</p></div>;
    }

    if (error) {
        return <div className="container py-5"><p className="text-center text-danger">Error: {error}</p></div>;
    }

  const filteredEvents = allEvents.filter(event => {
    // Normalize dropdown value to either 'online', 'offline', or 'both'
    const normalizedType = eventType.replace(' Event', '').toLowerCase();
    const matchesType =
        normalizedType === 'both' ||
        (event.type && event.type.trim().toLowerCase() === normalizedType);

    if (!matchesType) return false;

    const keyword = searchTerm ? searchTerm.trim().toLowerCase() : '';
    if (!keyword) return true;

    const inTitle = event.title && event.title.toLowerCase().includes(keyword);
    const inTags = event.tags && event.tags.some(tag => tag.toLowerCase().includes(keyword));
    return inTitle || inTags;
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
                        <div key={event.id || event._id} className="col-12 col-sm-6 col-md-6 col-lg-4">
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
export default EventListings;
