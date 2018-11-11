import React, { Component } from 'react';
import logo from './logo.svg';
import './LifeUp.css';

class Life extends Component {
	constructor(props) {
		super(props);
		this.state={
			life: props.lifeval,
			playerid: props.playeridval,
		}
	}

	lifeUp1() {
		let state = this.state.life;
		state.life += 1;
		this.setState(state);
	}

	lifeDown1() {
		let state = this.state.life;
		state.life -= 1;
		this.setState(state);
	}

	render() {
		return (
			<div>
				<h3>
					Player: {this.state.playerid}.
				</h3>
				<div className="buttons">
					<button
						className="life-up"
						onClick={() => this.setState({
							life: this.state.life + 1,
						})}
						title="+1"
						name="+1"
						value="+1"
						color="#000000"
						>
						+1
					</button>
					<button
						className="life-down"
						onClick={() =>
							this.setState({
							life: this.state.life - 1,
						})}
						title="-1"
						name="-1"
						value="-1"
						color="#000000"
						>
						-1
					</button>
				</div>
		  </div>
		)}

}
export default Life