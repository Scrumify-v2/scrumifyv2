const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

///WITHOUT AUTHENTICATION ////////////
///SIGNUP
router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.createUser.username);
});
///LOGIN
router.post('/login', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.foundUser.username);
});
///LOGOUT
router.post('/logout', (req, res) => {
  return res.status(200).redirect('/login');
});

///END WITHOUT AUTHENTICATION ////////

/// SIGNUP WITH AUTHENTICATION
// router.post('/signup', userController.createUser, (req, res) => {
//   const username = res.locals.foundUser.username;
//   const user = { name: username };
//   //create JWT
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   return res.json({ accessToken: accessToken });
// });

// ///LOGIN WITH AUTHENTICATION
// router.post('/login', userController.verifyUser, (req, res) => {
//   const username = res.locals.foundUser.username;
//   const user = { name: username };
//   console.log(user);
//   //create JWT
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   console.log(accessToken);
//   return res.json(accessToken);
// });
// router.post('/logout', (req, res) => {
//   return res.status(200).redirect('/login');
// });

module.exports = router;
