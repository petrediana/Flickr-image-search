import sinon from 'sinon';
import getFetchPromise from '../../lib/picturesRetriever';
import FLICKR_API_KEY from '../../constants/config';
import { expect } from 'chai';

const API_URL =
    'https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&' +
    'api_key=' +
    FLICKR_API_KEY +
    '&content_type=1&is_getty=1';

describe('picutresRetriever', () => {
    it('calls the right url when using getFetchPromise', () => {
        const stub = sinon.stub(global, 'fetch');
        const userInput = 'test-input';
        const pageNo = 5;
        const sortBy = 'test-sort';
        const expectedUrl = `${API_URL}&text=${userInput}&per_page=${20}&page=${pageNo}&sort=${sortBy}`;

        getFetchPromise(userInput, sortBy, pageNo);

        const acutalUrl = stub.getCalls()[0].args[0];
        expect(stub.calledOnce).to.be.true;
        expect(acutalUrl).to.eq(expectedUrl);
        stub.restore();
    });

    it('calls the right url when using getFetchPromise without providing pageNo or sortBy arguments', () => {
        const stub = sinon.stub(global, 'fetch');
        const userInput = 'test-input';
        const expectedUrl = `${API_URL}&text=${userInput}&per_page=${20}&page=1&sort=relevance`;

        getFetchPromise(userInput);

        const acutalUrl = stub.getCalls()[0].args[0];
        expect(stub.calledOnce).to.be.true;
        expect(acutalUrl).to.eq(expectedUrl);
        stub.restore();
    });

    it('maps the fetch response to an array containing the pictures urls', async (done) => {
        const fakePhoto = {
            farm: 'test-farm',
            server: 'test-server',
            id: 'test-id',
            secret: 'test-secret',
        };
        const expectedPhotoUrl = `https://farm${fakePhoto.farm}.staticflickr.com/${fakePhoto.server}/${fakePhoto.id}_${fakePhoto.secret}.jpg`;
        const data = {
            photos: { photo: Array(10).fill(fakePhoto), total: 10 },
        };
        const fakeResponse = Promise.resolve({ json: () => data });
        const fakeFetch = Promise.resolve(fakeResponse);
        const stub = sinon.stub(global, 'fetch');
        stub.returns(fakeFetch);

        const photos = await getFetchPromise('test-input');

        expect(photos.pictures.length).to.eq(10);
        expect(photos.total).to.eq(10);
        photos.pictures.forEach((photo) =>
            expect(photo).to.eq(expectedPhotoUrl)
        );
        stub.restore();
        done();
    });
});
