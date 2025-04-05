import React from 'react';

const Chicago = () => {
  return (
    <section className="chicago">
      <div className="container">
        <div className="chicago-content">
          <div className="chicago-text">
            <h2>About</h2>
            <h3 className="subtitle">Little Lemon</h3>
            <p className="lead-text">
              Little Lemon opened in 1995 by two Italian brothers, Adrian and Mario.
              Despite the city's diversity, the two brothers recognized the lack of Mediterranean cuisine in Chicago,
              and were inspired to bring the flavors of their hometown in Italy to the people of Chicago.
            </p>
            <p>
              The two brothers continue to oversee the Little Lemon restaurant, nearly thirty years later.
              They maintain the same principles of fresh, delicious cooking served with warm hospitality that inspired them from the beginning.
            </p>
          </div>
          <div className="chicago-images">
            <img 
              src={process.env.PUBLIC_URL + '/Mario and Adrian A.jpg'} 
              alt="Mario and Adrian cooking" 
              className="chicago-img-top"
            />
            <img 
              src={process.env.PUBLIC_URL + '/Mario and Adrian B.jpg'} 
              alt="Mario and Adrian in the restaurant" 
              className="chicago-img-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chicago; 