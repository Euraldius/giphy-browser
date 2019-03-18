import React, { Component } from 'react';

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
      <input type="text" value={searchText} onChange={this.setValue} />
      <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Search;
