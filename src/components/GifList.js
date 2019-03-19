import React from 'react';
import './GifList.css';
import Gif from './Gif';

const GifList = ({ gifs }) => (
  <div className="gifs">
    {gifs.map(gif => (
      <div key={gif.id} className="gif"><Gif gif={gif} /></div>
    ))}
  </div>
);

export default GifList;
