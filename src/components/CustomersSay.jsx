import React from 'react';

const TestimonialCard = ({ name, image, rating, review }) => {
  return (
    <article className="card testimonial-card">
      <div className="testimonial-header">
        <img src={image} alt={name} className="testimonial-image" />
        <div className="testimonial-info">
          <h3 className="card-title">{name}</h3>
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p>{review}</p>
    </article>
  );
};

const CustomersSay = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      review: "The best Mediterranean food in Chicago! The atmosphere is wonderful and the staff is incredibly friendly.",
      image: process.env.PUBLIC_URL + '/sarah.png'
    },
    // Add more testimonials here
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2>What our customers say!</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomersSay; 