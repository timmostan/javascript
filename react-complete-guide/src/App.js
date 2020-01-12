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

  switchNameHandler = () => {
    //console.log('Was clicked');
    //DONT DO THIS!: this.state.persons[0].name = 'Stanislaw';
    this.setState({
      persons: [
        { name: 'Stanislaw', age: 36 },
        { name: 'Olcia', age: 35 },
        { name: 'Pamirek', age: 7 }
      ]  
    })
  }

  render () {
    return (
    <div className="App">
     <h1>Hi, I'm a React App</h1>
     <p>This is really working!</p>
     <button onClick={ this.switchNameHandler }>Switch Name</button>
     <Person name={ this.state.persons[0].name } age={ this.state.persons[0].age }/>
     <Person name={ this.state.persons[1].name } age={ this.state.persons[1].age }>Hobbies: like dogs</Person>
     <Person name={ this.state.persons[2].name } age={ this.state.persons[2].age }/>
    </div>
  );
  //above is same as:
  //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App' ));
  }

}

export default App;
