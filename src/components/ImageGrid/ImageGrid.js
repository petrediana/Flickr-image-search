import React, { Component } from 'react';
import ImageCell from '../ImageCell/ImageCell';
import './ImageGrid.css';
import '../material.css';

class ImageGrid extends Component {
  getImageCells() {
    const images = this.props.images.filter(el => typeof el === 'string').map((image, index) => (
      <ImageCell
        className="elevation-2 round-corners-05"
        src={image}
        key={index}
      />
    ));

    return images;
  }
  
  render() {
    return (
      <div className="image-grid-container elevation-1 round-corners-025">
        { this.getImageCells() }
      </div>
    );
  }
}

export default ImageGrid;
