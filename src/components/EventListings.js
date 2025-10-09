// src/EventListings.js
import React, { useState, useMemo } from 'react';
import { getEvents } from './data';
import EventCard from './EventCard';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';

const EventListings = () => {
    const allEvents = useMemo(() => getEvents(), []);
    const [searchTerm, setSearchTerm] = useState('');
    const [eventType, setEventType] = useState('Both'); // Default view is Both

    // Function to filter events
    const filteredEvents = useMemo(() => {
        return allEvents.filter(event => {
            // 1. Type Filter
            const matchesType = eventType === 'Both' || event.type.includes(eventType);

            // 2. Search Filter (by title or tags)
            const matchesSearch = searchTerm === '' || 
                                  event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

            return matchesType && matchesSearch;
        });
    }, [allEvents, searchTerm, eventType]);

    return (
        <div className="py-4">
            <h1 className="mb-4">Meetup Events</h1>

            <Row className="mb-4 align-items-center">
                <Col md={4} className="mb-3 mb-md-0">
                    <Form.Group controlId="eventTypeFilter">
                        <Form.Label className="sr-only">Select Event Type</Form.Label>
                        <Form.Select 
                            value={eventType} 
                            onChange={(e) => setEventType(e.target.value)}
                        >
                            <option value="Both">Select Event Type (Both)</option>
                            <option value="Online">Online Event</option>
                            <option value="Offline">Offline Event</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={8}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search by event title and tags..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <InputGroup.Text>
                             {/* Icon Placeholder */}
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                             </svg>
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <Col key={event.id} md={6} lg={4} className="mb-4">
                            <EventCard event={event} />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p className="text-center mt-5">No events found matching your criteria.</p>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default EventListings;