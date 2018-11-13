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
    this.handleReset = this.handleReset.bind(this);
  }

  handleNameChange(event) {
    let x = this.state.players;
    let y = this.state.newPlayer;
    this.setState({
      players: x,
      newPlayer: event.target.value,
      newLife: y
    });
  }

  handleLifeChange(event) {
    let x = this.state.players.slice();
    let y = this.state.newPlayer;
    console.log(event.target.value);
    this.setState({
      players: x,
      newPlayer: y,
      newLife: event.target.value
    });
  }

  handleSubmit(event) {
    console.log('submitted: ' + this.state.players[0] + ' ' + this.state.newPlayer + ' ' + this.state.newLife);
    event.preventDefault();
    let arr = this.state.players.slice();
    let n = this.state.newPlayer;
    let l = this.state.newLife;
    arr.push({name: n, life: l});
    this.setState({
      players: arr,
      newPlayer: null,
      newLife: null
    });
  }

  handleReset(event) {
    event.preventDefault();
    this.setState({
      players: [],
      newPlayer: null,
      newLife: null
    });
  }

  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <table className="main-table">
            <tr>
              <th className="main-table-headers">Player</th>
              <th className="main-table-headers">Life</th>    
            </tr>
            <tbody>
              {this.state.players.map((state) => {
                return (
                  <tr>
                    <td key={state.name}>{state.name}:</td><td key="table-life-value"> {state.life}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="add-player">
            <form id="addp" className="player-form" onSubmit={this.handleSubmit}>
              Player Name:
              <input type="text" name="Player Name" onChange={this.handleNameChange}></input>
              <br></br>
              Life Value:
              <input type="number" name="Life Total" min="0" placeholder="40" onChange={this.handleLifeChange}></input>
              <br></br>
              <input type="submit" value="Add Player">
              </input>
            </form>
            <button className="reset-button" onClick={this.handleReset}>Reset</button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
