//need to add tasks from Models
const { Task } = require('../models/models');

const taskController = {};
/* 
const taskSchema = new Schema({
  user: {type: String, required: true},
  taskName: {type: String, required: true},
  content: {type: String, required: true},
  progress: {type: String, required: true}
});
 */
taskController.getAllTasks = async (req, res, next) => {
  if (!req.params.username){
    return next({
      log: 'taskController.getAllTasks ERROR: no username specified to retrieve tasks for',
      status: 400,
      message: 'Username required to retrieve tasks'
    });
  }
  try {
    const { username } = req.params;
    const userTasks = await Task.find({ user: username });
    res.locals.userTasks = userTasks;
    return next();
  } catch (error) {
    return next({
      log: 'taskController.getAllTasks ERROR: could not find any tasks under that username',
      status: 500,
      message: {err: error}
    });
  }
};

taskController.createNewTask = async (req, res, next) => {
  if (!req.body.user){
    return next({
      log: 'taskController.createNewTask ERROR: no username specified to create task under',
      status: 400,
      message: 'Username required to create task'
    });
  }
  if (!req.body.taskName){
    return next({
      log: 'taskController.createNewTask ERROR: task name is required for creation but none was specified',
      status: 400,
      message: 'Task name required to create task'
    });
  }
  if (!req.body.content){
    return next({
      log: 'taskController.createNewTask ERROR: task requires content in order to be submitted',
      status: 400,
      message: 'Content required to create task'
    });
  }
  if (!req.body.progress){
    return next({
      log: 'taskController.createNewTask ERROR: task requires progress to be specified for sorting',
      status: 400,
      message: 'Progress indicator required to create task'
    });
  }

  try {
    const { user, taskName, content, progress } = req.body;
    const newTask = await Task.create({
      user: user,
      taskName: taskName,
      content: content,
      progress: progress,
    });
    res.locals.newTask = newTask;
    return next();
  } catch (error) {
    return next({
      log: 'taskController.createNewTask ERROR: could not create task upon database query',
      status: 500,
      message: {err: error}
    });
  }
};

taskController.moveTask = async (req, res, next) => {
  if (!req.body.taskId){
    return next({
      log: 'taskController.moveTask ERROR: no taskID specified for updating progress',
      status: 400,
      message: 'Moving task/changing progress requires Task ID of task to be moved'
    });
  }
  if (!req.body.progress){
    return next({
      log: 'taskController.moveTask ERROR: no progress specified for where to move task',
      status: 400,
      message: 'Moving task requires progress bucket to be moved into'
    })
  }

  try {
    const { taskId, progress } = req.body;
    const movedTask = await Task.findByIdAndUpdate(taskId, {
      progress: progress,
    }, {new: true});
    res.locals.movedTask = movedTask;
    return next();
  } catch (error) {
    return next({
      log: 'taskController.moveTask ERROR: could not update progress of task in database',
      status: 500,
      message: {err: error}
    });
  }
};

taskController.updateContent = async (req, res, next) => {
  if (!req.body.taskId){
    return next({
      log: 'taskController.updateContent ERROR: no taskID specified for which task to update',
      status: 400,
      message: 'Updating task content requires Task ID of task to be updated'
    });
  }
  if (!req.body.content){
    return next({
      log: 'taskController.updateContent ERROR: no new content specified',
      status: 400,
      message: 'Updating task requires content to update with'
    })
  }

  try {
    const { taskId, content } = req.body;
    const updatedContentTask = await Task.findByIdAndUpdate(taskId, {
      content: content,
    }, {new: true});
    res.locals.updatedTask = updatedContentTask;
    return next();
  } catch (error) {
    return next({
      log: 'taskController.updateContent ERROR: could not update task content in database',
      status: 500,
      message: {err: error}
    });
  }
};

taskController.deleteTask = async (req, res, next) => {
  if (!req.body.taskId){
    return next({
      log: 'taskController.deleteTask ERROR: no taskId specified to delete',
      status: 400,
      message: 'Deleting task requires taskId to be specified'
    })
  }
  try {
    const { taskId } = req.body;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    res.locals.deletedTask = deletedTask;
    return next();
  } catch (error) {
    return next({
      log: 'taskController.deleteTask ERROR: could not delete task from database',
      status: 500,
      message: {err: error}
    });
  }
};

module.exports = taskController;
