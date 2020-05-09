import React, { Component } from 'react'
import PhotoStore from '../store/PhotoStore';

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
                this.photoStore.emitter.addListener('GET_USERS_PICTURES_SUCCESS', () => {
                    this.setPictures(this.photoStore.picturesArr);
                });
        };
    }

    componentDidMount() {
        // this.photoStore.emitter.addListener('GET_TEST_ALL_SUCCESS', () => {
        //     this.setState({
        //         pictures: this.photoStore.picturesArr
        //     });
        // });
        // this.photoStore.testGetAllPhotos();
    }

    render() {
        return (
            <div>
                Main menu
                <div>
                    <input type="text" id="picture-filter" name="pictureFilter" placeholder="Search Pics"
                        onChange={this.handleChange} />
                </div>
                <div>
                    {  
                        this.state.pictures.map((e, i) => 
                        <img alt={this.pictureFilter} src={e} key={i}></img>)
                    }
                </div>
            </div>
        )
    }
}

export default MainMenu;