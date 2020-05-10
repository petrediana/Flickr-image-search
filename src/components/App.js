import React, { Component } from 'react';
import MainMenu from '../components/MainMenu';

class App extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#eee" }}>
          <MainMenu/>
      </div>
    );
  }
}

export default App;