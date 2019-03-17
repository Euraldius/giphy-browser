import React, { Component } from 'react';
import './Gif.css';

class Gif extends Component {
  constructor() {
    super();

    this.state = {
      showFullGif: false,
    };
  }

  toggleFullSize = () => {
    this.setState({
      showFullGif: !this.state.showFullGif,
    });
  };

  render() {
    const { showFullGif } = this.state;
    const { gif } = this.props;
    const { images, title } = gif;
    const { fixed_height, original } = images;

    return (
      <>
        {showFullGif ? (
          <div className="full-size-gif">
            <button className="close-full-size" onClick={this.toggleFullSize}>X</button>
            <img src={original.url} alt={title} />
          </div>
        ): null}
        <img className="fixed-size-gif" onClick={this.toggleFullSize} src={fixed_height.url} alt={title} />
      </>
    );
  }
}

export default Gif;
