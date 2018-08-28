const { omit } = require('lodash');
const currentUser = require('../lib/currentUser');
const stringIsValid = require('../lib/stringIsValid');

const validate = (params) => {
  const errors = [];
  if (!stringIsValid(params.city)) {
    errors.push({
      city: 'is invalid',
    });
  }

  if (!stringIsValid(params.name)) {
    errors.push({
      name: 'is invalid',
    });
  }

  if (!Number(params.lat) || Number(params.lat) < -85 || Number(params.lat) > 85) {
    errors.push({
      lat: 'is invalid (could be between -85 and 85)',
    });
  }

  if (!Number(params.long) || Number(params.long) < -180 || Number(params.long) > 180) {
    errors.push({
      long: 'is invalid (could be between -180 and 180)',
    });
  }

  if (!Number(params.cashback) || Number(params.cashback) < 0 || Number(params.cashback) > 80) {
    errors.push({
      cashback: 'is invalid (could be between -0 and 80)',
    });
  }

  if (errors.length) {
    return { valid: false, errors };
  }

  return { valid: true };
};

module.exports = database => ({
  async index(req, res) {
    if (!req.query.city) {
      res
        .status(400)
        .json({
          errors: {
            city: 'must be specified',
          },
        });
      return;
    }

    const safeString = String(req.query.city).toLowerCase().substr(0, 30);

    try {
      const venues = await database.where({ city: safeString }).from('venues').returning('*');

      if (venues.length === 0) {
        res
          .status(404)
          .json({
            error: { venues: `not found in the city ${req.query.city}` },
          });
        return;
      }

      res.json({
        venues,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async create(req, res) {
    const validation = validate(req.body);
    if (!validation.valid) {
      res
        .status(400)
        .json({ errors: validation.errors });
      return;
    }

    try {
      const user = await currentUser(req, database);

      const venue = await database.insert({
        city: String(req.body.city.toLowerCase()),
        name: String(req.body.name),
        lat: Number(req.body.lat),
        long: Number(req.body.long),
        cashback: Number(req.body.cashback),
        user_id: Number(user.id),
      }).into('venues').returning('*');

      res.status(201).json({
        venue: {
          ...omit(venue[0], ['id', 'user_id']),
          user: omit(user, 'id'),
        },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
});
