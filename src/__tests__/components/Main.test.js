import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";
import sinon from 'sinon';

import Main from '../../components/Main';
import ImageGrid from '../../components/ImageGrid/ImageGrid';
import Navbar from '../../components/Navbar/Navbar';

configure({ adapter: new Adapter() });

function stubFetch() {
    const fakePhoto = {
        farm: "test-farm",
        server: "test-server",
        id: "test-id",
        secret: "test-secret",
    };
    const data = {
        photos: { photo: Array(10).fill(fakePhoto), total: 10 },
    };
    const fakeResponse = Promise.resolve({ json: () => data });
    const fakeFetch = Promise.resolve(fakeResponse);
    const fetchStub = sinon.stub(global, "fetch");
    fetchStub.returns(fakeFetch);
    return fetchStub;
}
const flushPromises = () => new Promise(setImmediate);

describe('<Main />', () => {
    it(`renders without crashing`, () => {
        mount(<Main />);
    });

    it(`sets the <ImageGrid> component's "images" attribute to the component's "pictures" prop`, () => {
        const component = mount(<Main />);
        const pictures = Array(10).fill('');

        component.setState({ pictures });

        const imageGrid = component.find(ImageGrid).first();
        expect(imageGrid.props().images.length).to.eq(10);
    });

    it(`sets a handler for the <Navbar> component's "onFiltersChange"`, () => {
        const component = mount(<Main />);
        const instance = component.instance();
        const handleFiltersChangeSpy = sinon.spy(instance, 'handleFiltersChange');

        instance.forceUpdate();
        component.update();

        const navbar = component.find(Navbar).first();
        expect(navbar.props().onFiltersChange).instanceOf(Function);
        expect(navbar.props().onFiltersChange).to.eq(handleFiltersChangeSpy);
        handleFiltersChangeSpy.restore();
    });

    it(`doesn't call "getFetchPromise" if the input is empty`, () => {
        const fetchStub = sinon.stub(global, 'fetch');
        const component = mount(<Main />);
        const navbar = component.find(Navbar);

        const pictureFilter = '';
        const sortBy = 'test-sortby';
        navbar.props().onFiltersChange({ pictureFilter, sortBy });

        expect(fetchStub.called).to.be.false;
        fetchStub.restore();
    });

    it(`calls "getFetchPromise" if the input is not empty`, () => {
        const fetchStub = stubFetch();

        const component = mount(<Main />);
        const navbar = component.find(Navbar);

        const pictureFilter = 'test-filter';
        const sortBy = 'test-sortby';
        navbar.props().onFiltersChange({ pictureFilter, sortBy });

        expect(fetchStub.called).to.be.true;
        fetchStub.restore();
    });

    it(`updates the <ImageGrid> component's pictures with the data retrieved from "getFetchPromise"`, async () => {
        const fetchStub = stubFetch();
        const pictures = Array(10).fill(
            "https://farmtest-farm.staticflickr.com/test-server/test-id_test-secret.jpg"
        );
        const component = mount(<Main />);
        const navbar = component.find(Navbar);

        const pictureFilter = 'test-filter';
        const sortBy = 'test-sortby';
        navbar.props().onFiltersChange({ pictureFilter, sortBy });
        await flushPromises();
        component.update();

        const imageGridPictures = component.find(ImageGrid).props().images;
        expect(fetchStub.called).to.be.true;
        expect(imageGridPictures.length).to.eq(10);
        expect(imageGridPictures).to.include.members(pictures);
        fetchStub.restore();
    });
});
