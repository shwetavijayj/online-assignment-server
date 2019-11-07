let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/OnlineAssignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let dbConnect = mongoose.connection;
if (!dbConnect) {
  console.log('Fail to connect with database');
  return;
}

var roleSchema = mongoose.Schema({
  roleId: Number,
  roleName: String
});

var userSchema = mongoose.Schema({
  UserId: String,
  UserName: String,
  Password: String,
  roleId: Number
});

var userDetailsSchema = mongoose.Schema({
  UserId: String,
  RollNumber: Number,
  FirstName: String,
  MiddleName: String,
  LastName: String,
  DateOfBirth: String,
  DegreeId: Number,
  YearId: Number,
  IsVerifiedUser: Number,
  VerificationToken: String
});

var degreeSchema = mongoose.Schema({
  DegreeId: Number,
  Degree: String
});

var yearSchema = mongoose.Schema({
  YearId: Number,
  Year: String
});

var loginStatusSchema = mongoose.Schema({
  LoginStatusId: String,
  UserId: String,
  DateTime: Date,
  IPAddress: String
});

var tokenSchema = mongoose.Schema({
  UserId: String,
  token: String
});

var subjectSchema = mongoose.Schema({
  SubjectId: String,
  SubjectName: String,
  YearId: Number
});

var StudentSubjectSchema = mongoose.Schema({
  RollNumber: Number,
  SubjectId: String
});

module.exports = {
  mongoose,
  roleSchema,
  userSchema,
  userDetailsSchema,
  degreeSchema,
  yearSchema,
  loginStatusSchema,
  tokenSchema,
  subjectSchema,
  StudentSubjectSchema
};
