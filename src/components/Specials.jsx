import React from 'react';
import { Link } from 'react-router-dom';

const SpecialCard = ({ title, price, description, image }) => {
  return (
    <article className="card special-card">
      <img src={process.env.PUBLIC_URL + '/greek salad.jpg'} alt={title} className="special-image" />
      <div className="special-content">
        <div className="special-header">
          <h3 className="card-title">{title}</h3>
          <span className="special-price">${price}</span>
        </div>
        <p>{description}</p>
        <Link to="/order" className="special-button">
          Order a delivery
        </Link>
      </div>
    </article>
  );
};

const Specials = () => {
  const specialItems = [
    {
      title: "Greek Salad",
      price: 12.99,
      description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
      image: "/images/greek-salad.jpg"
    },
    // Add more special items here
  ];

  return (
    <section className="specials">
      <div className="container">
        <div className="specials-header">
          <h2>This week's specials!</h2>
          <Link to="/menu" className="button">
            Online Menu
          </Link>
        </div>
        <div className="specials-grid">
          {specialItems.map((item, index) => (
            <SpecialCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specials; 