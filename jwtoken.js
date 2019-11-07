var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var tokenStore = '';

var jwtsettings = {
  jwtSecret: 'thisismysecretkey'
};

app.set('jwtSecret', jwtsettings.jwtSecret);

const createToken = (data, callback) => {
  tokenStore = jwt.sign({ data }, app.get('jwtSecret'), { expiresIn: '24h' });
  if (tokenStore) {
    callback(null, tokenStore);
  } else {
    callback('Error');
  }
};

module.exports = {
  createToken
};
