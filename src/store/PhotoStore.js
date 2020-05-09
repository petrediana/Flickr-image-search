import { EventEmitter } from 'fbemitter';
import config from '../constants/config';
const API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&'
            + 'api_key=' + config
            +'&content_type=1&is_getty=1'


const API_WITH_CAT_TAG
= 'https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=15b67c2a8b4288ff1fddf5eb56655cfb&tags=cat&content_type=1&is_getty=1'

class PhotoStore {
    constructor() {
        this.emitter = new EventEmitter();
        this.picturesArr = [];
    }

    getPictureSrcPath(pic) {
        const picSrcPath
            = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
        return picSrcPath;
    }

    getFilteredPictures(tokenToContain, photoList) {
        return photoList.filter(picture => picture.title.includes(tokenToContain));
    }

    async getPicturesThatMatchUsersInput(userInput) {
        try {
            const request = await fetch(API_URL);
            const response = await request.json();
            //console.log(response);
            
            const filteredPicturesWithUserInput = this.getFilteredPictures(userInput, response.photos.photo);
            this.picturesArr = response.photos.photo.map(pic => {
                if (pic.title.includes(userInput)) {
                    const picSrcPath = this.getPictureSrcPath(pic);
                    return picSrcPath;
                }
            });
            this.emitter.emit('GET_USERS_PICTURES_SUCCESS');
        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_USERS_PICTURES_ERROR');
        }
    }

    async testCatsTag() {
        try {
            const request = await fetch(API_WITH_CAT_TAG);
            const response = await request.json();
            //console.log(response);

            const filteredCatPictures = this.getFilteredPictures('cat', response.photos.photo);
            this.picturesArr = filteredCatPictures.map(pic => {
                const picSrcPath = this.getPictureSrcPath(pic);
                return picSrcPath;
            });
            this.emitter.emit('GET_TEST_CATS_SUCCESS');
        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_TEST_CATS_ERROR');
        }
    }

    async testGetAllPhotos() {
        try {
            const request = await fetch(API_URL);
            const response = await request.json();

            this.picturesArr = response.photos.photo.map(pic => {
                const picSrcPath = this.getPictureSrcPath(pic);
                return picSrcPath;
            });
            this.emitter.emit('GET_TEST_ALL_SUCCESS');
        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_TEST_ALL__ERROR');
        }
    }
}

export default PhotoStore;