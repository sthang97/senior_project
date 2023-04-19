// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import './Navbar.css';

const Navbar = () => {
  const signOut = async () => {
    try {
      await Auth.signOut();
      window.location.reload(); // Reload the page to redirect the user to the sign-in page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Account</Link>
        </li>
        <li>
          <Link to="/data">Data</Link>
        </li>
        <li>
          <Link to="/camera">Camera</Link>
        </li>
        <li>
          <button onClick={signOut} className="sign-out-button">Sign out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
