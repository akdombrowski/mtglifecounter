import React, { Component } from 'react';
import logo from './mtglogotransback.png';
import './App.css';
import fire from './fire.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.store = fire.firestore();
    const settings = {
      timestampsInSnapshots: true};
    this.store.settings(settings);

    this.state = {
      players: [],
      newPlayer: null,
      newLife: null
    };

    this.getninitplayers = this.getinitplayers.bind(this);
    this.getPlayers = this.getPlayers.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLifeChange = this.handleLifeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.changeLife = this.changeLife.bind(this);
  }

  getinitplayers() {
    var init_p = []
    var query = this.store.collection("Game1")
      .where('life', '>=', 0).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            // console.log("name: " + doc.data().name + ", life: " + doc.data().life);
            init_p.push({name: doc.data().name, life: Number(doc.data().life)}); 
            // console.log(init_p.toString());
          });
          return init_p;
        })
        .then(init_p => {
          console.log(init_p);
          this.setState({
            players: init_p,
            newPlayer: null,
            newLife: null
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
    });

        console.log("set state in getinitplayers");
    
  }

  getPlayers() {
    console.log("getplayers: " + this.state.players.toString());
    return this.state.players.map((p) => {
      console.log(p);
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
    })  
  }

  changeLife(event, s) {
    event.preventDefault();
    let x = this.state.players.slice();
    let np = this.state.newPlayer;
    let nl = Number(this.state.newLife);
    let y = x.findIndex((t) => {
      return t.name == s;
    })

    let l = Number(x[y].life) + Number(event.target.value);
    if (l < 0) {
      alert("Dude " + s + " is dead already. Have some class.")
      x[y] = {name: x[y].name, life: 0}
      this.setState({
        players: x
      });
      return;
    }
    let n = x[y].name;
    let docId = 0;
    x[y] = {name: n, life: l};

    this.store.settings({
      timestampsInSnapshots: true
    })

    var query = this.store.collection("Game1")
      .where('name', '==', n).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log("add life: " + l);
            doc.ref.update({life: l});
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
    });    

    this.setState({
        players: x,
        newPlayer: np,
        newLife: nl
    });
  }

  handleNameChange(event) {
    event.preventDefault();
    let x = this.state.players;
    let y = this.state.newPlayer;
    this.setState({
      players: x,
      newPlayer: event.target.value,
      newLife: y
    });
  }

  handleLifeChange(event) {
    event.preventDefault();
    let x = this.state.players.slice();
    let y = this.state.newPlayer;
    let l = 40;

    if(event.target.value > 0) {
      l = Number(event.target.value);
    }
    this.setState({
      players: x,
      newPlayer: y,
      newLife: l
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let arr = this.state.players.slice();
    let n = this.state.newPlayer;
    let l = 40;
    if (this.state.newLife >= 0) {
      l = Number(this.state.newLife);
    }

    arr.push({name: n, life: l});
    
    this.store.settings({
      timestampsInSnapshots: true
    })

    var pnum = Number(arr.length);
    
    const col = this.store.collection("Game1");
    col.doc("player" + pnum).set({
      name: n, life: l
    });
    this.setState({
      players: arr,
      newPlayer: null,
      newLife: null
    });
    console.log('submitted: ' + this.state.players[0] + ' ' + this.state.newPlayer + ' ' + this.state.newLife);
  }

  handleReset(event) {
    event.preventDefault();
    this.getinitplayers();
  }

  componentWillMount() {
    this.getinitplayers();
  }

  render() {
    const playerData = this.getPlayers();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="main-table-container">
          <div className="main-table-headers" id="name">Player</div>
          <div className="main-table-headers" id="life">Life</div>  
          <div className="main-table-headers" id="lifeChangeHeader">Change</div>
          {playerData}
        </div>
        <div className="add-player-form-div">
          <form id="addp" className="player-form" onSubmit={this.handleSubmit}>
            Player Name:
            <input type="text" name="Player Name" onChange={this.handleNameChange}></input>
            <br></br>
            Life Value:
            <input type="number" name="Life Total" min="0" default="40" onChange={this.handleLifeChange}></input>
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
