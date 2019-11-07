var uniqid = require('uniqid');

var mongo = require('../mongoConnector');
var createToken = require('../jwtoken');
var verifyToken = require('./verifyUser');
var userModel = mongo.mongoose.model('User', mongo.userSchema, 'users');
var tokenModel = mongo.mongoose.model('token', mongo.tokenSchema, 'token');
var loginStatusModel = mongo.mongoose.model(
  'loginStatus',
  mongo.loginStatusSchema,
  'loginStatus'
);

const loginUser = (userData, callback) => {
  userModel.findOne(
    { UserName: userData.UserName, Password: userData.Password },
    (findUserErr, findUserRes) => {
      if (findUserErr) {
        callback({ 'Authentication fail': findUserErr });
      } else {
        userCredentials = {
          Username: findUserRes.UserName,
          Password: findUserRes.Password
        };
        userIdDetails = {
          UserId: findUserRes.UserId
        };
        verifyToken.checkToken(
          userIdDetails,
          (checkTokenErr, checkTokenSuccess) => {
            if (checkTokenErr) {
              callback(checkTokenErr);
            } else {
              if (checkTokenSuccess !== null) {
                callback(null, checkTokenSuccess);
              } else {
                createToken.createToken(
                  userCredentials,
                  (createTokenError, tokenCreated) => {
                    if (createTokenError) {
                      console.log(createTokenError);
                    } else {
                      console.log('token', tokenCreated);
                      let tokenDetails = {
                        UserId: findUserRes.UserId,
                        token: tokenCreated
                      };
                      tokenModel.create(
                        tokenDetails,
                        (saveTokenError, tokenSaveSuccess) => {
                          if (saveTokenError) {
                            callback(saveTokenError);
                          } else {
                            let loginStatusDetails = {};
                            loginStatusModel.create(
                              loginStatusDetails,
                              (loginStatusSaveErr, loginStatusSaveSuccess) => {
                                if (loginStatusSaveErr) {
                                  callback(loginStatusSaveErr);
                                } else {
                                  callback(null, loginStatusSaveSuccess);
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          }
        );

        callback(null, 'success');
      }
    }
  );
};

const logout = (userData, callback) => {
  condition = {
    UserId: userData.UserId,
    token: userData.token
  };
  verifyToken.deleteToken(condition, (logoutError, logoutSuccess) => {
    if (logoutError) {
      callback(logoutError);
    } else {
      callback(null, logoutSuccess);
    }
  });
};

module.exports = {
  loginUser,
  logout
};

let myData = {
  UserName: 'Shweta',
  Password: 'shweta@1'
};
// let res = loginUser(myData, function(err, resl) {
//   if (err) {
//   } else {
//     console.log('resl');
//   }
// });
