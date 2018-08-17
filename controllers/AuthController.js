const { omit } = require('lodash');
const jwt = require('jsonwebtoken');

module.exports = database => ({
  async login(req, res) {
    if (!req.headers.token) {
      res.status(403).json({
        errors: {
          token: 'must be in the headers',
        },
      });
      return;
    }

    let emailFromToken;

    try {
      emailFromToken = jwt.verify(req.headers.token, process.env.APP_SECRET, {
        ignoreExpiration: true,
      }).email;
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        res.sendStatus(403);
        return;
      }
      res.status(500).json(error);
      return;
    }

    const user = await database.where({
      email: emailFromToken,
    }).from('users').returning('*');

    if (!user[0]) {
      res.sendStatus(404);
      return;
    }

    const refreshedToken = jwt.sign({
      email: user[0].email,
    }, process.env.APP_SECRET, {
      expiresIn: '30 days',
    });

    res
      .status(202)
      .header('token', refreshedToken)
      .json({ user: omit(user[0], 'id') });
  },
});
