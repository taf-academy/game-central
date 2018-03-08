import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GamesList from './GamesList';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <GamesList/>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default App;
