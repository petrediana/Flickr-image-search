import React from 'react';
import ReactDOM from 'react-dom';
import ImageCell from '../../components/ImageCell/ImageCell.js';

describe("ImageCell", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<ImageCell />, div);
    });

    it('sets the <img> tag\'s "src" attribute to the component\'s "src" prop', () => {
        const div = document.createElement("div");
        const src = "http://localhost/test-src";
        const component = <ImageCell src={src} />;

        ReactDOM.render(component, div);

        const img = div.getElementsByTagName("img")[0];
        expect(img.src).toBe(src);
    });

    it(`sets the <img> tag's "alt" attribute to the component's "alt" prop`, () => {
        const div = document.createElement("div");
        const alt = "test-alt";
        const component = <ImageCell alt={alt} />;

        ReactDOM.render(component, div);

        const img = div.getElementsByTagName("img")[0];
        expect(img.alt).toBe(alt);
    });
});
