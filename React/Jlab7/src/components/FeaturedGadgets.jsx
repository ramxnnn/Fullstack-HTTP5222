import React from 'react';

const FeaturedGadgets = () => {
  const gadgets = [
    { name: 'Smartphone XYZ', price: '$699', image: '/images/1.jpg' },
    { name: 'Laptop Pro', price: '$1299', image: '/images/2.jpg' },
    { name: 'Wireless Headphones', price: '$199', image: '/images/3.jpg' },
    { name: 'Smartwatch', price: '$249', image: '/images/4.jpg' },
    { name: 'Tablet Plus', price: '$499', image: '/images/5.jpg' }
  ];

  return (
    <section style={{ padding: '2em', textAlign: 'center' }}>
      <h2>Featured Gadgets</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1em' }}>
        {gadgets.map((gadget, index) => (
          <div key={index} style={{ padding: '1em', backgroundColor: '#000000', borderRadius: '10px' }}>
            <img src={gadget.image} alt={gadget.name} style={{ width: '100%', borderRadius: '5px' }} />
            <h3>{gadget.name}</h3>
            <p>{gadget.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGadgets;
