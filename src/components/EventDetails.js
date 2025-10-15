import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import moment from 'moment';

const EventDetails = () => {
    const { id } = useParams();
    const { data: event, loading, error } = useFetch(`/api/events/${id}`, null);

    if (loading) {
        return <h2 className="text-center mt-5">Loading event details...</h2>;
    }

    if (error) {
        return <h2 className="text-center mt-5 text-danger">Error: {error}</h2>;
    }

    if (!event) {
        return <h2 className="text-center mt-5">Event not found</h2>;
    }

    const {
        title, hostedBy, image, description, additionalInfo, tags, isPaid, price,
        venue, sessionTiming, speakers
    } = event;

    const imageUrl = image;

    const timingParts = sessionTiming.split(' to ');
    const startPart = timingParts[0];
    const endPart = timingParts[1];

    const eventDate = moment(event.date).format('ddd MMM DD YYYY');
    const startTime = startPart.split(' at ')[1];
    const endTime = endPart ? endPart.split(' at ')[1] : '';

    return (
        <div className="container my-5">
            <div className="row">
                {/* Main Content Left */}
                <div className="col-lg-7">
                    <h1 className="mb-3 fw-bold">{title}</h1>
                    <p className="mb-4">
                        Hosted By:<br />
                        <strong>{hostedBy}</strong>
                    </p>
                    <div className="card mb-4 border-0 shadow-sm">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="card-img-top"
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="mb-4">
                        <h2 className="h4 fw-bold mb-3">Details:</h2>
                        <p>{description}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className
