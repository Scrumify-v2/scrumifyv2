const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/:username', taskController.getAllTasks, (req, res) => {
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
