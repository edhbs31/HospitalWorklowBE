const {
    HttpInvalidCLientKey,
  } = require('../HttpException/index');
  
  function enCodeClientkey(clientkey) {
    return Buffer.from(clientkey, 'base64').toString('ascii');
  }
  
  async function isValidClientKey(clientkey) {
    // encode client key to buffer base64
    const enCodeKey = enCodeClientkey(clientkey);
    if (enCodeKey) {
      //check if the encoded string is same with client key in env
      if(enCodeKey == process.env.CLIENT_KEY) {
        return true;
      }
    }
    return false;
  }
  
  async function MiddewareClient(req, res, next) {
    // get authorization from header
    if (req.headers.authorization) { 
      const clientkey = req.headers.authorization;
      if (clientkey) {
        // check is valid key or not
        const isValidKey = await isValidClientKey(clientkey);
        if (isValidKey) {
          next();
        } else {
          return HttpInvalidCLientKey(res);
        }
      } else {
        return HttpInvalidCLientKey(res);
      }
    } else {
      return HttpInvalidCLientKey(res);
    }
  }
  
  module.exports = {
    MiddewareClient,
  };
  