import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import MainMenu from '../../components/MainMenu';
import ImageGrid from '../../components/ImageGrid/ImageGrid';
import Navbar from '../../components/Navbar/Navbar';

configure({ adapter: new Adapter() });

describe('<MainMenu />', () => {
  it(`Sets the <ImageGrid> component's "images" attribute to the component's "pictures" prop`, () => {
    const component = mount(<MainMenu />);
    const pictures = Array(10).fill('');

    component.setState({ pictures });

    const imageGrid = component.find(ImageGrid).first();
    expect(imageGrid.props().images.length).to.eq(10);
  });

  it(`Sets a handler for the <Navbar> component's "onSearchInputChange"`, () => {
    const component = mount(<MainMenu />);

    const navbar = component.find(Navbar).first();
    expect(navbar.props().onSearchInputChange).instanceOf(Function);
  });
});
