//dependencies
const express = require("express");
const logger = require ("morgan");
const mongoose = require ("mongoose");
const path = require("path");


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
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

//POST workout
app.post("/api/workouts", ({body}, res) => {
    const workout = new Workout(body)
    Workout.create(workout)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

//PUT workout to add exercise
app.put("/api/workouts/:id", (req, res) => {
    Workout.updateOne(
        {
            _id: (req.params.id)
        },
        {
            $push: {
                exercises: [
                    {
                    type: req.body.type,
                    name: req.body.name,
                    duration: req.body.duration,
                    distance: req.body.dustance
                    }
                ]
            }
        }
    ).then(dbUpdate => {
        res.json(dbUpdate);
      })
      .catch(err => {
        res.json(err);
      });
})



//html routes
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
  });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });