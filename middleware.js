const checkInternetConnected = require('check-internet-connected');

module.exports = function checkNet(req, res, next) {
    checkInternetConnected()
    .then((result) => {
      console.log('DONE');//successfully connected to a server
      next()
    })
    .catch((ex) => {
        res.status(400).send('Internet connection is required')
// cannot connect to a server or error occurred.
    });
  };