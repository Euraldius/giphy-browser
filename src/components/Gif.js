import React, { Component } from 'react';
import './Gif.css';

class Gif extends Component {
  constructor() {
    super();

    this.state = {
      showFullGif: false,
    };
  }

  showFullGif = () => {
    this.setState({
      showFullGif: true,
    });
  }

  render() {
    const { showFullGif } = this.state;
    const { gif } = this.props;
    const { images, title } = gif;
    const { fixed_height, original } = images;

    return (
      <>
        {showFullGif ? (
          <div className="full-size-gif">
            <img src={original.url} alt={title} />
          </div>
        ): null}
        <img onClick={this.showFullGif} src={fixed_height.url} alt={title} />
      </>
    );
  }
}

export default Gif;
