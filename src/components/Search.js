import React, { Component } from 'react';
import './Search.css';
import SearchIcon from './icons/SearchIcon';

class Search extends Component {
  onChange = ({ target: { value } }) => {
    this.props.onChange(value);
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit();
  }

  render() {
    const { searchTerm } = this.props;

    return (
      <form className="search" onSubmit={this.onSubmit}>
      <input
        aria-label="Search for gifs"
        placeholder="SEARCH FOR GIFS"
        onChange={this.onChange}
        type="search"
        value={searchTerm}
      />
      <button type="submit">
        <SearchIcon />
      </button>
      </form>
    );
  }
}

export default Search;
