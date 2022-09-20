const {User} = require('../models/models');

const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  const { username, password} = req.body;
  User.findOne({username: username}, '_id', (err, user) => {
    if (err) {
      console.log(err);
      return next({
        method: 'setSSIDCookie',
        type: 'Middleware error',
        error: err
      });
    }
    res.cookie('ssid', `${user._id}`, {httpOnly: true});
    next();
  });
};






module.exports = cookieController;