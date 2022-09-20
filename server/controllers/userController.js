const {User} = require('../models/models');

const userController = {};

// This currently gets all users... I think I might need to use req.query
// to look up the one user in question?? Or maybe this is still a useful
// middleware function to have.
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

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  User.create({
    username,
    password
  })
    .then(data => {
      res.locals.createUser = data;
      next();
    })
    .catch(err => {
      return next({
        method: 'createUser',
        type: 'Middleware error',
        error: err
      });
    });
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({username: username}, 'password')
    .then(user => {
      if (user === null) {
        res.locals.status = false;
        return next();
      }
      const dbPassword = user._doc.password;
      if (password !== dbPassword) {
        res.locals.status = false;
        return next();
      }
    })
    .catch(err => {
      return next({
        method: 'verifyUser',
        type: 'Middleware error',
        error: err
      });
    });
};





module.exports = userController;