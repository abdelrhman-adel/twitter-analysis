import React, { Component } from 'react';
import moment from 'moment';

import logo from './logo.svg';
import './App.css';
import { charts } from './modules/api';
import { formatDate } from './modules/helpers';
import LineGraph from './components/LineGraph/LineGraph';
import BarChart from './components/BarChart/BarChart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
        .subtract(10, 'years')
        .add(1, 'days'),
      endDate: moment(),
      ids: 'thecounter',
      isLoading: false,
      lineGraphError: false,
      lineGraphData: [],
      barChartError: false,
      barChartData: [],
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
        cbErr: () => this.setState({ lineGraphError: true }),
      },
      {
        metrics: ['retweets', 'favorites', 'mentions'],
        cb: barChartData => this.setState({ barChartData }),
        cbErr: () => this.setState({ barChartError: true }),
      },
    ]);
  }
  render() {
    const { lineGraphData, barChartData } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <LineGraph data={lineGraphData} />
        <BarChart data={barChartData} />
      </div>
    );
  }
}

export default App;
