const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DB_URI =
  'mongodb+srv://adrian:themostsecurepassword@cluster0.wqkokkj.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'SCRUM_Project',
  })
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err) => console.log(err));

// minimize: false overrides default behavior of not saving empty arrays/objects
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  },
  { minimize: false }
);

const User = mongoose.model('user', userSchema);

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30, default: Date.now },
});

const Session = mongoose.model('session', sessionSchema);
/* 
const projectSchema = new Schema({
  name: {type: String, required: true},
  progress: {
    to_be_started: {type: Object, default: {}},
    in_progress: {type: Object, default: {}},
    completed: {type: Object, default: {}}
  }
}, {minimize: false}
);
const Project = mongoose.model('project', projectSchema);

 */

const taskSchema = new Schema({
  user: { type: String, required: true },
  taskName: { type: String, required: true },
  content: { type: String, required: true },
  progress: { type: String, required: true },
});

const Task = mongoose.model('task', taskSchema);

module.exports = {
  User,
  Session,
  Task,
};
