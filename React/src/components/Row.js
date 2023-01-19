import React from 'react';
import { TiEdit, TiDelete} from "react-icons/ti"


function Row({ exercise, onEditExercise, onDeleteExercise}) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td> 
                <TiEdit onClick={() => onEditExercise(exercise)} id="edit"/>
            </td>
            <td>
                <TiDelete onClick={() => onDeleteExercise(exercise._id)} id="delete"/>
            </td>
        </tr>
    )
}

export default Row