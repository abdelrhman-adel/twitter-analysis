import React from 'react';
import PropTypes from 'prop-types';
import HighCharts from '../../modules/HighCharts';
import HighChartsReact from 'highcharts-react-official';
import { options } from './utils';

const BarChart = ({ data }) => (
  <HighChartsReact highcharts={HighCharts} options={options(data)} />
);

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      data: PropTypes.shape({
        favorites: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        retweets: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        mentions: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      }).isRequired,
    }),
  ).isRequired,
};

export default BarChart;
