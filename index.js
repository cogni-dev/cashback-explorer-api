require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const database = require('knex')(require('./knexfile')[process.env.NODE_ENV]);
const checkUser = require('./lib/checkUser')(database);
const UsersController = require('./controllers/UsersController')(database);
const VenuesController = require('./controllers/VenuesController')(database);
const AuthController = require('./controllers/AuthController')(database);
const StaticController = require('./controllers/StaticController');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.get('/', StaticController.index);
app.post('/users', UsersController.create);
app.post('/login', AuthController.login);
app.get('/profile', checkUser, UsersController.show);
app.get('/venues', checkUser, VenuesController.index);
app.post('/venues', checkUser, VenuesController.create);

app.listen(process.env.PORT);

module.exports = {
  server: app,
  database,
};
