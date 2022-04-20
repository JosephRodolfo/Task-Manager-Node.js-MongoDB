const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const Task = mongoose.model("Task", {
  description: {
    type: String,
    trim: true,
    required: true,

  },
  completed: {
    type: Boolean,
    default: false
  },
});

const task = new Task({
  description: "Eat at McDonald's",
  //completed: false,
});

task.save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log("Error", error);
  });

const me = new User({
  name: "Karen",
  age: 35,
  email: 'DDDDDD@gmSSail.com  ',
  password: "passworddddddd"


});

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error", error);
//   });
