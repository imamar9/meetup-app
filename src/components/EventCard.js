// src/EventCard.js
import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    // Simple path for the image - assuming images are in public/images
    const imageUrl = event.image.startsWith('/images') ? event.image : `/images/${event.image}`;

    return (
        <Card className="h-100 shadow-sm event-card">
            <div style={{ maxHeight: '200px', overflow: 'hidden' }}>
                {/* Use the event image from the mock data, but you'll need to place actual images in public/images */}
                <Card.Img 
                    variant="top" 
                    src={imageUrl} 
                    alt={event.title} 
                    style={{ height: '200px', objectFit: 'cover' }} 
                />
            </div>
            
            <Card.Body>
                <Badge bg={event.type.includes('Offline') ? 'secondary' : 'warning'} className="mb-2">
                    {event.type}
                </Badge>
                <Card.Subtitle className="mb-2 text-muted small">
                    {event.date} • {event.time}
                </Card.Subtitle>
                <Link to={`/events/${event.id}`} className="text-decoration-none">
                    <Card.Title className="h5 text-dark">{event.title}</Card.Title>
                </Link>
            </Card.Body>
            {/* Minimal footer for visual context */}
            <Card.Footer className="bg-white border-0 pt-0">
                <small className="text-muted">
                    {event.isPaid ? `₹${event.price.toLocaleString()}` : 'Free'}
                </small>
            </Card.Footer>
        </Card>
    );
};

export default EventCard;