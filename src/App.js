import React, { Component } from 'react';
import logo from './mtglogotransback.png';
import './App.css';
import fire from './fire.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [{name: "a", life: 40}, {name: "b", life: 40}],
      newPlayer: null,
      newLife: null,
      store: fire.firestore(),
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLifeChange = this.handleLifeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.changeLife = this.changeLife.bind(this);
  }

  changeLife(event, s) {
    let x = this.state.players.slice();
    let np = this.state.newPlayer;
    let nl = Number(this.state.newLife);
    let y = x.findIndex((t) => {
      return t.name == s;
    })

    let l = Number(x[y].life) + Number(event.target.value);
    if (l < 0) {
      alert("Dude " + s + " is dead already. Have some class.")
      return;
    }
    x[y] = {name: x[y].name, life: l};
  
    this.setState({
      players: x,
      newPlayer: np,
      newLife: nl
    });
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
      newLife: Number(event.target.value)
    });
  }

  handleSubmit(event) {
    console.log('submitted: ' + this.state.players[0] + ' ' + this.state.newPlayer + ' ' + this.state.newLife);
    event.preventDefault();
    let arr = this.state.players.slice();
    let n = this.state.newPlayer;
    let l = Number(this.state.newLife);
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
        </header>
        <div className="main-table-container">
          <div className="main-table-headers" id="name">Player</div>
          <div className="main-table-headers" id="life">Life</div>  
          <div className="main-table-headers" id="lifeChangeHeader">Change</div>
          {this.state.players.map((p) => {
            return (
              <div className="player-buttons-row">
                <div className="cell-info-name" key="name_cell">{p.name}:</div>
                <div className="cell-info-life" key="life-cell">{p.life}</div>
                <div className="cell-info-buttons">
                  <button 
                    className="life-change" 
                    id="lifeup1"
                    value="1"
                    key="lifeup-button"
                    onClick={(event) => this.changeLife(event, p.name)}>
                      +1
                  </button>
                  <button 
                    className="life-change" 
                    id="lifedown1"
                    value="-1"
                    key="lifedown-button"
                    onClick={(event) => this.changeLife(event, p.name)}>
                      -1
                  </button>
                  <button 
                    className="life-change" 
                    id="lifeup5"
                    value="5"
                    key="lifeup5-button"
                    onClick={(event) => this.changeLife(event, p.name)}>
                      +5
                  </button>
                  <button
                    className="life-change" 
                    id="lifedown5"
                    value="-5"
                    key="lifedown5-button"
                    onClick={(event) => this.changeLife(event, p.name)}>
                    -5  
                  </button>
                  <button 
                    className="life-change" 
                    id="lifeup10"
                    value="10"
                    key="lifeup10-button"
                    onClick={(event) => this.changeLife(event, p.name)}>
                      +10
                  </button>
                  <button
                    className="life-change" 
                    id="lifedown10"
                    value="-10"
                    key="lifedown10-button"
                    onClick={(event) => this.changeLife(event, p.name)}>
                    -10  
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="add-player-form-div">
          <form id="addp" className="player-form" onSubmit={this.handleSubmit}>
            Player Name:
            <input type="text" name="Player Name" onChange={this.handleNameChange}></input>
            <br></br>
            Life Value:
            <input type="number" name="Life Total" min="0" placeholder="40" onChange={this.handleLifeChange}></input>
            <br></br>
            <input type="submit" id="playerAdd" value="Add Player">
            </input>
          </form>
          <button className="reset-button" onClick={this.handleReset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default App;
