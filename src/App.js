import React, { Component } from 'react';
import './App.css';
import TabComponent from './Components/tab.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React/Electron</h2>
        </div>
          <TabComponent/>
      </div>
    );
  }
}

export default App;