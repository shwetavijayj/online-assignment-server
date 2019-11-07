var mongo = require('../mongoConnector');
var tokenmodel = mongo.mongoose.model(
  'tokenstore',
  mongo.tokenSchema,
  'tokenStore'
);

const checkToken = (userData, callback) => {
  condition = {
    UserId: userData.UserId
  };
  tokenmodel.find(condition, (checkTokenError, res) => {
    if (checkTokenError) {
      callback(checkTokenError);
    } else {
      callback(null, res);
    }
  });
};

const deleteToken = (userData, callback) => {
  tokenmodel.deleteOne(userData, (deleteTokenErr, res) => {
    if (deleteTokenErr) {
      callback(deleteTokenErr);
    } else {
      callback(null, res);
    }
  });
};

module.exports = {
  checkToken,
  deleteToken
};
