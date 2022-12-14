const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

//const session = require('express-session');
//const sessionConfig = require('./sessionConfig');
const projectRouter = require('./routes/projects');
const userRouter = require('./routes/users');
const taskRouter = require('./routes/taskRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(session(sessionConfig));

app.use(express.static(path.resolve(__dirname, '')));

app.use('/task', taskRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('*', (req, res) => {
  return res.status(404).send('The page you are looking for does not exist.');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'GLOBAL ERROR HANDLER: caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
