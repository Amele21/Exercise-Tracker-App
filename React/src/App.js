import './App.css';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();
  
  return (
    
    <div className="App">
      <Router>
        <div className="App-header">
        <h1>Exercise Tracker</h1>
        
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit}/>
          </Route>

          <Route path="/add-exercise">
            <CreatePage/>
          </Route>

          <Route path="/edit-exercise">
            <EditPage exerciseToEdit={exerciseToEdit}/>
          </Route>
          <br/><br/><br/>
          <h3 id="bio">App by Adrian Melendrez</h3>
          <p id="bioTwo" class="small">Portfolio project for a Web Development class at Oregon State University</p>
          <p id="bioTwo" class="small">This app utilizes Node,Nodemon, React, REST,MongoDB, Mongoose, and CSS </p>
          <p id="bioTwo" class="small">
            Sources: Code and code examples provided in Explorations 7 and 9 from Oregon State University 290 Web Devolopment. 
          </p>
        </div>
      </Router>
    </div>
  );
}

export default App;
