const {Project, Task} = require('../models/models');


const projectController = {};

//! Everything works with postman, only create new task and update progress work with frontend, good luck :)

projectController.getAllTasks = async(req, res, next) => {
  try {
    const searchResults = await Task.find({});
    res.locals.allTasks = searchResults;
    return next();
  } 
  catch (error) {
    return next({
      log: 'projectController.getAllTasks: ERROR: no tasks exist for this project yet.',
      message: {err : `Error has occured in projectController.getAllTasks. ERROR: no tasks exist for this project yet ${error}`}
    });
  }
};

projectController.createNewTask = async(req, res, next) => {
  try {
    const {task} = req.body;
    const newTask = await Task.create({task: task});
    res.locals.newTask = newTask;
    return next();
  } 
  catch (error) {
    return next({
      log: 'projectController.createNewTask: ERROR: invalid format/type for tasks.',
      message: {err : `Error has occured in projectController.createNewTask. ERROR: invalid format/type for tasks ${error}`}
    });
  }
};

projectController.editTask = async(req, res, next) => {
  try {
    const {_id} = req.query; //? Not yet tested on frontend
    const {task} = req.body;

    
    const updatedTask = await Task.findByIdAndUpdate({ _id: _id}, {task}, {new : true});
    res.locals.updatedTask = updatedTask;
    
    return next();
  } 
  catch (error) {
    return next({
      log: 'projectController.editTask: ERROR: task not found.',
      message: {err : `Error has occured in projectController.editTask. ERROR: task not found ${error}`}
    });
  }
};

/*
projectController.updateTaskProgress -> We intended this middleware to run both when a task is created and whenever a user
pushes a button to advance a task into the next 'bucket' (to be started > in progress).

*/

projectController.updateTaskProgress = async(req, res, next) => {
  try {
    const {_id} = res.locals.newTask;
    const {task} = res.locals.newTask;

    // Looks to see if the task with unique ID is in the to_be_started bucket
    const searchToBeStarted = `progress.to_be_started.${_id}`;
    const firstSearch = await Project.findOne({ [searchToBeStarted] : { $exists : true }  });

    // Looks to see if the task with unique ID is in the in_progress bucket
    const searchInProgress = `progress.in_progress.${_id}`;
    const secondSearch = await Project.findOne({ [searchInProgress] : { $exists : true }  });


    // If the task with unique ID is in to_be_started, advance it to in_progress
    if (firstSearch){
      const firstUpdate = await Project.findOneAndUpdate({ [searchToBeStarted]: task}, { [searchInProgress]: task}, {new: true});
      const firstDelete = await Project.findOneAndUpdate({ [searchToBeStarted]: task}, { $unset: {[searchToBeStarted]: task}}, {new: true});
    }
    // If the task with unique ID is in in_progress, advance it to completed
    else if (secondSearch){
      const searchCompleted = `progress.completed.${_id}`;
      const secondUpdate = await Project.findOneAndUpdate({ [searchInProgress]: task}, { [searchCompleted]: task}, {new: true});
      const secondDelete = await Project.findOneAndUpdate({ [searchInProgress]: task}, { $unset: {[searchInProgress]: task}}, {new: true});
    }
    else {
      
      //! if we want more projects, have project id be in first argument so we can identify the project
      
      const newUpdate = await Project.updateOne({}, { $set : { [searchToBeStarted] : task}}, {new: true});
      console.log(newUpdate, 'newUpdate');
    }
    
    
    
    return next();
  } catch (error) {
    return next({
      log: 'projectController.updateTaskProgress: ERROR: task not found.',
      message: {err : `Error has occured in projectController.updateTaskProgress. ERROR: task not found ${error}`}
    });
  }
};

projectController.deleteTask = async(req, res, next) => {
  try {
    const {_id} = req.query; 
    const deletedTask = await Task.findByIdAndRemove({ _id: _id});
    res.locals.deletedTask = deletedTask;
    return next();
  } 
  catch (error) {
    return next({
      log: 'projectController.deleteTask: ERROR: task not found.',
      message: {err : `Error has occured in projectController.deleteTask. ERROR: task not found ${error}`}
    });
  }
};

projectController.getProject = async(req, res, next) => {
  try {
   const project = await Project.findOne({});
   res.locals.project = project;
   return next();
  } catch {
    return next({
      log: 'projectController.getProject: ERROR: invalid format for project.',
      message: {err : `Error has occured in projectController.getProject. ERROR: invalid format for project ${error}`}
    });
  }
};

projectController.createNewProject = async(req, res, next) => {
  try {
    const {name} = req.body;
    const newProject = await Project.create({name: name});
    res.locals.newProject = newProject;
    return next();

  } catch (error) {
    return next({
      log: 'projectController.createNewProject: ERROR: invalid format for project.',
      message: {err : `Error has occured in projectController.createNewProject. ERROR: invalid format for project ${error}`}
    });
  }
};

projectController.deleteProject = async(req, res, next) => {
  try {
    const {name} = req.body;
    const deleteMe = await Project.findOneAndRemove({name: name});
    res.locals.deletedProject = deleteMe;
    return next();

  } catch (error) {
    return next({
      log: 'projectController.deleteProject: ERROR: project not found.',
      message: {err : `Error has occured in projectController.deleteProject. ERROR: project not found ${error}`}
    });
  }
};


module.exports = projectController;