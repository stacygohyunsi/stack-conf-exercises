import React, { Component } from 'react';
import './App.css';
import NetworkManager from './NetworkManager';

class App extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.answer = this.answer.bind(this);
    this.state = {
      jwtContents: null, 
      jwt: null, 
      err: null
    }
  }

  signIn() {
    NetworkManager.signIn()
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
    NetworkManager.postAnswer(jwt)
    .then((result) => {
			console.log(result);
			if (result && result.status === 'correct') {
        alert('Congrats, you got it right! Help us keep the answer as a secret ya? (;');
      } else {
        alert('Oops, the answer is wrong. Make another guess!');
      }
    });
  }

  render() {
    let toggle;
    if (this.state.jwtContents) {
      toggle = (
        <div>
          <div className='jwtContents'>
            The contents of the JWT token is: 
            <pre>{this.state.jwtContents}</pre>  
          </div>  
          <div className='jwt'>
            Your JWT token is: {this.state.jwt}
          </div>      
          <button className='button' onClick={this.answer}>Submit JWT and find out the answer</button>
          <div>{this.state.payload}</div>
        </div>
      )
    } else {
      toggle = (
        <div>
          <button className='startButton' onClick={this.signIn}>Sign In</button>
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
