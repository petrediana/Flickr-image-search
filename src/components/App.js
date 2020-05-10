import React, { Component } from 'react';
import config from '../constants/config';
import MainMenu from '../components/MainMenu';

class App extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#eee" }}>
          App started
          <MainMenu/>
      </div>
    );
  }
}

export default App;