import { Link } from 'react-router-dom';
import moment from 'moment';

const EventCard = ({ event }) => {
    const imageUrl = event.image;

    return (
        <Link to={`/event/${event.id}`} className="text-decoration-none">
            <div className="card h-100 event-card border-0 shadow-sm">
                <div className="position-relative event-image-container">
                    <img 
                        src={imageUrl} 
                        alt={event.title}
                        className="card-img-top event-card-image"
                    />
                    <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge event-type-badge d-flex align-items-center">
                            <span className={`badge-indicator ${event.type.includes('Offline') ? 'bg-secondary' : 'bg-primary'}`}></span>
                            <span className="badge-text">{event.type}</span>
                        </span>
                    </div>
                </div>
                
                <div className="card-body p-4">
                    <p className="text-muted mb-2 event-date-time">
                        {moment(event.date).format('ddd MMM DD YYYY')} • {event.time}
                    </p>
                    <h5 className="event-title mb-0">
                        {event.title}
                    </h5>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;