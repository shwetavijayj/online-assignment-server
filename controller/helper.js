const mongo = require('../mongoConnector');
const roleModel = mongo.mongoose.model('Role', mongo.roleSchema, 'role');
const degreeModel = mongo.mongoose.model(
  'Degree',
  mongo.degreeSchema,
  'degree'
);
const yearModel = mongo.mongoose.model('Year', mongo.yearSchema, 'year');
var userModel = mongo.mongoose.model('User', mongo.userSchema, 'users');
const addNewRecord = (newRecord, callback) => {
  switch (newRecord.collection) {
    case 'ROLE':
      getCountOfRecords('ROLE', (countError, recordCount) => {
        if (countError) {
        } else {
          roleDetails = {
            roleId: recordCount + 1,
            roleName: newRecord
          };
          roleModel.create(roleDetails, (saveRoleErr, saveRoleRes) => {
            if (saveRoleErr) {
            } else {
              callback(null, { msg: 'role saved success' });
            }
          });
        }
      });
      break;
    case 'DEGREE':
      getCountOfRecords('DEGREE', (countError, recordCount) => {
        if (countError) {
        } else {
          degreeDetails = {
            DegreeId: recordCount + 1,
            Degree: newRecord
          };
          degreeModel.create(degreeDetails, (saveDegreeErr, saveDegreeRes) => {
            if (saveDegreeErr) {
            } else {
              callback(null, { msg: 'degree saved success' });
            }
          });
        }
      });
      break;
    case 'YEAR':
      getCountOfRecords('YEAR', (countError, recordCount) => {
        if (countError) {
        } else {
          yearDetails = {
            YearId: recordCount + 1,
            Year: newRecord
          };
          yearModel.create(yearDetails, (saveYearErr, saveRoleRes) => {
            if (saveYearErr) {
            } else {
              callback(null, { msg: 'role saved success' });
            }
          });
        }
      });
      break;
    default:
      break;
  }
};

const getCountOfRecords = (collectionName, callback) => {
  switch (collectionName) {
    case 'ROLE':
      roleModel.countDocuments({}, (getCountErr, getCountSuccess) => {
        if (getCountErr) {
        } else {
          callback(null, getCountSuccess);
        }
      });
      break;
    case 'DEGREE':
      degreeModel.countDocuments({}, (getCountErr, getCountSuccess) => {
        if (getCountErr) {
        } else {
          callback(null, getCountSuccess);
        }
      });
      break;
    case 'YEAR':
      yearModel.countDocuments({}, (getCountErr, getCountSuccess) => {
        if (getCountErr) {
        } else {
          callback(null, getCountSuccess);
        }
      });
      break;
    default:
      break;
  }
};

// module.exports = {
//   addNewRecord,
//   getCountOfRecords
// };

getCountOfRecords('User', (err, res) => {
  if (err) {
  } else {
  }
});
