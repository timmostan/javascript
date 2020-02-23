import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const App = props => {

  const [ personsState, setPersonsState ] = useState({
    persons: [
      { name: 'Stan', age: 36 },
      { name: 'Ola', age: 35 },
      { name: 'Pams', age: 7 }
    ],
    otherState: 'some other values'
  });

  const switchNameHandler = () => {
    //console.log('Was clicked');
    //DONT DO THIS!: this.state.persons[0].name = 'Stanislaw';
    setPersonsState({
      persons: [
        { name: 'Stanislaw', age: 36 },
        { name: 'Olcia', age: 35 },
        { name: 'Pamirek', age: 7 }
      ],
      otherState: personsState.otherState  
    })
  };

  return (
  <div className="App">
    <h1>Hi, I'm a React App</h1>
    <p>This is really working!</p>
    <button onClick={ switchNameHandler }>Switch Name</button>
    <Person name={ personsState.persons[0].name } age={ personsState.persons[0].age }/>
    <Person name={ personsState.persons[1].name } age={ personsState.persons[1].age }>Hobbies: like dogs</Person>
    <Person name={ personsState.persons[2].name } age={ personsState.persons[2].age }/>
  </div>
  );
//above is same as:
//return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App' ));
}


export default App;