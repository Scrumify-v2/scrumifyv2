const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/task/:username', taskController.getAllTasks, (req, res) => {
  res.status(200).json(res.locals.userTasks);
});

router.post('/task', taskController.createNewTask, (req, res) => {
  res.status(200).json(res.locals.newTask);
});

router.patch('/task', taskController.moveTask, (req, res) => {
  res.status(200).json(res.locals.movedTask);
});

router.patch('/task', taskController.updateContent, (req, res) => {
  res.status(200).json(res.locals.updatedTask);
});

router.delete('/task', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deletedTask);
});

module.exports = router;
