const { random, round } = require('lodash');

const venues = [1, 2, 3, 4, 5].map(index => ({
  name: `Venue ${index}`,
  city: 'new york',
  cashback: round(random(3, 12, true), 1),
  lat: round(random(40, 41, true), 6),
  long: round(random(-73, -74, true), 6),
}));

exports.seed = knex => knex('venues').del()
  .then(() => knex('venues').insert(venues));
