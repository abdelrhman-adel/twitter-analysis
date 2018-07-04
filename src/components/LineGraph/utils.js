import moment from 'moment/moment';

export const options = data => ({
  title: {
    text: 'Interactions Per Follower',
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
      text: 'interactions per Follower',
    },
    labels: {
      formatter: function() {
        return `${this.value}%`;
      },
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
      const diff =
        index !== 0 &&
        Math.round(
          (data[index].data.interactions_per_follower -
            data[index - 1].data.interactions_per_follower) *
            1000,
        ) / 1000;
      return `<tr>
                <td style="color: ${color}">${name} </td>
                <td style="text-align: center"><b>${Math.round(
                  data[index].data.interactions_per_follower * 1000,
                ) / 1000}%</b></td>
                ${diff &&
                  `<td  style="text-align: right;color:${
                    diff > 0 ? 'green' : 'red'
                  }"><small>${diff > 0 ? '+' : ''}${diff}</small></td>`}
              </tr>`;
    },
    valueDecimals: 3,
  },
  series: [
    {
      name: 'Interactions per Follower',
      data: data.map(el => el.data.interactions_per_follower),
      color: '#35BDA8',
      type: 'area',
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [[0, 'rgba(59, 189, 168, .2)'], [1, 'rgba(59, 189, 168, 0)']],
      },
      lineWidth: '1',
      marker: {
        symbol: 'circle',
      },
    },
  ],
});
