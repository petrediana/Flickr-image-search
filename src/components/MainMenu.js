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
    }

    componentDidMount() {
        this.photoStore.testCatsTag();
        this.photoStore.emitter.addListener('GET_TEST_CATS_SUCCESS', () => {
            this.setState({
                pictures: this.photoStore.picturesArr
            });
        });

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