import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sitemap</h3>
          <nav className="footer-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/reservations">Reservations</Link></li>
              <li><Link to="/order">Order Online</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="hours-list">
            <li>
              <span>Little Lemon</span>
            </li>
            <li>
              <span>123 Main Street</span>
            </li>
            <li>
              <span>Chicago, Illinois 60611</span>
            </li>
            <li>
            <span>Phone: (123) 456-7890</span>
            </li>

          </ul>
        </div>

        <div className="footer-section">
          <h3>Social Media</h3>
          <div className="social-links">
            <a href="https://facebook.com/littlelemon" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://instagram.com/littlelemon" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://twitter.com/littlelemon" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://youtube.com/littlelemon" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Opening Hours</h3>
          <ul className="hours-list">
            <li>
              <span>Monday - Friday:</span>
            </li>
            <li>
              <span>11:00 AM - 9:00 PM</span>
            </li>
            <li>
              <span>Saturday - Sunday:</span>
            </li>
            <li>
            <span>10:00 AM - 10:00 PM</span>
            </li>

          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div>
          <p>&copy; {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;