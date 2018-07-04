import moment from 'moment/moment';

export const options = data => ({
  title: {
    text: 'Retweets, Mentions & Favorites',
  },
  xAxis: {
    categories: data.map(el => moment(el.date).format('ddd, MMM D YYYY')),
    labels: {
      formatter: function() {
        return moment(this.value).format('MMM D');
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
    footerFormat: '</table>',
    pointFormatter: function() {
      const {
        index,
        series: { color, name },
      } = this;
      console.log(this);
      const diff =
        index !== 0 && data[index].data[name] - data[index - 1].data[name];
      return `<tr>
                <td style="color: ${color}">${name} </td>
                <td style="text-align: center"><b>${Math.round(
                  data[index].data[name] * 1000,
                ) / 1000}</b></td>
                ${
                  diff
                    ? `<td  style="text-align: right;color:${
                        diff > 0 ? 'green' : 'red'
                      }"><small>${diff > 0 ? '+' : ''}${diff}</small></td>`
                    : ''
                }
              </tr>`;
    },
    valueDecimals: 3,
  },
  series: [
    {
      name: 'retweets',
      data: data.map(
        el =>
          Number.isInteger(el.data.retweets)
            ? el.data.retweets
            : parseFloat(el.data.retweets),
      ),
      type: 'column',
    },
    {
      name: 'favorites',
      data: data.map(
        el =>
          Number.isInteger(el.data.favorites)
            ? el.data.favorites
            : parseFloat(el.data.favorites),
      ),
      type: 'column',
    },
    {
      name: 'mentions',
      data: data.map(
        el =>
          Number.isInteger(el.data.mentions)
            ? el.data.mentions
            : parseFloat(el.data.mentions),
      ),
      type: 'column',
    },
  ],
});
