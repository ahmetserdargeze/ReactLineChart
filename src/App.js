import React, { Component } from 'react';
import './App.css';
import DynamicLineChart from './component/DynamicLineChart';
// import Socket from './component/Connection';

class App extends Component {
  render() {
    return (
      <div className="App">
          <DynamicLineChart/>
      </div>
    );
  }
}

export default App;
// export default Chart;
