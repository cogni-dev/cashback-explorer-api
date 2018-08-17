const request = require('supertest');
const { expect } = require('chai');
const { server, database } = require('../index');
const venueSeeds = require('../seeds/venues');

describe('venues', () => {
  let userToken = null;

  afterEach(() => database('users').del());

  beforeEach(async () => {
    const resp = await request(server)
      .post('/users')
      .send({
        name: 'user',
        email: 'user@site.com',
      });

    userToken = resp.headers.token;
  });

  it('gets venues', async () => {
    await venueSeeds.seed(database);

    const response = await request(server)
      .get('/venues')
      .query({ city: 'New York' })
      .set('token', userToken);

    expect(response.status).to.equal(200);
    expect(response.body.venues.length).not.to.equal(0);
  });

  it('creates a venue', async () => {
    const response = await request(server)
      .post('/venues')
      .send({
        lat: 11.234354,
        long: 22.234354,
        name: 'test venue',
        city: 'San Francisco',
        cashback: 10.2,
      })
      .set('token', userToken);

    expect(response.status).to.equal(201);
    expect(response.body.venue.city).to.equal('san francisco');
  });
});
