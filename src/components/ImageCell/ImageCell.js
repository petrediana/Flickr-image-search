import React, { Component } from 'react';
import './ImageCell.css';

class ImageCell extends Component {
  render() {
    return (
      <div className={`${this.props.className} image-cell`}>
        <img
          alt={this.props.alt}
          src={this.props.src}
        />
      </div>
    );
  }
}

export default ImageCell;
