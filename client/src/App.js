import React, { Component } from 'react';
import './App.css';
import NetworkManager from './NetworkManager';

class App extends Component {
  constructor(props) {
    super(props);
    this.createTicket = this.createTicket.bind(this);
    this.answer = this.answer.bind(this);
    this.state = {
      jwtContents: null, 
      jwt: null, 
      err: null
    }
  }

  createTicket() {
    NetworkManager.createTicket()
    .then((result) => {
      let jwtContents = JSON.stringify(result.headerPayloadSig, null, 2);
			let jwt = result.jwt;
			sessionStorage.setItem('jwt', jwt);
      this.setState({
        jwtContents, 
        jwt
      });
    })
    .catch((err) => {
      console.log(err);
      this.setState({
        err
      });
    })
  }

  answer() {
		let jwt = sessionStorage.getItem('jwt', jwt);
    NetworkManager.postTicket(jwt)
    .then((result) => {
			console.log(result);
			if (result && result.message) {
        alert('Welcome to STACK amusement park!');
      } else {
        alert(`Oops, there is something wrong with your ticket: ${result.error}. Try again?`);
      }
    });
  }

  render() {
    let toggle;
    if (this.state.jwtContents) {
      toggle = (
        <div>
          <div className='jwt'>
            Your JWT token is: {this.state.jwt}
          </div>  
          <div className='jwtContents'>
            The contents of the JWT token is: 
            <pre>{this.state.jwtContents}</pre>  
          </div>      
          <button className='button' onClick={this.answer}>Submit your token to gain entry!</button>
          <div>{this.state.payload}</div>
        </div>
      )
    } else {
      toggle = (
        <div>
          <button className='startButton' onClick={this.createTicket}>Create Ticket</button>
          <div className='errorMessage'>{this.state.err}</div>
        </div>
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
