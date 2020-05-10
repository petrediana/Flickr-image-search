import React from 'react';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { expect } from 'chai';

import ImageGrid from '../../components/ImageGrid/ImageGrid.js';
import ImageCell from '../../components/ImageCell/ImageCell.js';

configure({ adapter: new Adapter() });

describe('<ImageGrid/>', () => {
  it('ImageGrid renders without crashing', () => {
    shallow(<ImageGrid images={[]}/>);
  });

  it('renders an <ImageCell /> for each image in the images prop', () => {
    const images = Array(10).fill("");
    const component = mount(<ImageGrid images={images} />);

    const imageCells = component.find(ImageCell);
    expect(imageCells.length).to.eq(10);
  });
});
