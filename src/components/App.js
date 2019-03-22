import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint';
import './App.css';
import AppHeader from './AppHeader';
import GifGrid from './GifGrid';
import Search from '../containers/Search';

class App extends Component {
  componentDidMount() {
    this.props.fetchTrendingGifs();
  }

  enableInfiniteScroll = () => {
    const { gifs, isFetching, allGifsLoaded } = this.props;

    return gifs.length > 0 && !isFetching && !allGifsLoaded;
  }

  loadMoreGifs = () => {
    const { fetchTrendingGifs, searchForGifs, searching } = this.props;

    return searching ? searchForGifs : fetchTrendingGifs;
  }

  emptySearch = () => {
    const { searching, searchResultTotal } = this.props;

    return searching && searchResultTotal === 0;
  }

  render() {
    const { gifs, gifListRefreshing, lastSearch } = this.props;

    return (
      <div>
        <AppHeader {...this.props} emptySearch={this.emptySearch()} />
        { this.emptySearch() ? (
          <div className="no-search-results">
            <p>Your search for "{lastSearch}" returned no results.</p>
            <p>Would you like to search for something else?</p>
            <Search />
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
