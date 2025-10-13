import React, { useState } from 'react';

const Header = ({ setSearchTerm }) => {
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(input); 
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
              placeholder="Search by title and tags..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Header;
