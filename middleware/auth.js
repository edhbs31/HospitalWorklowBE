/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const {
  HttpUnAuthenticate,
  HttptokenExpired,
} = require('../HttpException/index');

async function init(req, res, next) {
  // get access token from request headers
  let token = req.headers['x-access-token'];
  if (token) {
    // verify jwt
    await jwt.verify(token, process.env.JWT_KEY, (err, result) => {
      if (err) {
        return HttptokenExpired(res, err);
      }
      req.auth = result;
      next();
    });
  } else {
    return HttpUnAuthenticate(res);
  }
}

module.exports = init;
