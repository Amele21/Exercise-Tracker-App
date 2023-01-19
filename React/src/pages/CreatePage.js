import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreatePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState(''); 
    const [unit, setUnit] = useState('lbs');//default value = lbs
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date}
        const response = await fetch('/exercises', {
            method: 'POST', 
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201){
            alert("Successfully added exercise!");
        } else {
            alert(`Failed to add exercise, status code ${response.status}`)
        }
        history.push("/");
    };

    return (
        <div> 
            <h2> Add Exerise </h2>
            <p id="bioTwo" class="small">To successfully log in a new exercise, ensure everything below is completely filled out. Then click Add</p>
            <form>
            <input type="text" required="required" placeholder= "Enter name of exercise" value={name} onChange={e => setName(e.target.value)}/>
            <input type="number" placeholder="Enter number of reps" value={reps} onChange={e => setReps(e.target.value)}/>
            <input  type="number" placeholder="Enter weight"value={weight} onChange={e => setWeight(e.target.value)}/>
            <select value = {unit} id="dropdownUnit"
                onChange={e => setUnit(e.target.value)}>
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                </select>
            <input type="text" placeholder="MM-DD-YY"value={date} onChange={e => setDate(e.target.value)}/>
            </form>
            <br></br>
            <button onClick={addExercise}> Add </button>
        </div>
    );
};

export default CreatePage;