import React from 'react';

const Hero = () => (
  <section style={{
    backgroundImage: 'url(https://source.unsplash.com/featured/?smartphone)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
  }}>
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '1em', borderRadius: '10px' }}>
      <h2>The Future of Tech</h2>
      <p>Explore the latest gadgets and innovations</p>
    </div>
  </section>
);

export default Hero;
