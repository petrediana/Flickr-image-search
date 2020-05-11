import React from 'react';
import { render } from '@testing-library/react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import Navbar from '../../components/Navbar/Navbar.js';

configure({ adapter: new Adapter() });

describe("<Navbar />", () => {
    it("renders without crashing", () => {
        render(<Navbar />);
    });

    it(`sets the handler for the <input>'s onChange event
        to a method calling the component's onFiltersChange prop`, () => {
        const handler = sinon.stub();
        const getInputValueStub = sinon.stub(Navbar.prototype, 'getInputValue');
        getInputValueStub.returns(0);
        const getSelectedValueStub = sinon.stub(Navbar.prototype, 'getSelectedValue');
        const component = mount(<Navbar onFiltersChange={handler} />);

        const input = component.find("input");
        input.props().onChange();

        expect(getInputValueStub.calledTwice).toBe(true);
        expect(getSelectedValueStub.calledOnce).toBe(true);
        expect(handler.calledOnce).toBe(true);
        getInputValueStub.restore();
        getSelectedValueStub.restore();
    });

    it(`sets the handler for the <select>'s onChange event
        to a method calling the component's onFiltersChange prop`, () => {
        const handler = sinon.stub();
        const getInputValueStub = sinon.stub(Navbar.prototype, 'getInputValue');
        getInputValueStub.returns(0);
        const getSelectedValueStub = sinon.stub(Navbar.prototype, 'getSelectedValue');
        const component = mount(<Navbar onFiltersChange={handler} />);

        const select = component.find("select");
        select.props().onChange();

        expect(getInputValueStub.calledTwice).toBe(true);
        expect(getSelectedValueStub.calledOnce).toBe(true);
        expect(handler.calledOnce).toBe(true);
        getInputValueStub.restore();
        getSelectedValueStub.restore();
    });
});