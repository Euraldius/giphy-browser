import React from 'react';
import './SearchIcon.css';

const SearchIcon = () => (
  <svg viewBox="0 0 200 200" className="search-icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <ellipse cx="100" cy="100" rx="50" ry="50" strokeWidth="10"></ellipse>
    <path strokeWidth="10" d="M 100 25 L 100 75"></path>
    <path strokeWidth="10" d="M 25 100 L 75 100"></path>
    <path strokeWidth="10" d="M 100 125 L 100 175"></path>
    <path strokeWidth="10" d="M 125 100 L 175 100"></path>
  </svg>
);

export default SearchIcon;
