import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import moment from 'moment';

const EventDetails = () => {
    const { id } = useParams();
    const { data: event, loading, error } = useFetch(`/api/events/${id}`, null);

    if (loading) return <h2 className="text-center mt-5">Loading event details...</h2>;
    if (error) return <h2 className="text-center mt-5 text-danger">Error: {error}</h2>;
    if (!event) return <h2 className="text-center mt-5">Event not found</h2>;

    const {
        title, hostedBy, image, description, additionalInfo, tags, isPaid, price,
        venue, sessionTiming, speakers = []
    } = event;

    const timingParts = sessionTiming.split(' to ');
    const startPart = timingParts[0];
    const endPart = timingParts[1];

    const eventDate = moment(event.date).format('ddd MMM DD YYYY');
    const startTime = startPart.split(' at ')[1];
    const endTime = endPart ? endPart.split(' at ')[1] : '';

    return (
        <div className="container my-5">
            <div className="row g-lg-5 align-items-start">
                <div className="col-lg-5">
    <div className="card border-0 shadow-sm p-4 mb-4">
        <div className="mb-3 pb-3 border-bottom">
            <div className="d-flex align-items-start mb-3">
                <i className="bi bi-clock me-3 fs-5"></i>
                <div>
                    <p className="mb-0">{eventDate} at {startTime} to</p>
                    <p className="mb-0">{eventDate} at {endTime}</p>
                </div>
            </div>
            <div className="d-flex align-items-start mb-3">
                <i className="bi bi-geo-alt me-3 fs-5"></i>
                <div>
                    <p className="mb-0">{venue.split(',')[0]}</p>
                    <p className="mb-0">{venue.split(',')[1]}</p>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <i className="bi bi-currency-rupee me-3 fs-5"></i>
                <p className="mb-0 fs-5">
                    {isPaid ? price.toLocaleString() : 'Free'}
                </p>
            </div>
        </div>
    </div>

    {/* Speakers Section */}
    <div>
        <h2 className="fw-bold mb-3 ml-8">
            Speakers: ({speakers.length})
        </h2>

        <div className="d-flex flex-row gap-4 mb-4" style={{ justifyContent: 'flex-start' }}>
            {speakers.map((speaker, index) => (
                <div key={index}
                    className="card text-center border-0 shadow-sm p-3"
                    style={{ minWidth: 220, marginRight: index !== speakers.length - 1 ? '20px' : '0' }}
                >
                    <div className="mx-auto mb-2">
                        <img
                            src={speaker.image || `https://i.pravatar.cc/150?img=${index + 1}`}
                            alt={speaker.name}
                            className="rounded-circle"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                    </div>
                    <h6 className="mb-1 fw-bold">{speaker.name}</h6>
                    <p className="mb-0">{speaker.title}</p>
                </div>
            ))}
        </div>
        <div className='justify-content-start d-flex mb-4'>
            <button className="btn btn-danger w-50 rounded">
                RSVP
            </button>
        </div>
    </div>
</div>

            </div>
        </div>
    );
};

export default EventDetails;
