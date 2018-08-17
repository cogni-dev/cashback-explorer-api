const request = require('supertest');
const jwt = require('jsonwebtoken');
const { expect } = require('chai');
const { server, database } = require('../index');

describe('authentication', () => {
  afterEach(() => database('users').del());

  it('creates user', async () => {
    const res = await request(server)
      .post('/users')
      .send({
        name: 'user',
        email: 'user@site.com',
      });

    // console.log(res);
    expect(res.status).to.equal(201);
    expect(Object.keys(res.headers).includes('token')).to.be.true; // eslint-disable-line
    expect(res.body.user.email).to.equal('user@site.com');
  });

  it('responds with 403 if no token given', async () => {
    const res = await request(server)
      .get('/venues')
      .query({ city: 'New York' });

    expect(res.status).to.equal(403);
  });

  it('responds with 403 if wrong token provided', async () => {
    const res = await request(server)
      .get('/venues')
      .query({ city: 'New York' })
      .set('token', 'bad token');

    expect(res.status).to.equal(403);
    expect(res.body.errors.token).to.equal('token is invalid');
  });

  it('responds with 200 if token is valid', async () => {
    const response = await request(server)
      .post('/users')
      .send({
        name: 'user',
        email: 'user@site.com',
      });

    const res = await request(server)
      .get('/profile')
      .set('token', response.headers.token);

    expect(res.status).to.equal(200);
    expect(res.body.user.email).to.equal('user@site.com');
  });

  it('logs user in if token expired', async () => {
    const payload = {
      name: 'user',
      email: 'user@site.com',
    };

    await database.insert(payload).into('users');

    const token = jwt.sign(payload, process.env.APP_SECRET, {
      expiresIn: '0 seconds',
    });

    const response = await request(server)
      .post('/login')
      .send(payload)
      .set('token', token);

    expect(response.status).to.equal(202);
    expect(response.headers.token).not.to.equal(token);
  });
});
