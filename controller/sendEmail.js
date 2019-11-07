const nodemailer = require('nodemailer');

var sendRegistrationMail = function(user, callback) {
  var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user: 'shweta.joshi@harbingergroup.com',
      pass: 'Bekind@3'
    }
  });

  let mailOptions = {
    from: 'shweta.joshi@harbingergroup.com',
    to: user.email,
    subject: 'test mail',
    html: `Hello ${user.name},<br> Thank you for registration.To verify your account please click below link<br><a href='${user.link}'>click here</a><br><strong>Do not reply to this mail.</strong>`
  };

  transporter.sendMail(mailOptions, function(err, result) {
    if (err) {
      console.log('err', err);
      callback(err);
    } else {
      console.log('success');
      callback(null, result);
    }
  });
};

// function call
let myAccount = {
  name: 'Shweta Joshi',
  email: 'shweta.joshi@harbingergroup.com',
  link: 'xyz.com'
};
let res = sendRegistrationMail(myAccount, function(err, res) {
  if (err) {
  } else {
    console.log(res);
  }
});
