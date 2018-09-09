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
      jwt: null
    }
  }

  signIn() {
    NetworkManager.signIn()
    .then((result) => {
      let jwtContents = JSON.stringify(result.headerPayloadSig, null, 2);
      let jwt = result.jwt;
      this.setState({
        jwtContents, 
        jwt
      });
    });
  }

  answer() {
		fetch(`http://localhost:3000/api/answers`, {
      method: 'POST', 
      credentials: 'include'
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
        <button className='button' onClick={this.signIn}>Sign In</button>
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
