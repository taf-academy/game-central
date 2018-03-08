import React, {Component} from 'react';


export default class GamesList extends Component {

  constructor (props) {
      super(props);
      this.state = {games: []};
  }
  
  componentWillMount() {
    // Is there a React-y way to avoid rebinding `this`? fat arrow?
    var self = this;
    fetch('games.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonData) {
          self.setState({
            games: jsonData
          });
      });
  }
  
  componentWillUnmount() {

  }
  
  getGameRow(start, rowsize) {
    let row = [];
    for (let game = start; game < start + rowsize; game++) {
        if (game < this.state.games.length) {
            row.push( 
                <div element="game" key={game}>
                    {this.state.games[game].game.name}
                </div>
            );   
        }         
    }   
    let rowid = row + start;
    return (
        <div className="row" key={rowid}>{row}</div>
    );
  }
  render() {
    let rowsize = 3;
    let gameslist = [];

    for (var game = 0; game < this.state.games.length; game += rowsize) {
        gameslist.push(this.getGameRow(game, rowsize));
    }

    return (
      <div className="gameslist">
            {gameslist}
      </div>
    );
  }
}
  