//! NONE OF THE USERS/SIGNUP/LOGIN FUNCTIONALITY IS TESTED

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

router.get('/', userController.getUsers, (req, res) => {
  return res.status(200).json(res.locals.users);
});
/* 
router.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  return res.status(200).redirect('/secret');
});
 */
router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.createUser.username);
});

router.post('/login', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.foundUser.username);
});
// router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
//   return res.status(200).redirect('/secret');
// });
router.get('/user/task/:username', userController.getAllTasks, (req, res) => {
  return res.status(200);
});

router.post('/logout', sessionController.logOut, (req, res) => {
  return res.status(200).redirect('/login');
});

module.exports = router;
