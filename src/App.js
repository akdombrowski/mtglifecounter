import React, { Component } from 'react';
import logo from './mtglogotransback.png';
import './App.css';
import Life from "./Life.js";

function lifeUp(x) {
  return x + 1;
}

function LifeCounter(props) {
  return (
    <h1 className="life-counter">
      {props.value}
    </h1>
  );
}

function Lifer(props) {
  return (
    <td>Life: {props.life}</td>
  );
}

function Player(props) {
  return (
    <th>Player: {props.player}</th>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [{name: "a", life: 40}, {name: "b", life: 40}],
      newPlayer: null,
      newLife: null,
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLifeChange = this.handleLifeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    let x = this.state.players.slice();
    if (this.state.life != null && this.state.Life < 0) {
      x.push({name: this.state.name, life: event.target.value})
      this.setState({
        players: x,
        newPlayer: null,
        newLife: null
      })
    } 
    else{
      this.setState({
        players: x,
        newPlayer: event.target.value,
        newLife: null
      });
    }
  }

  handleLifeChange(event) {
    let x = this.state.players.slice();
    if (this.state.newPlayer != null && this.state.newPlayer != "") {
      x.push({name: this.state.name, life: event.target.value})
      this.setState({
        players: x,
        newPlayer: null,
        newLife: null
      })
    } 
    else{
      this.setState({
        players: x,
        newPlayer: null,
        newLife: event.target.value
      });
    }
    
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.players.toString() + ' ' + this.state.newPlayer + ' ' + this.state.newLife);
    event.preventDefault();
  }

  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <table>
            <tbody>
          {this.state.players.map((state) => {
            return (
              <tr>
                <td key={state.name}>{state.name}: {state.life}</td>
              </tr>
            );
          })}
          </tbody>
          </table>
          <div className="Add-player">

            <form id="addp" className="player-form" onSubmit={this.handleSubmit}>
              Player Name:
              <input type="text" name="Player Name" onChange={this.handleNameChange}></input>
              <br></br>
              Life Value:
              <input type="number" life="Life Total" onChange={this.handleLifeChange}></input>
              <br></br>
              <input type="submit" value="Add Player">
              </input>
            </form>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
