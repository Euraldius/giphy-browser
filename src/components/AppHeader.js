import React from 'react';
import './AppHeader.css';
import Search from '../containers/Search';

const AppHeader = ({
  error,
  emptySearch,
  lastSearch,
  searchResultTotal,
  searching,
  showTrendingGifs,
}) => (
  <header className="gifs-header">
    { error && <div className="error"><p>{error}</p></div> }
    <h1>{ searching ? 'search results' : 'trending gifs' }</h1>
    <p className="powered-by">[powered by Giphy]</p>
    { !emptySearch && (
      <div className="header-search">
        <Search />
      </div>
    ) }
    { searching && searchResultTotal && (
      <p className="search-results">
        Your search for "{lastSearch}" has {searchResultTotal} results.
      </p>
    ) }
    { searching && (
      <div className="back-to-trending-wrapper">
        <button className="back-to-trending" onClick={showTrendingGifs}>
          {"(I'm done! Show me trending gifs <3)"}
        </button>
      </div>
    ) }
  </header>
);

export default AppHeader;
