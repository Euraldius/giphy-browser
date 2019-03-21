import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import './GifGrid.css';
import GifColumn from './GifColumn';

const COLUMN_WIDTH_PX = 200;
const COLUMN_GUTTER_PX = 10;

class GifGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnCount: 1,
      gridPaddingPx: 0,
    };

    this.debouncedCalculateColumnCount = debounce(this.calculateColumnCount, 200);
  }

  componentDidMount() {
    this.calculateColumnCount();

    window.addEventListener('resize', this.debouncedCalculateColumnCount);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedCalculateColumnCount);
  }

  calculateColumnCount = () => {
    const columnWidth = COLUMN_WIDTH_PX + COLUMN_GUTTER_PX;
    let columnCount = parseInt(window.innerWidth / columnWidth, 10);
    const containerWidth = columnWidth * columnCount - COLUMN_GUTTER_PX;
    const gridPaddingPx = (window.innerWidth - containerWidth) / 2;

    if (columnCount < 1) {
      columnCount = 1;
    }

    this.setState({
      columnCount,
      gridPaddingPx: parseInt(gridPaddingPx, 10),
    });
  }

  columns = () => {
    const { gifs } = this.props;
    const { columnCount } = this.state;
    const columns = []

    for (let i = 0; i < gifs.length; i++) {
      const columnIndex = i % columnCount;

      if (!columns[columnIndex]) {
        columns[columnIndex] = [];
      }

      columns[columnIndex].push(gifs[i]);
    }

    return columns;
  }

  render() {
    const { gridPaddingPx } = this.state;
    const gridStyle = {
      paddingLeft: `${gridPaddingPx}px`,
      paddingRight: `${gridPaddingPx}px`,
    };

    return (
      <div className="gifs" style={gridStyle}>
        {this.columns().map((column, i) => (
          <GifColumn key={i} gifs={column} />
        ))}
      </div>
    );
  }
}

export default GifGrid;
