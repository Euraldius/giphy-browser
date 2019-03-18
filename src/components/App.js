import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint';
import './App.css';
import Gif from './Gif';
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

  render() {
    const { error, gifs, searchForGifs } = this.props;

    return (
      <div>
        <header className="gifs-header">
          { error ? <div className="error"><p>{error}</p></div> : null }
          <h1>Trending gifs!</h1>
          <Search onSubmit={searchForGifs} />
        </header>
        <ul className="gifs">
          {gifs.map(gif => <li className="gif" key={gif.id}><Gif gif={gif} /></li>)}
        </ul>
        { this.enableInfiniteScroll() ? <Waypoint key={gifs.length} onEnter={this.loadMoreGifs()} /> : null }
      </div>
    );
  }
}

export default App;
