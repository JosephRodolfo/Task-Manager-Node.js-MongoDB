const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");


const app = express();

//This middleware was to let me make calls to a seperate port on the same local host
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:2000', `*`);
    res.header("Access-Control-Allow-Methods", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });




app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app
