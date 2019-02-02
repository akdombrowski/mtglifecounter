import React, { Component } from 'react';
import logo from './mtglogotransback.png';
import './App.css';
import Life from "./Life.js";
import { Button, Container, Col, Row } from 'reactstrap';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lifes: Array(1).fill(<Life lifeval="40" playeridval="1"></Life>),
    }

  }

  render() {
    return (
      <Container fluid className="App">
        <Row>
          <Col>
            <img src={logo} className="App-logo" alt="logo" />
          </Col>
          <Col>
            <table className="life-table">
              <th>{this.state.lifes}</th>
            </table>
          </Col>
          <Col>
            <div className="Add-player">
              <Button
              className="add-player"
              type="submit"
              value="Player Name"
              onClick={
                () => {
                  var newArr = this.state.lifes.slice();
                  newArr.push(<Life lifeval="40" playeridval="2"></Life>);
                  this.setState(
                    {
                      lifes: newArr,
                    });
                }
              }
            >
              Player Name
            </Button>
                <form className="player-form">
                  Player Name:
              <input type="text" name="playername"></input>
                  <br></br>
                  Life Value:
              <input type="text" name="lifevalue"></input>
                  <br></br>
                  <input type="submit" value="Add Player"></input>
                </form>
              }
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
