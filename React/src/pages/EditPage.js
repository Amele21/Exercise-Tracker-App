import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditPage = ({exerciseToEdit}) => {
    
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);


    const history = useHistory();

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date};

        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT', 
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.status === 200){
            alert("Successfully edited exercise!");
            history.push("/")
        
        } else if(response.status === 400 ) {
            alert(`Failed to edit exercise, Please fill out all information, status code ${response.status}`);
            history.push("/edit-exercise")

        }else {
            alert(`Failed to edit exercise, status code ${response.status}`);
            history.push("/")
        }
    };

    return (
        <div>
            <h2> Edit Exercise </h2>
            <p id="bioTwo" class="small">To successfully edit the page, ensure everything below is completely filled out. Then click Add</p>
            <form>
            <input type="text" required="required" value={name} onChange={e => setName(e.target.value)}/>
            <input type="number" value={reps} onChange={e => setReps(e.target.value)}/>
            <input  type="number" value={weight} onChange={e => setWeight(e.target.value)}/>
            <select value={unit} id="dropdownUnit"onChange={e => setUnit(e.target.value)}>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
            </select>
            <input type="text" value={date} onChange={e => setDate(e.target.value)}/>
            <br></br> 
            </form>
            <button onClick={editExercise}> Save </button>
        </div>
    )
}

export default EditPage;