import React, { Component } from 'react';
import PhotoStore from '../store/PhotoStore';
import  ImageGrid from './ImageGrid/ImageGrid';
import  Navbar  from './Navbar/Navbar';
import './MainMenu.css';

class MainMenu extends Component {
    constructor() {
        super();

        this.state = {
            pictures: [],
            pictureFilter: '',
            isExecuted: false,
            currentPage: 2
        };

        this.photoStore = new PhotoStore();

        this.checkIfInputIsNotNull = (input) => {
            return input.trim().length > 0 ? true : false;
        };

        this.setTargetedValue = (targetName, targetValue) => {
            this.setState({
                [targetName]: targetValue
            });
        };

        this.setPictures = (value) => {
            this.setState({
                pictures: value
            });
        };

        this.increaseCurrentPage = () => {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        };

        this.setIsExecuted = (value) => {
            this.setState({
                isExecuted: value
            });
        };

        this.applySearchAfterUserInput = (searchInput) => {
            this.photoStore.getPicturesThatMatchUsersInput(searchInput, 1);                
        };

        this.handleChange = (evt) => {
            if (this.checkIfInputIsNotNull(evt.target.value)) {
                this.setTargetedValue(evt.target.name, evt.target.value);
                this.applySearchAfterUserInput(evt.target.value);                
            } else {
                this.setPictures([]);
            }
        };

        this.handleScroll = async () => {
            if (window.scrollY > (document.body.offsetHeight - window.outerHeight) && !this.state.isExecuted) {
                this.setIsExecuted(true);
                
                await this.photoStore.getPicturesThatMatchUsersInput(this.state.pictureFilter, this.state.currentPage);
                this.increaseCurrentPage();

                setTimeout(() => {
                    this.setIsExecuted(false);
                }, 1000);
            }    
        };
    }

    componentDidMount() {
        this.photoStore.emitter.addListener('GET_USERS_PICTURES_SUCCESS', () => {
            this.setPictures(this.photoStore.picturesArr);
          }
        );

        window.addEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <div>
                <Navbar onSearchInputChange={this.handleChange} />
                <ImageGrid className="image-grid" images={this.state.pictures}/>
            </div>
        )
    }
}

export default MainMenu;