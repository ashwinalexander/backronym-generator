import React, { Component } from "react";
import Search from "./Search";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { render } from "@testing-library/react";
import firebase from "./firebase";

// Make an input and submit button on "search" component
//- store input value in state
//- turn input value into array of characters using spread operator
//- set min character count = 4, max = 10, no space, no special characters

//sub Component
//- on submit, call API for the first letter
//- when the user keeps the first word, we make another API call for the second letter based on the first word they choose
//- make as many calls as letters in the input, save each word to an array
//- .map API return on page

class App extends Component {
  constructor() {
    super ();
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    const auth = firebase.auth();
    
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }
  
  //LOGIN FUNCTION
  login = () => {  
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    
    auth.signInWithPopup(provider).then((result) =>{
      const user = result.user;
      this.setState({ user })
    })
  }
  
  // LOGOUT FUNCTION
  logout = () => {
    const auth = firebase.auth();
    
    auth.signOut().then(() => {
      this.setState({
        user: null
      })
    })
  }
  

  render() {
    return (
      <Router>
        <Route exact path="/backronym" component={ App } />
        <Route path="/backronym/generate" component={Search} />
        <div className="gridParent">
            <div className="login">
              <h1>Auth</h1>
              { 
                this.state.user
                ? <button onClick={this.logout}>Log out</button>
                : <button onClick={this.login}>
                    <Link className="lightButton" to="/backronym/generate">START</Link>
                  </button>
              }
              
            </div>
            <div className="hero"></div>
          </div>
      </Router>
    );
  }
}

export default App;
