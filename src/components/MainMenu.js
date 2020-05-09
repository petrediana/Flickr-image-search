import React, { Component } from 'react'
import PhotoStore from '../store/PhotoStore';

class MainMenu extends Component {
    constructor() {
        super();

        this.state = {
            pictures: []
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
                { this.state.pictures.map((e, i) => 
                    <img alt="cats" src={e} key={i}></img>)
                }
            </div>
        )
    }
}

export default MainMenu;