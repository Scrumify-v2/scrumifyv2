const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// BELOW IS TEAM AXOLOTL'S DB -> YOU CAN USE YOUR OWN OR BE ADDED AS MEMBERS TO THIS DB
const DB_URI = 'mongodb+srv://GoogleHireUs:750kTCminimum@cluster0.rjybe0z.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'SCRUM_Project'
})
  .then(() => console.log('Connected to Mongo DB'))
  .catch(err => console.log(err));


// minimize: false overrides default behavior of not saving empty arrays/objects
const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  projects: {
    type: Array,
    default: []
  }, 
}, {minimize: false}
);

const User = mongoose.model('user', userSchema);

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30, default: Date.now }
});

const Session = mongoose.model('session', sessionSchema);

// ? Implement as Linked List >> strecth 
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


const taskSchema = new Schema({
  task: {type: String, required: true}
});

const Task = mongoose.model('task', taskSchema);

module.exports = {
  User,
  Session,
  Project,
  Task
};