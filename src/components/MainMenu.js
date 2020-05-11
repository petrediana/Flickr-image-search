import React, { Component } from 'react';
import ImageGrid from './ImageGrid/ImageGrid';
import Navbar from './Navbar/Navbar';
import './MainMenu.css';
import getFetchPromise from '../lib/picturesRetriever';

class MainMenu extends Component {
    constructor() {
        super();

        this.state = {
            pictures: [],
            pictureFilter: '',
            isExecuted: false,
            currentPage: 1,
            totalPicturesCount: null,
        };

        this.checkIfInputIsNotNull = (input) => {
            return input.trim().length > 0 ? true : false;
        };

        this.setTargetedValue = (targetName, targetValue) => {
            this.setState({
                [targetName]: targetValue,
            });
        };

        this.setPictures = (value) => {
            this.setState({
                pictures: value,
            });
        };

        this.increaseCurrentPage = () => {
            this.setState({
                currentPage: this.state.currentPage + 1,
            });
        };

        this.setIsExecuted = (value) => {
            this.setState({
                isExecuted: value,
            });
        };

        this.applySearchAfterUserInput = (userInput, sortBy, pageNo) => {
            getFetchPromise(userInput, sortBy, pageNo).then((data) => {
                const { pictures, total } = data;
                if (
                    userInput === this.state.pictureFilter &&
                    sortBy === this.state.sortBy
                ) {
                    this.increaseCurrentPage();
                    this.setPictures(pictures);
                    this.setTargetedValue("totalPicturesCount", total);
                }
            });
        };

        this.handleSearchInputChange = (evt) => {
            this.setTargetedValue(evt.target.name, evt.target.value);
            if (this.checkIfInputIsNotNull(evt.target.value)) {
                this.setTargetedValue("currentPage", 1);
                this.applySearchAfterUserInput(
                    evt.target.value,
                    this.state.sortBy,
                    1
                );
            } else {
                this.setPictures([]);
            }
        };

        this.handleScroll = async () => {
            if (
                window.scrollY >
                    document.body.offsetHeight - window.outerHeight &&
                !this.state.isExecuted &&
                this.checkIfInputIsNotNull(this.state.pictureFilter)
            ) {
                this.setIsExecuted(true);

                await getFetchPromise(
                    this.state.pictureFilter,
                    this.state.sortBy,
                    this.state.currentPage
                ).then((data) => {
                    const { pictures } = data;
                    const result = this.state.pictures.concat(pictures);
                    this.increaseCurrentPage();
                    this.setPictures(result);
                });
                this.setIsExecuted(false);
            }
        };

        this.handleSortByOptionChange = (value) => {
            console.log(value, this.state.pictureFilter);
            this.setTargetedValue("sortBy", value);
            this.setTargetedValue("currentPage", 1);
            if (this.state.pictureFilter && this.state.pictureFilter !== "") {
                this.applySearchAfterUserInput(
                    this.state.pictureFilter,
                    value,
                    this.state.currentPage
                );
            }
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    render() {
        return (
            <div>
                <Navbar
                    onSearchInputChange={this.handleSearchInputChange}
                    onSortByOptionChange={this.handleSortByOptionChange}
                    resultsCount={this.state.totalPicturesCount}
                />
                <ImageGrid
                    className="image-grid"
                    images={this.state.pictures}
                />
            </div>
        );
    }
}

export default MainMenu;