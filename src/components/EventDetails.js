// src/EventDetails.js
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from './data';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';

const EventDetails = () => {
    const { eventId } = useParams();
    const event = useMemo(() => getEventById(eventId), [eventId]);

    if (!event) {
        return <h2 className="text-center mt-5">Event Not Found</h2>;
    }

    const {
        title, hostedBy, image, description, additionalInfo, tags, isPaid, price,
        venue, sessionTiming, speakers
    } = event;
    
    // Simple path for the image - assuming images are in public/images
    const imageUrl = image.startsWith('/images') ? image : `/images/${image}`;
    
    // Format session timing
    const [datePart, timePart] = sessionTiming.split(' at ');
    const [startTime, endTime] = timePart.split(' to ').map(t => t.trim().replace(/AM|PM|IST/g, '').trim());

    return (
        <Container className="my-5">
            <h1 className="mb-4">{title}</h1>
            <Row>
                {/* Main Content Column */}
                <Col lg={8}>
                    <Card className="mb-4 shadow-sm">
                        <Card.Img variant="top" src={imageUrl} alt={title} style={{ maxHeight: '400px', objectFit: 'cover' }} />
                        <Card.Body>
                            <h2 className="h4 mb-3">Details:</h2>
                            <p>{description}</p>
                            
                            <h3 className="h5 mt-4">Additional Information:</h3>
                            <ul>
                                <li><strong>Dress Code:</strong> {additionalInfo.dressCode}</li>
                                <li><strong>Age Restrictions:</strong> {additionalInfo.ageRestrictions}</li>
                            </ul>
                            
                            <h3 className="h5 mt-4">Event Tags:</h3>
                            <div className="d-flex flex-wrap">
                                {tags.map(tag => (
                                    <Badge key={tag} bg="danger" className="me-2 mb-2 p-2">{tag}</Badge>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>

                    <h2 className="h4 mb-3">Speakers ({speakers.length}):</h2>
                    <Row>
                        {speakers.map((speaker, index) => (
                            <Col md={6} key={index} className="mb-3">
                                <Card className="text-center p-3 h-100">
                                    <div className="d-flex justify-content-center">
                                        {/* Placeholder for speaker image */}
                                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f0f0f0', overflow: 'hidden' }} className="mb-2">
                                            {/* In a real app, you'd use speaker.image */}
                                        </div>
                                    </div>
                                    
                                    <h5 className="mb-0">{speaker.name}</h5>
                                    <p className="text-muted small">{speaker.title}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>

                {/* Sidebar/Info Column */}
                <Col lg={4}>
                    <Card className="p-3 shadow">
                        <p className="text-muted small mb-1">Hosted By:</p>
                        <h4 className="h6 mb-3">{hostedBy}</h4>
                        
                        <div className="mb-3">
                            {/* Time/Date */}
                            <p className="mb-1"><i className="bi bi-calendar-event me-2"></i> <strong>Date:</strong> {datePart}</p>
                            <p className="mb-1"><i className="bi bi-clock me-2"></i> <strong>Time:</strong> {startTime} - {endTime}</p>
                            
                            {/* Location */}
                            <p className="mb-1"><i className="bi bi-geo-alt me-2"></i> <strong>Venue:</strong> {venue}</p>
                        </div>
                        
                        {/* Price */}
                        <div className="mb-3 border-top pt-3">
                            <h5 className="mb-0">
                                {isPaid ? `₹${price.toLocaleString()}` : 'Free Event'}
                            </h5>
                        </div>

                        {/* RSVP Button - Note: RSVP functionality is not implemented as requested */}
                        <Button variant="danger" className="w-100 mt-2" disabled>
                            RSVP (Not required for assignment)
                        </Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EventDetails;