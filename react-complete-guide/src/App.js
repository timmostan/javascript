import React, { Component } from 'react';

import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Stan', age: 36 },
      { name: 'Ola', age: 35 },
      { name: 'Pams', age: 7 }
    ],
    otherState: 'other state property',
    showPersons: false
  }

  /*switchNameHandler = (newName) => {
    //console.log('Was clicked');
    //DONT DO THIS!: this.state.persons[0].name = 'Stanislaw';
    this.setState({
      persons: [
        { name: newName, age: 36 },
        { name: 'Olcia', age: 35 },
        { name: 'Pamirek', age: 7 }
      ]  
    })
  }*/

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    //to not modify state object directly - use the spread operator
    const person =  {
      ...this.state.persons[personIndex]
    };

    //alternative
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    //create a copyt with slice() to avoid issues
    //const persons = this.state.persons.slice();
    //alternative to copy is to use spread operator
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons:!doesShow});
  }

  render () {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          { this.state.persons.map((person, index) => {
            return <Person 
                      key={person.id}
                      click={() => this.deletePersonHandler(index)}
                      name={person.name}
                      age={person.age}
                      changed={(event) => this.nameChangedHandler(event, person.id)} />
          }) }
        </div> 
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    //let classes = ['red', 'bold'].join(' ');
    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }
    classes = classes.join(' ');

    return (
      <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p className = { classes }>This is really working!</p>
      <button 
          //inline style
          className="Button"
          onClick={ this.togglePersonsHandler }>Toggle persons</button>
          { persons }
      </div>
  );
  //above is same as:
  //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App' ));
  }

}

export default App;