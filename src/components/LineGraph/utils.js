import moment from 'moment/moment';

export const options = data => ({
  title: {
    text: 'Interactions Per Follower',
  },
  xAxis: {
    categories: data.map(el => moment(el.date).format('MMM D')),
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
  series: [
    {
      name: 'Interactions per Follower',
      data: data.map(
        el => Math.round(el.data.interactions_per_follower * 1000) / 1000,
      ),
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
