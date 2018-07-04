import moment from 'moment';
import {
  formatDate,
  parseFloatIfNecessary,
} from '../../modules/helpers';

/**
 * configures chart based on the data it got from the API request
 * @param data
 * @return {Object}
 */

export const options = data => ({
  title: {
    text: 'Retweets, Mentions & Favorites',
  },
  xAxis: {
    categories: data.map(el => formatDate('ddd, MMM D YYYY')(moment(el.date))),
    labels: {
      formatter: function() {
        return formatDate('MMM D')(moment(this.value));
      },
    },
  },
  yAxis: {
    gridLineWidth: 1,
    title: {
      text: 'Retweets, Mentions & Favorites',
    },
  },
  plotOptions: {
    column: {
      stacking: 'normal',
    },
  },
  tooltip: {
    shared: true,
    useHTML: true,
    headerFormat: '<small>{point.key}</small><table>',
    pointFormatter: function() {
      const {
        index,
        series: { color, name },
      } = this;
      const diff =
        index !== 0 && data[index].data[name] - data[index - 1].data[name];
      return `<tr>
                <td style="color: ${color}">${name} </td>
                <td style="text-align: center"><b>${
                  data[index].data[name]
                }</b></td>
                ${
                  diff
                    ? `<td  style="text-align: right;color:${
                        diff > 0 ? 'green' : 'red'
                      }"><small>${diff > 0 ? '+' : ''}${diff}</small></td>`
                    : ''
                }
              </tr>`;
    },
    footerFormat: '</table>',
    valueDecimals: 3,
  },
  series: [
    ...['retweets', 'favorites', 'mentions'].map(key => ({
      name: key,
      data: data.map(el => parseFloatIfNecessary(el.data[key])),
      type: 'column',
    })),
  ],
});
