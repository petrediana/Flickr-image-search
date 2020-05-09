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
            this.setState({
                [evt.target.name]: evt.target.value
            });
            console.log(evt.target.value)

            this.photoStore.getPicturesThatMatchUsersInput(evt.target.value);
            this.photoStore.emitter.addListener('GET_USERS_PICTURES_SUCCESS', () => {
                this.setState({
                    pictures: this.photoStore.picturesArr
                });
            });

            console.log(this.photoStore.picturesArr)
        }
    }

    componentDidMount() {
        this.photoStore.emitter.addListener('GET_TEST_CATS_SUCCESS', () => {
            this.setState({
                pictures: this.photoStore.picturesArr
            });
        });
        this.photoStore.testCatsTag();
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
                    { this.state.pictures.map((e, i) => 
                        <img alt="cats" src={e} key={i}></img>)
                    }
                </div>
            </div>
        )
    }
}

export default MainMenu;