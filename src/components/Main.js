import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import ImageGrid from './ImageGrid/ImageGrid';
import './Main.css';
import getFetchPromise from '../lib/picturesRetriever';

let isScrollHandlerExecuting = false;

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pictures: [],
            totalPicturesCount: null,
            pageNo: 1,
            userInput: null,
        };

        this.setUserInput = this.setUserInput.bind(this);
        this.clearPictures = this.clearPictures.bind(this);
        this.isInputStillRelevant = this.isInputStillRelevant.bind(this);
        this.handleFiltersChange = this.handleFiltersChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    render() {
        return (
            <div>
                <Navbar
                    onFiltersChange={this.handleFiltersChange}
                    resultsCount={this.state.totalPicturesCount}
                />
                <ImageGrid
                    className='image-grid'
                    images={this.state.pictures}
                />
            </div>
        );
    }

    setUserInput(userInput) {
        this.setState({
            totalPicturesCount: null,
            pageNo: 1,
            userInput,
        });
    }

    clearPictures() {
        this.setState({
            pictures: [],
            totalPicturesCount: null,
        });
    }

    isInputStillRelevant(pictureFilter, sortBy) {
        return (
            pictureFilter === this.state.userInput.pictureFilter &&
            sortBy === this.state.userInput.sortBy
        );
    }

    handleFiltersChange(data) {
        const { pictureFilter, sortBy } = data;
        this.setUserInput(data);
        if (pictureFilter.trim().length === 0) {
            this.clearPictures();
            return;
        }

        getFetchPromise(pictureFilter, sortBy, 1).then((data) => {
            if (!this.isInputStillRelevant(pictureFilter, sortBy)) {
                // Newer search was made meanwhile, drop this response
                return;
            }
            const { pictures, total } = data;
            this.setState({
                pictures,
                totalPicturesCount: total,
                pageNo: 2,
            });
        });
    }

    handleScroll() {
        if (this.state.userInput.pictureFilter.trim().length === 0) {
            return;
        }

        if (
            !isScrollHandlerExecuting &&
            window.scrollY > document.body.offsetHeight - window.outerHeight
        ) {
            isScrollHandlerExecuting = true;
            const { pictureFilter, sortBy } = this.state.userInput;
            getFetchPromise(pictureFilter, sortBy, this.state.pageNo).then(
                (data) => {
                    if (this.isInputStillRelevant(pictureFilter, sortBy)) {
                        const { pictures } = data;
                        const newPictures = this.state.pictures.concat(pictures);
                        this.setState({
                            pictures: newPictures,
                            pageNo: this.state.pageNo + 1,
                        });
                    }
                    isScrollHandlerExecuting = false;
                }
            );
        }
    }
}

export default Main;
