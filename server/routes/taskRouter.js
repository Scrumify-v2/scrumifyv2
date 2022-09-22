const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

///JWT AUTHENTICATION MIDDLEWARE
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (!token) return res.sendStatus(401);
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     return next();
//   });
// };
///END JWT AUTHENTICATION MIDDLEWARE

router.get('/:user', taskController.getAllTasks, (req, res) => {
  res.status(200).json(res.locals.userTasks);
});

router.post('/', taskController.createNewTask, (req, res) => {
  res.status(200).json(res.locals.newTask);
});

router.patch('/move', taskController.moveTask, (req, res) => {
  res.status(200).json(res.locals.movedTask);
});

router.patch('/update', taskController.updateContent, (req, res) => {
  res.status(200).json(res.locals.updatedTask);
});

router.delete('/', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deletedTask);
});

module.exports = router;
