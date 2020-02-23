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
    otherState: ''
  }

  switchNameHandler = (newName) => {
    //console.log('Was clicked');
    //DONT DO THIS!: this.state.persons[0].name = 'Stanislaw';
    this.setState({
      persons: [
        { name: newName, age: 36 },
        { name: 'Olcia', age: 35 },
        { name: 'Pamirek', age: 7 }
      ]  
    })
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Staszek', age: 36 },
        { name: event.target.value, age: 35 },
        { name: 'Pamirek', age: 7 }
      ]  
    })
  }

  render () {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
    <div className="App">
     <h1>Hi, I'm a React App</h1>
     <p>This is really working!</p>
     <button 
        //inline style
        style={ style }
        onClick={() => this.switchNameHandler('Stanislaw') }>Switch Name</button>
     <Person 
        name={ this.state.persons[0].name } 
        age={ this.state.persons[0].age }/>
     <Person 
        name={ this.state.persons[1].name } 
        age={ this.state.persons[1].age }
        //Note: bind is more efficient then the arrow function in button
        click={ this.switchNameHandler.bind(this, 'Stachu') }
        changed={this.nameChangedHandler} >Hobbies: like dogs</Person>
     <Person 
        name={ this.state.persons[2].name } 
        age={ this.state.persons[2].age }/>
    </div>
  );
  //above is same as:
  //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App' ));
  }

}

export default App;