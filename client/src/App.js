import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.state = {
      payload: null, 
      jwt: null
    }
  }

  signIn() {
		fetch(`/signin`, {
      method: 'POST', 
      credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then(res => res.json())
		.then(jwt => {
      this.setState({
        jwt
      });
		}).catch((err) => {
			console.log(err);
		});
  }

  showAnswer() {
		fetch(`/showAnswer`, {
      method: 'GET', 
      credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then(res => res.json())
		.then(payload => {
      this.setState({payload});
		}).catch((err) => {
			console.log(err);
		});
  }

  render() {
    let toggle;
    if (this.state.jwt) {
      toggle = (
        <div>
          <div>Why did the computer show up at work late?</div>
          <button onClick={this.showAnswer}>Find out the answer</button>
          <div>{this.state.payload}</div>
        </div>
      )
    } else {
      toggle = (
        <button onClick={this.signIn}>Sign In</button>
      )
    }
    return (
      <div className="App">
				{toggle}
      </div>
    );
  }
}

export default App;
