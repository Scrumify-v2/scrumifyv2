//need to add tasks from Models


const taskController = {};


taskController.getAllTasks = async (req, res, next) => {
  try {
    const { username } = req.params;
    const userTasks = await Task.find
  } catch (error) {
    return next({
      method: 'getAllTasks',
      type: 'Middleware error',
      error: error
    });
  }
};

module.exports = taskController;