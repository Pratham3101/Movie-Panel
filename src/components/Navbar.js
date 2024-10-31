import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); 
    if (searchQuery) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`); 
      setSearchQuery(''); 
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MovieDb</Link>
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/popular">Popular</Link>
        <Link to="/top-rated">Top Rated</Link>
        <Link to="/upcoming">Upcoming</Link>
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Movie Name" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="hamburger-icon">&#9776;</span>
      </div>
    </nav>
  );
};

export default Navbar;
