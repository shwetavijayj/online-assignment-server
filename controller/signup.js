const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const secret = 'thisapplicationishopeless';
const mongo = require('../mongoConnector');
const createToken = require('../jwtoken');

var userModel = mongo.mongoose.model('User', mongo.userSchema, 'users');
var userDetailsModel = mongo.mongoose.model(
  'UserDetails',
  mongo.userDetailsSchema,
  'UserDetails'
);
// to check email exist or not
const checkEmail = (userEmail, callback) => {
  condition = {
    UserName: userEmail
  };
  userModel.findOne(condition, (checkEmailErr, checkEmailSuccess) => {
    if (checkEmailErr) {
      callback(checkEmailErr);
    } else {
      console.log(checkEmailSuccess);
      if (checkEmailSuccess !== null) {
        callback({ statusCode: 422 });
      } else {
        callback(null, { statusCode: 500 });
      }
    }
  });
};

const signup = (userDetails, callback) => {
  checkEmail(userDetails.UserName, (checkEmailErr, checkEmailSuccess) => {
    if (checkEmailErr) {
      callback(checkEmailErr);
    } else {
      if (checkEmailSuccess.statusCode === 422) {
        callback({ errorMessage: 'Email already exist', statusCode: 422 });
      }
      if (checkEmailSuccess.statusCode === 500) {
        let userId = uniqid('stud-');
        let saltRounds = 10;

        let encryptedPassword = bcrypt.hash(
          userDetails.password,
          saltRounds,
          (errHash, hash) => {
            if (errHash) {
            } else {
              return hash;
            }
          }
        );
        let userDetailedInformation = {
          UserId: userId,
          RollNumber: userDetails.rollNumber,
          FirstName: userDetails.firstname,
          MiddleName: userDetails.middlename,
          LastName: userDetails.lastname,
          DateOfBirth: userDetails.dateOfBirth,
          DegreeId: userDetails.degreeId,
          YearId: userDetails.yearId,
          IsVerifiedUser: 0,
          VerificationToken: ''
        };
        createToken.createToken(
          { UserId: userId },
          (createTokenErr, createTokenSuccess) => {
            if (createTokenErr) {
            } else {
              userDetailedInformation.VerificationToken = createTokenSuccess;
            }
          }
        );

        let userLoginInformation = {
          UserId: userId,
          UserName: UserName,
          Password: encryptedPassword,
          roleId: userDetails.roleId
        };
        userDetailsModel.create(
          userDetailedInformation,
          (saveUserDetailsErr, saveUserDetailsSuccess) => {
            if (saveUserDetailsErr) {
              callback(saveUserDetailsErr);
            } else {
              userModel.create(
                userLoginInformation,
                (saveUserErr, saveUserSuccess) => {
                  if (saveUserErr) {
                    callback(saveUserErr);
                  } else {
                    callback(null, { msg: 'Data saved successfully' });
                  }
                }
              );
            }
          }
        );
      }
    }
  });
};

const verifyUser = () => {};

module.exports = {
  checkEmail,
  signup
};

// checkEmail('joshi', (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res);
//   }
// });
