import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../components/App';
import MainMenu from '../../components/MainMenu';

configure({ adapter: new Adapter() })

describe('<App />', () => {
    test('App renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
    test('App contains MainMenu component', () => {
        const component = shallow(<App />);
        expect(component.contains(<MainMenu />)).toEqual(true);
    });
});

