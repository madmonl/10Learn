import React from 'react';

export default ({ src, title, price, href }) => 
  <div onClick={() => window.open(href)} className="store--item">
    <img className="store--image" src={src} />
    <div className="store--item-description">
      <p className="store--item-title">{title}</p>
      <p className="store--item-price">{price}</p>
    </div>
  </div>