import axios from 'axios';
import EP from '../consts/api';

export const chartRequest = ({ startDate, endDate, ids, metrics }) =>
  axios({
    method: 'get',
    url: EP.get,
    params: {
      start_date: startDate,
      end_Date: endDate,
      ids,
      metrics: metrics.join(','),
    },
  }).then(res => res.data.data);

export const charts = ({ startDate, endDate, ids }) => chartOptions => {
  chartOptions.forEach(({ metrics, cb, cbErr }) =>
    chartRequest({ startDate, endDate, ids, metrics })
      .then(cb)
      .catch(cbErr),
  );
};
