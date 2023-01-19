import mongoose from 'mongoose';

mongoose.connect(
    "mongodb://localhost:27017/exercise_db",
    { useNewUrlParser: true, useUnifiedTopology: true}
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
})

mongoose.set("useCreateIndex", true);

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true},
    reps: { type: Number, required: true},
    weight: { type: Number, required: true},
    unit: { type: String, required: true},
    date: { type: String, required: true}
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create an Excercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. 
 */

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}

/**
 * Retrieve exercises
 * @param {Object} filter
 * @param {String} projection
 * @param {Number} limit
 * @returns 
 */
const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec();
}

/**
 * Update the name,reps, weight, unit, and date with provided id value. 
 * @param {String} _id
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to number of exercises were updated
 */
const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
    return result.nModified; 
}

/**
 * Delete the exercise with provided id value
 * @param {String} _id
 * @returns 
 */

const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount
}


export{ createExercise, findExercises, updateExercise, deleteExercise}