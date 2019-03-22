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
    const { fixed_width, original } = images;
    const fixedSizeStyle = {
      height: `${fixed_width.height}px`,
      width: `${fixed_width.width}px`,
    }

    return (
      <>
        {showFullGif && (
          <div className="full-size-gif">
            <div className="close-full-size">
              <button onClick={this.toggleFullSize}>X</button>
            </div>
            <img src={original.url} alt={title} />
          </div>
        )}
        <img
          alt={title}
          className="fixed-size-gif"
          onClick={this.toggleFullSize}
          src={fixed_width.url}
          style={fixedSizeStyle}
        />
      </>
    );
  }
}

export default Gif;
