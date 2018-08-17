// @flow

require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const util = require('util');

const database = require('knex')(require('./knexfile')[process.env.NODE_ENV]);

const checkUser = require('./lib/checkUser')(database);
const UsersController = require('./controllers/UsersController')(database);
const VenuesController = require('./controllers/VenuesController')(database);
const AuthController = require('./controllers/AuthController')(database);

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.post('/users', UsersController.create);
app.post('/login', AuthController.login);

app.get('/profile', checkUser, UsersController.show);
app.get('/venues', checkUser, VenuesController.index);
app.post('/venues', checkUser, VenuesController.create);

app.use((err, req, res, next) => {
  if (err) {
    util.inspect(err);
  }
  next();
});

app.listen(process.env.PORT);

module.exports = {
  server: app,
  database,
};
