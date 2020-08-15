import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
  constructor() {
      super();
      this.state = {
          input: '',
          apiWords: [],
          backronym: [],
      }
  }
  

  apiCall = (e) => {
    e.preventDefault();

    axios({
      url: 'https://api.datamuse.com/words?',
      method: 'GET',
      responseType: 'json',
      params: {
        sp: 'b*',
        lc: 'book',
      },
    }).then((res)=>{
      const apiWords = res.data
      this.setState({ apiWords })
    })
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  };

  render() {
    return(
      <div className="search">

        <form
        action="submit"
        onSubmit={(e)=> this.apiCall(e)}>
        

        <label htmlFor="input">Enter a word</label>
        <input 
          type="text" 
          value={this.state.input}
          pattern="^[A-Za-z]{3,10}$"
          required
          id="input"
          onChange={this.handleChange}
          ></input>
        <button onClick={this.apiCall}>Generate</button>

        </form>

      </div>

    )
  }
}

export default Search;