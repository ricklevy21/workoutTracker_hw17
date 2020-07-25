//dependencies
const express = require("express");
const logger = require ("morgan");
const mongoose = require ("mongoose");

//server
const PORT = process.env.PORT || 3000;

//import mongoose model schema
const db = require("./models");
const Workout = require("./models");

//set the server
const app = express();

//middleware
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serve up the public dir to the user
app.use(express.static("public"));

//connect to the mongo db
mongoose.connect(process.envMONGOD_URI || "mongodb://localhost/workout", { useNewUrlParser: true });



//routes
//GET workouts
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

//POST workout
app.post("/api/workouts", ({body}, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });