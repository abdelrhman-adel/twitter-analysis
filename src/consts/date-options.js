import moment from 'moment';


// options of the date pickers with its handler to pick the starting date dynamically
export const dateOptions = [
  {
    title: 'last week',
    handler: () =>
      moment()
        .subtract(1, 'weeks')
        .add(1, 'days'),
  },
  {
    title: 'last month',
    handler: () =>
      moment()
        .subtract(1, 'months')
        .add(1, 'days'),
  },
  {
    title: 'last 3 months',
    handler: () =>
      moment()
        .subtract(3, 'months')
        .add(1, 'days'),
  },
  {
    title: 'last 6 months',
    handler: () =>
      moment()
        .subtract(6, 'months')
        .add(1, 'days'),
  },
  {
    title: 'last year',
    handler: () =>
      moment()
        .subtract(1, 'years')
        .add(1, 'days'),
  },
  {
    title: 'last 10 year ( should give an error )',
    handler: () =>
      moment()
        .subtract(10, 'years')
        .add(1, 'days'),
  },
];
