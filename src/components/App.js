import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint';
import './App.css';
import GifGrid from './GifGrid';
import Search from './Search';

class App extends Component {
  componentDidMount() {
    this.props.fetchTrendingGifs();
  }

  enableInfiniteScroll = () => {
    const { gifs, isFetching, allGifsLoaded } = this.props;

    return gifs.length > 0 && !isFetching && !allGifsLoaded;
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
      gifListRefreshing,
      searchForGifs,
      searchResultTotal,
      searchTerm,
      searching,
    } = this.props;

    return (
      <div>
        <header className="gifs-header">
          { error ? <div className="error"><p>{error}</p></div> : null }
          <h1>{ searching ? 'search results' : 'trending gifs' }</h1>
          <p className="powered-by">[powered by Giphy]</p>
          { !this.emptySearch() ? (
            <div className="header-search">
              <Search onSubmit={searchForGifs} />
            </div>
          ): null }
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
        { !gifListRefreshing ? <GifGrid gifs={gifs} /> : null }
        { this.enableInfiniteScroll() ? (
          <Waypoint key={gifs.length} onEnter={this.loadMoreGifs()} />
        ) : null }
      </div>
    );
  }
}

export default App;
