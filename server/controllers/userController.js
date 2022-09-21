const {User, Task} = require('../models/models');

const userController = {};

// This currently gets all users... I think I might need to use req.query
// to look up the one user in question?? Or maybe this is still a useful
// middleware function to have.
//this one is currently unused, might be useful for if we ever get multiple users on the same task
userController.getUsers = (req, res, next) => {
  User.find({})
    .then(users => {
      res.locals.users = users;
      return next();
    })
    .catch(err => {
      return next({
        method: 'getUsers',
        type: 'Middleware error',
        error: err
      });
    }); 
};

userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({
      username: username,
      password: password
    });
    res.locals.createUser = user;
    return next();
  } catch (error) {
    return next({
      method: 'createUser',
      type: 'Middleware error',
      error: error
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({username: username, password: password});
    res.locals.foundUser = foundUser;
    return next();
  } catch (error) {
    return next({
      method: 'verifyUser',
      type: 'Middleware error',
      error: error
    });
  }
};





module.exports = userController;