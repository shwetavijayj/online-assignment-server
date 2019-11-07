const crypto = require('crypto');
const secret = 'thisapplicationishopeless';
const verificationToken = crypto
  .createHmac('sha256', secret)
  .update('I love cupcakes')
  .digest('hex');

console.log(verificationToken);
