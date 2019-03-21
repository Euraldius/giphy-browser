import React from 'react';
import './GifColumn.css';
import Gif from './Gif';

const GifColumn = ({ gifs }) => (
  <div className="gif-column">
    {gifs.map((gif, i) => (
      <div key={i} className="gif-wrapper"><Gif gif={gif} /></div>
    ))}
  </div>
);

export default GifColumn;
