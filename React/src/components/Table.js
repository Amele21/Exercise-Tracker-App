import React from 'react';
import Exercise from './Row';

function Table({ exercises, onEditExercise, onDeleteExercise }) {
    return (
        <table id="exercies">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => 
                    <Exercise exercise={exercise} onDeleteExercise={onDeleteExercise} onEditExercise={onEditExercise} key={i}/>
                )}
            </tbody>
        </table>
    );
}

export default Table;
