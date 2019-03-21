import React from 'react';
import './AppHeader.css';
import Search from './Search';

const AppHeader = ({
  error,
  emptySearch,
  searchForGifs,
  searchResultTotal,
  searchTerm,
  searching,
  showTrendingGifs,
}) => (
  <header className="gifs-header">
    { error ? <div className="error"><p>{error}</p></div> : null }
    <h1>{ searching ? 'search results' : 'trending gifs' }</h1>
    <p className="powered-by">[powered by Giphy]</p>
    { !emptySearch ? (
      <div className="header-search">
        <Search onSubmit={searchForGifs} />
      </div>
    ): null }
    { searching && searchResultTotal ? (
      <p className="search-results">
        Your search for "{searchTerm}" has {searchResultTotal} results.
      </p>
    ) : null }
    { searching ? (
      <div className="back-to-trending-wrapper">
        <button className="back-to-trending" onClick={showTrendingGifs}>
          {"(I'm done! Show me trending gifs <3)"}
        </button>
      </div>
    ) : null }
  </header>
);

export default AppHeader;
