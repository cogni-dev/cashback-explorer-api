const jwt = require('jsonwebtoken');

const getCurrentUser = async (req, database) => {
  const { uuid } = jwt.verify(req.headers.token, process.env.APP_SECRET);
  const user = await database.where({ uuid }).from('users').returning('*');
  return user[0];
};

module.exports = getCurrentUser;
