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
                {/* Main Content Left */}
                <div className="col-lg-7">
                    <h1 className="mb-3 fw-bold">{title}</h1>
                    <p className="mb-4">
                        Hosted By:<br />
                        <strong>{hostedBy}</strong>
                    </p>
                    <div className="card mb-4 border-0 shadow-sm">
                        <img
                            src={image}
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
                        <h3 className="h5 fw-bold mb-3">Additional Information:</h3>
                        <p className="mb-2"><strong>Dress Code:</strong> {additionalInfo.dressCode}</p>
                        <p className="mb-0"><strong>Age Restrictions:</strong> {additionalInfo.ageRestrictions}</p>
                    </div>
                    <div className="mb-5">
                        <h3 className="h5 fw-bold mb-3">Event Tags:</h3>
                        <div className="d-flex flex-wrap gap-2">
                            {tags.map(tag => (
                                <span key={tag} className="badge bg-danger px-3 py-2 rounded">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

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
                    <div style={{ position: "relative" }}>
                        <h2 className="h5 fw-bold mb-3">Speakers: ({speakers.length})</h2>
                        <div className="d-flex flex-row gap-3 justify-content-center mb-4 flex-wrap">
                        {speakers.map((speaker, index) => (
                            <div key={index} className="card text-center border-0 shadow-sm p-3" style={{ minWidth: 220 }}>
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
                        <div className='justify-content-center d-flex mb-4'>
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
