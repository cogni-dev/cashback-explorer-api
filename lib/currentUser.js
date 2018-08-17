const jwt = require('jsonwebtoken');

const getCurrentUser = async (req, database) => {
  const { email } = jwt.verify(req.headers.token, process.env.APP_SECRET);
  const user = await database.where({ email }).from('users').returning('*');
  return user[0];
};

module.exports = getCurrentUser;
