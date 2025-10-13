import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(location.search);
        if (searchTerm.trim()) {
            params.set('search', searchTerm.trim());
        } else {
            params.delete('search');
        }
        navigate({ pathname: '/', search: params.toString() });
    };

    return (
        <nav className="navbar navbar-light bg-light border-bottom py-3">
            <div className="container">
                <a href="/" className="navbar-brand meetup-logo">
                    meetup
                </a>
                <form className="ms-auto" style={{ width: '350px' }} onSubmit={handleSearch}>
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-search text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search by title and t..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </nav>
    );
};

export default Header;