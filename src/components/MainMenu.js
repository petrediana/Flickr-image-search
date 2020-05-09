import React, { Component } from 'react';
import PhotoStore from '../store/PhotoStore';
import  ImageGrid from './ImageGrid/ImageGrid';

class MainMenu extends Component {
    constructor() {
        super();

        this.state = {
            pictures: [],
            pictureFilter: ''
        };

        this.photoStore = new PhotoStore();

        this.handleChange = (evt) => {
            if (this.checkIfInputIsNotNull(evt.target.value)) {
                this.setTargetedValue(evt.target.name, evt.target.value);
                this.applySearchAfterUserInput(evt.target.value);                
            } else {
                this.setPictures([]);
            }
        };

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

        this.applySearchAfterUserInput = (searchInput) => {
            this.photoStore.getPicturesThatMatchUsersInput(searchInput);                
        };
    }

    componentDidMount() {
        this.photoStore.emitter.addListener('GET_USERS_PICTURES_SUCCESS', () => {
            this.setPictures(this.photoStore.picturesArr);
          }
        );

        
    }

    render() {
        return (
            <div>
                Main menu
                <div>
                    <input type="text" id="picture-filter" name="pictureFilter" placeholder="Search Pics"
                        onChange={this.handleChange} />
                </div>
                <ImageGrid images={this.state.pictures}/>
            </div>
        )
    }
}

export default MainMenu;