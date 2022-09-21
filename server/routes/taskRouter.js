const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/task/:username', taskController.getAllTasks, (req, res) => {
  res.status(200).json(res.locals.userTasks);
});

router.post('/task', taskController.createNewTask, (req, res) => {
  res.status(200).json(res.locals.newTask);
});

module.exports = router;
