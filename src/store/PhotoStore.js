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

    async testCatsTag() {
        try {
            const request = await fetch(API_WITH_CAT_TAG);
            const response = await request.json();
            console.log(response);

            this.picturesArr = response.photos.photo.map(pic => {
                const picSrcPath = this.getPictureSrcPath(pic);
                return picSrcPath;
            });
            this.emitter.emit('GET_TEST_CATS_SUCCESS');
        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_TEST_CATS_ERROR');
        }
    }
}

export default PhotoStore;