import moment from 'moment';
import { formatDate, limitDecimals, parseFloatIfNecessary } from './helpers';

it('should format the date properly', () => {
  const curMoment = moment('2018-11-24T15:20:00Z');
  expect(formatDate('YYYY-MM-DD')(curMoment)).toBe('2018-11-24');
});

it('should limit the decimal digits ', () => {
  expect(limitDecimals(3)(0.005432)).toBe(0.005);
  expect(limitDecimals(3)(0.005532)).toBe(0.006);
});


it('should parse float if the float is a string ', () => {
  expect(parseFloatIfNecessary('0.005432')).toBe(0.005432);
  expect(parseFloatIfNecessary(0.005432)).toBe(0.005432);
});
