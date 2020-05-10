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
      pictureFilter: "",
      isExecuted: false,
      currentPage: 2,
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

    this.applySearchAfterUserInput = (userInput, sortBy) => {
      getFetchPromise(userInput, sortBy).then((pictures) => {
          this.setPictures(pictures);
      });
    };

    this.handleSearchInputChange = (evt) => {
      if (this.checkIfInputIsNotNull(evt.target.value)) {
        this.setTargetedValue(evt.target.name, evt.target.value);
        this.applySearchAfterUserInput(evt.target.value, this.state.sortBy);
      } else {
        this.setPictures([]);
      }
    };

    this.handleScroll = async () => {
      if (
        window.scrollY > document.body.offsetHeight - window.outerHeight &&
        !this.state.isExecuted
      ) {
        this.setIsExecuted(true);

        await getFetchPromise(this.state.pictureFilter, this.state.currentPage)
            .then((pictures) => {
                const result = this.state.pictures.concat(pictures);
                this.setPictures(result);
            });
        this.increaseCurrentPage();
        this.setIsExecuted(false);
      }
    };

    this.handleSortByOptionChange = (value) => {
        console.log(value, this.state.pictureFilter);
      this.setTargetedValue('sortBy', value);
      if (this.state.pictureFilter && this.state.pictureFilter !== '') {
          this.applySearchAfterUserInput(this.state.pictureFilter, value);
      }
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div>
        <Navbar onSearchInputChange={this.handleSearchInputChange} onSortByOptionChange={this.handleSortByOptionChange} />
        <ImageGrid className="image-grid" images={this.state.pictures} />
      </div>
    );
  }
}

export default MainMenu;