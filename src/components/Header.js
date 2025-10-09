// src/Header.js
import React from 'react';

const Header = () => (
    <nav className="navbar navbar-light bg-light border-bottom p-3">
        <div className="container">
            <a className="navbar-brand text-danger fw-bold" href="/">
                Meetup
            </a>
            {/* The search box is integrated into the listings page as per the UI, but this simple header provides structure */}
        </div>
    </nav>
);

export default Header;