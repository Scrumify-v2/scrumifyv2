const { User, Task } = require('../models/models');

const userController = {};

userController.createUser = async (req, res, next) => {
  if (!req.body.username) {
    return next({
      log: 'userController.createUser ERROR: missing required username',
      status: 400,
      message: 'Username required',
    });
  }
  if (!req.body.password) {
    return next({
      log: 'userController.createUser ERROR: missing required password',
      status: 400,
      message: 'Password required',
    });
  }

  try {
    const { username, password } = req.body;
    const user = await User.create({
      username: username,
      password: password,
    });
    res.locals.createUser = user;
    return next();
  } catch (error) {
    return next({
      log: 'userController.createUser ERROR: could not create user- db error or malformed query',
      status: 500,
      message: { err: error },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  if (!req.body.username) {
    return next({
      log: 'userController.createUser ERROR: missing required username',
      status: 400,
      message: 'Username required',
    });
  }
  if (!req.body.password) {
    return next({
      log: 'userController.createUser ERROR: missing required password',
      status: 400,
      message: 'Password required',
    });
  }

  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({
      username: username,
      password: password,
    });
    res.locals.foundUser = foundUser;
    return next();
  } catch (error) {
    return next({
      log: 'userController.verifyUser ERROR: Invalid username or password',
      status: 500,
      message: { err: error },
    });
  }
};

module.exports = userController;
