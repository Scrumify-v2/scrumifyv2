const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');

// ? router for get requests to get all projects for one user?

// router for get requests to read tasks
router.get('/all', projectController.getAllTasks, (req, res) => {
  res.status(200).json(res.locals.allTasks);
});

// router for get project
router.get('/project', projectController.getProject, (req, res) => {
  res.status(200).json(res.locals.project);
})

// router for post requests create a new project
router.post('/project', projectController.createNewProject, (req, res) => {
  res.status(200).json(res.locals.newProject);
});

// router for post requests create a new task
router.post('/task', projectController.createNewTask, projectController.updateTaskProgress, (req, res) => {
  res.status(200).json(res.locals.newTask);
});

// router for patch requests for tasks
router.patch('/task', projectController.editTask, (req, res) => {
  res.status(200).json(res.locals.updatedTask);
});

// router for patch requests to change task location
router.patch('/updateTask', projectController.updateTaskProgress, (req, res) => {
  res.sendStatus(200);
});

// router for delete requests for whole projects
router.delete('/project', projectController.deleteProject, (req, res) => {
  res.status(200).json(res.locals.deletedProject);
});

// router for delete requests for tasks 
router.delete('/task', projectController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deletedTask);
});


module.exports = router;