import React, { Component } from 'react';
import './App.css';
import Gif from './components/Gif';

class App extends Component {
  constructor() {
    super();

    this.state = {
      gifs: [],
      requestError: null,
    };
  }

  componentDidMount() {
    const { REACT_APP_GIPHY_API_KEY } = process.env;
    const trendingGifsURL = `https://api.giphy.com/v1/gifs/trending?apiKey=${REACT_APP_GIPHY_API_KEY}`;

    fetch(trendingGifsURL)
      .then(response => response.json())
      .then(({ data }) => {
        this.setState({ gifs: data });
      })
      .catch(() => {
        this.setState({
          requestError: 'There was an error fetching gifs. If you really really need them, try reloading the page.',
        });
      });
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
