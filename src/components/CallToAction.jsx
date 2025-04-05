import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <h1>Little Lemon</h1>
          <h2 className="subtitle">Chicago</h2>
          <p className="lead-text">
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </p>
          <Link to="/reservations" className="button">
            Reserve a Table
          </Link>
        </div>
        <div className="hero-image">
          <img src={process.env.PUBLIC_URL + '/restauranfood.jpg'}/>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 