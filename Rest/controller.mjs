//NOTE SOURCE: MODULE 7 and MODULE 9 from exploration Movie example for both model.mjs and controller.mjs. 

import * as exercises from './model.mjs';
import express from 'express';

const PORT = 3000;
const app = express()

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

/**
 * CREATE: Create a new excercise with name, reps, weight, unit, and date provided in the body
 */
app.post('/exercises', (req,res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Requst failed'}); //exception in the code that caused error ?? QQQ
    });
});

/**
 * READ: Retrieve all excercises
 */
app.get('/exercises', (req, res) => {
    let filter = {}
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.status(200).json(exercises)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Requst failed'}) 
        });
});

/**
 *UPDATE: Update excercise with name, reps, weight, unit, date as well as path parameter _id. 
 */
app.put('/exercises/:_id' , (req, res) => {
    exercises.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exerciseUpdated => {
            if (req.body.name === '' || req.body.reps === '' || req.body.weight === '' || req.body.unit === '' || req.body.date === ''){
                res.status(400).json({Error: "Invailid syntax"})

            } else if (exerciseUpdated > 0) {
                res.status(200).json({_id: req.params._id, name:req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
                
            } else {
                res.status(404).json({Error: 'Resource not found'}); 
            }
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({Error: 'Request failed'});
        });
});

/**
 * DELETE:Delete excercise with matching _id
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteExercise(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send()
            } else {
                res.status(404).json({Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})