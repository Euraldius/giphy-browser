import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint';
import './App.css';
import Gif from './Gif';

class App extends Component {
  componentDidMount() {
    this.props.fetchTrendingGifs();
  }

  enableInfiniteScroll = () => {
    const { gifs, isFetching } = this.props;

    return gifs.length > 0 && !isFetching;
  }

  render() {
    const { error, fetchTrendingGifs, gifs } = this.props;

    return (
      <div>
        <header className="gifs-header">
          { error ? <div className="error"><p>{error}</p></div> : null }
          <h1>Trending gifs!</h1>
        </header>
        <ul className="gifs">
          {gifs.map(gif => <li className="gif" key={gif.id}><Gif gif={gif} /></li>)}
        </ul>
        { this.enableInfiniteScroll() ? <Waypoint key={gifs.length} onEnter={fetchTrendingGifs} /> : null }
      </div>
    );
  }
}

export default App;
