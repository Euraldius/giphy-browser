import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint';
import './App.css';
import GifList from './GifList';
import Search from './Search';

class App extends Component {
  componentDidMount() {
    this.props.fetchTrendingGifs();
  }

  enableInfiniteScroll = () => {
    const { gifs, isFetching } = this.props;

    return gifs.length > 0 && !isFetching;
  }

  loadMoreGifs = () => {
    const { fetchTrendingGifs, searchForGifs, searching, searchTerm } = this.props;

    return searching ? () => searchForGifs(searchTerm) : fetchTrendingGifs;
  }

  emptySearch = () => {
    const { searching, searchResultTotal } = this.props;

    return searching && searchResultTotal === 0;
  }

  render() {
    const {
      error,
      gifs,
      searchForGifs,
      searchResultTotal,
      searchTerm,
      searching,
    } = this.props;

    return (
      <div>
        <header className="gifs-header">
          { error ? <div className="error"><p>{error}</p></div> : null }
          <h1>trending gifs</h1>
          <p className="powered-by">[powered by Giphy]</p>
          { !this.emptySearch() ? <Search onSubmit={searchForGifs} /> : null }
          { searching && searchResultTotal ? (
            <p className="search-results">
              Your search for "{searchTerm}" has {searchResultTotal} results.
            </p>
          ) : null }
        </header>
        { this.emptySearch() ? (
          <div className="no-search-results">
            <p>Your search for "{searchTerm}" returned no results.</p>
            <p>Would you like to search for something else?</p>
            <Search onSubmit={searchForGifs} />
          </div>
        ): null }
        <GifList gifs={gifs} />
        { this.enableInfiniteScroll() ? (
          <Waypoint key={gifs.length} onEnter={this.loadMoreGifs()} />
        ) : null }
      </div>
    );
  }
}

export default App;
