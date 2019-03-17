import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import './App.css';
import Gif from './components/Gif';

class App extends Component {
  constructor() {
    super();

    this.state = {
      gifs: [],
      requestError: null,
      giphyResultsOffset: 0,
    };

    this.throttledFetchTrendingGifs = throttle(this.fetchTrendingGifs, 500);
  }

  componentDidMount() {
    this.fetchTrendingGifs();

    document.addEventListener('scroll', this.scrollInfinitely);
  }

  fetchTrendingGifs = () => {
    const { giphyApiHost } = this.props;
    const { gifs, giphyResultsOffset } = this.state;
    const { REACT_APP_GIPHY_API_KEY } = process.env;
    const trendingGifsURL = `${giphyApiHost}/v1/gifs/trending?apiKey=${REACT_APP_GIPHY_API_KEY}&offset=${giphyResultsOffset}`;

    fetch(trendingGifsURL)
      .then(response => response.json())
      .then(({ data, pagination: { offset, count } }) => {
        this.setState({
          gifs: gifs.concat(data),
          giphyResultsOffset: offset + count + 1,
          requestError: null,
        });
      })
      .catch(() => {
        this.setState({
          requestError: 'There was an error fetching gifs. If you really really need them, try reloading the page.',
        });
      });
  }

  scrollInfinitely = () => {
    if (this.atBottomOfDocument()) {
      this.throttledFetchTrendingGifs();
    }
  }

  atBottomOfDocument = () => {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  render() {
    const { requestError, gifs } = this.state;

    return (
      <div>
        <header className="gifs-header">
          { requestError ? <div className="error"><p>{requestError}</p></div> : null }
          <h1>Trending gifs!</h1>
        </header>
        <ul className="gifs">
          {gifs.map(gif => <li className="gif" key={gif.id}><Gif gif={gif} /></li>)}
        </ul>
      </div>
    );
  }
}

export default App;
