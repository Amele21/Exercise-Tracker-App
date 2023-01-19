import React from 'react';
import { Link } from 'react-router-dom'
import Table from '../components/Table';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }){
    const [exercises, setExercises] = useState([]); //State
    const history = useHistory(); //Histroy

    const onDeleteExercise = async _id => {   
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE'})
        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id ${_id}, status code = ${response.status}`)
        }
    };

    const onEditExercise = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise")
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises'); 
        const data = await response.json()
        setExercises(data)
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>  
            <h2 class="small">Exercise Log</h2>
            <p id="bioTwo" class="small">Click "Add an exercise" link below to add an exercise to the log. You can also edit and delete exercise logs. </p>
            <Table exercises ={exercises} onDeleteExercise={onDeleteExercise} onEditExercise={onEditExercise}> </Table>
            <Link to="/add-exercise" id="Link">Add an exercise</Link>
        </>
    );
}

export default HomePage;