//dependencies
const mongoose = require("mongoose");

//define schema
const Schema = mongoose.Schema

//create a db schema for workouts
const WorkoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "You must select an exercise type"
        },
        name: {
            type: String,
            trim: true,
            required: "You must enter an exercise name"
        },
        duration: {
            type: Number,
            required: "You must enter a duration for the exercise in minutes"
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }
    }]

});




const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;