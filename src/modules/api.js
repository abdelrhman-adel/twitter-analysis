import axios from 'axios';
import EP from '../consts/api';

export const charts = ({ startDate, endDate, ids, metrics }) =>
  axios({
    method: 'get',
    url: EP.get,
    params: {
      start_date: startDate,
      end_Date: endDate,
      ids,
      metrics: metrics.join(','),
    },
  });
