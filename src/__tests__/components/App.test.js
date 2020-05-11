import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../components/App';
import Main from '../../components/Main';

configure({ adapter: new Adapter() })

describe('<App />', () => {
    it('App renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
    it('App contains Main component', () => {
        const component = shallow(<App />);
        expect(component.contains(<Main />)).toEqual(true);
    });
});

