import React, { Component } from 'react';
import ImageCell from '../ImageCell/ImageCell';
import './ImageGrid.css';
import '../material.css';
import empty from '../../res/empty.png';

class ImageGrid extends Component {
    render() {
        return (
            <div
                className={`${this.props.className} image-grid-container elevation-1 round-corners-025`}
            >
                {this.getContent()}
            </div>
        );
    }

    getContent() {
        return this.props.images.length > 0
            ? this.getImageCells()
            : this.getEmptyPlaceholder();
    }

    getImageCells() {
        const images = this.props.images.map((image, index) => (
            <ImageCell
                className="elevation-2 round-corners-05"
                src={image}
                key={index}
            />
        ));

        return images;
    }

    getEmptyPlaceholder() {
        return (
            <div>
                <img
                    className="empty-placeholder"
                    alt="empty content"
                    src={empty}
                ></img>
                <h2>This box is empty!</h2>
            </div>
        );
    }
}

export default ImageGrid;
