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

  render() {
    const {
      currentSearch,
      emptySearch,
      enableInfiniteScroll,
      gifs,
      loadMoreGifs,
    } = this.props;

    return (
      <div>
        <AppHeader {...this.props} />
        { emptySearch && (
          <div className="no-search-results">
            <p>Your search for "{currentSearch}" returned no results.</p>
            <p>Would you like to search for something else?</p>
            <Search />
          </div>
        ) }
        <GifGrid gifs={gifs} />
        { enableInfiniteScroll && <Waypoint key={gifs.length} onEnter={loadMoreGifs} /> }
      </div>
    );
  }
}

export default App;
