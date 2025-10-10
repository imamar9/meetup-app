import React, { useState } from 'react';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            window.location.href = `/?search=${encodeURIComponent(searchTerm)}`;
        } else {
            window.location.href = '/';
        }
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