import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import { charts } from './modules/api';
import { formatDate } from './modules/helpers';
import LineGraph from './components/LineGraph/LineGraph';
import BarChart from './components/BarChart/BarChart';
import Block from './components/Block/Block';
import { dateOptions } from './consts/date-options';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: dateOptions[1].handler(),
      endDate: moment(),
      ids: 'thecounter',
      optionSelected: 1,
      lineGraphLoading: false,
      lineGraphError: false,
      lineGraphData: [],
      barChartLoading: false,
      barChartError: false,
      barChartData: [],
    };

    this.updateChartsData = this.updateChartsData.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
    this.dateChanged = this.dateChanged.bind(this);
  }
  componentWillMount() {
    this.updateChartsData();
  }

  updateChartsData() {
    const { startDate, endDate, ids } = this.state;
    this.setState(
      {
        lineGraphLoading: true,
        lineGraphError: false,
        barChartLoading: true,
        barChartError: false,
      },
      charts({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        ids,
      })([
        {
          metrics: ['interactions_per_follower'],
          cb: lineGraphData =>
            this.setState({ lineGraphData, lineGraphLoading: false }),
          cbErr: () =>
            this.setState({ lineGraphError: true, lineGraphLoading: false }),
        },
        {
          metrics: ['retweets', 'favorites', 'mentions'],
          cb: barChartData =>
            this.setState({ barChartData, barChartLoading: false }),
          cbErr: () =>
            this.setState({ barChartError: true, barChartLoading: false }),
        },
      ]),
    );
  }

  inputChanged({ target: { value } }) {
    this.setState({ ids: value });
  }
  dateChanged({ target: { value } }) {
    this.setState(
      {
        optionSelected: value,
        startDate: dateOptions[value].handler(),
      },
      this.updateChartsData,
    );
  }
  render() {
    const {
      ids,
      optionSelected,
      lineGraphData,
      barChartData,
      lineGraphLoading,
      barChartLoading,
      lineGraphError,
      barChartError,
    } = this.state;
    return (
      <div className="app">
        <header className="app__header">
          <div>
            <label>Display data for : </label>
            <select
              disabled={lineGraphLoading || barChartLoading}
              className="select-date"
              value={optionSelected}
              onChange={this.dateChanged}
            >
              {dateOptions.map((option, index) => (
                <option key={index} value={index}>
                  {option.title}
                </option>
              ))}
            </select>
            <select
              disabled={lineGraphLoading || barChartLoading}
              className="select-date"
            >
              <option>daily</option>
              <option>weekly</option>
              <option>monthly</option>
              ))}
            </select>
          </div>

          <div>
            <label>user id : </label>
            <input
              disabled={lineGraphLoading || barChartLoading}
              value={ids}
              className="user-input"
              placeholder="enter user's Id"
              onChange={this.inputChanged}
              onBlur={this.updateChartsData}
            />
          </div>
        </header>
        <section className="app__content">
          <Block
            title="Interactions Per Follower "
            isLoading={lineGraphLoading}
            hasError={lineGraphError}
            errorHandler={this.updateChartsData}
          >
            <LineGraph data={lineGraphData} />
          </Block>
          <Block
            title="Retweets, Favorites & Mentions"
            isLoading={barChartLoading}
            hasError={barChartError}
            errorHandler={this.updateChartsData}
          >
            <BarChart data={barChartData} />
          </Block>
        </section>
      </div>
    );
  }
}

export default App;
