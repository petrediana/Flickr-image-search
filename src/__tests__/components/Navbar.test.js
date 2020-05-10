import React from 'react';
import { render } from "@testing-library/react";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../../components/Navbar/Navbar.js';

configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
  it('NavBar renders without crashing', () => {
    render(<Navbar />);
  });

  it(`sets the handler for the <input>'s onChange event to the component's "onSearchInputChange" prop`, () => {
    const handler = () => {};
    const component = mount(<Navbar onSearchInputChange={handler}/>);

    const input = component.find('input');
    expect(input.props().onChange).toBe(handler);
  });
});