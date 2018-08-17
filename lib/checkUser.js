const getCurrentUser = require('./currentUser');

const checkUser = database => async (req, res, next) => {
  if (!req.headers.token) {
    res
      .status(403)
      .json({
        errors: {
          token: 'must be in the headers',
        },
      });
    return;
  }

  try {
    await getCurrentUser(req, database);
    next();
  } catch (error) {
    res
      .status(403)
      .json({
        errors: {
          token: 'token is invalid',
        },
      });
  }
};

module.exports = checkUser;
