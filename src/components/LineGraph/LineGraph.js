import React from 'react';
import PropTypes from 'prop-types';
import HighCharts from '../../modules/HighCharts';
import HighChartsReact from 'highcharts-react-official';
import { options } from './utils';

const LineGraph = ({ data }) => (
  <HighChartsReact highcharts={HighCharts} options={options(data)} />
);

LineGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      data: PropTypes.shape({
        interactions_per_follower: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]).isRequired,
      }).isRequired,
    }),
  ).isRequired,
};

export default LineGraph;
