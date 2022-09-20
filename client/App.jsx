import React, { Component } from 'react';
import MainContainer from './components/MainContainer.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="header">Scrumify</h1>
        <MainContainer />
      </div>
    );

  }
}

export default App;