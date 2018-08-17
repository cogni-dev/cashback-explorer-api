const { omit } = require('lodash');
const jwt = require('jsonwebtoken');
const EmailValidator = require('email-validator');
const currentUser = require('../lib/currentUser');
const stringIsValid = require('../lib/stringIsValid');

const validate = (params) => {
  if (!stringIsValid(params.name)) {
    return {
      valid: false,
      errors: {
        name: 'is invalid',
      },
    };
  }
  if (!stringIsValid(params.email) || !EmailValidator.validate(params.email)) {
    return {
      valid: false,
      errors: {
        email: 'is invalid',
      },
    };
  }

  return { valid: true };
};

module.exports = database => ({
  async create(req, res) {
    const validation = validate(req.body);
    if (!validation.valid) {
      res
        .status(400)
        .json(validation);
      return;
    }

    try {
      const user = await database.insert({
        name: String(req.body.name),
        email: String(req.body.email),
      }).returning('*').into('users');

      const token = jwt.sign({
        email: user[0].email,
      }, process.env.APP_SECRET, {
        expiresIn: '30 days',
      });

      res
        .header('token', token)
        .status(201)
        .json({ user: omit(user[0], 'id') });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async show(req, res) {
    try {
      const user = await currentUser(req, database);

      if (user.length === 0) {
        res
          .status(404)
          .end();
        return;
      }

      res.json({
        user: {
          uuid: user.uuid,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
});
