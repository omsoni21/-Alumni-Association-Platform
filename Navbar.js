import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/gallery.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/upload">Upload Photos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;