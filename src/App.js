import React, { Component } from 'react';
import moment from 'moment';

import logo from './logo.svg';
import './App.css';
import { charts } from './modules/api';
import { formatDate } from './modules/helpers';
import LineGraph from './components/LineGraph/LineGraph';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
        .subtract(1, 'months')
        .add(1, 'days'),
      endDate: moment(),
      ids: 'thecounter',
      isLoading: false,
      lineGraphData: [],
      BarChartData: [],
    };
  }
  componentWillMount() {
    this.updateChartsData();
  }

  updateChartsData() {
    const { startDate, endDate, ids } = this.state;
    charts({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      ids,
    })([
      {
        metrics: ['interactions_per_follower'],
        cb: lineGraphData => this.setState({ lineGraphData }),
      },
      {
        metrics: ['retweets', 'favorites', 'mentions'],
        cb: BarChartData => this.setState({ BarChartData }),
      },
    ]);
  }
  render() {
    const { lineGraphData } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <LineGraph data={lineGraphData} />
      </div>
    );
  }
}

export default App;
