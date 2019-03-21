import React, { Component } from 'react';
import './Search.css';
import SearchIcon from './icons/SearchIcon';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
    }
  }

  setValue = ({ target: { value } }) => {
    this.setState({
      searchText: value,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { searchText } = this.state;

    onSubmit(searchText);
  }

  render() {
    const { searchText } = this.state;

    return (
      <form className="search" onSubmit={this.onSubmit}>
      <input
        ariaLabel="Search for gifs"
        placeholder="SEARCH FOR GIFS"
        onChange={this.setValue}
        type="text"
        value={searchText}
      />
      <button type="submit">
        <SearchIcon />
      </button>
      </form>
    );
  }
}

export default Search;
