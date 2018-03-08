import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: 900,
      height: 900,
      overflowY: 'auto',
    },
  };

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
        let gameData = self.getGameData(jsonData);
        self.setState({
            games: gameData
        });
      });
  }
  
  componentWillUnmount() {

  }

  getGameData(jsonData) {
    let gameData = [];
    for (var i = 0; i < jsonData.length; i++) {
        let gameInfo = jsonData[i].game;
        let game = {
            id: gameInfo.id,
            name: gameInfo.name,
            url: gameInfo.url,
            thumb: gameInfo.cover.url,
            img: gameInfo.cover.url.replace("t_thumb", "t_1080p")
        }
        gameData.push(game)
    }
    return gameData;
  }
  
  getGameRow(start, rowsize) {
    let row = [];
    for (let game = start; game < start + rowsize; game++) {
        if (game < this.state.games.length) {
            let gameInfo = this.state.games[game];
            row.push( 
                <div element="game" key={game}>
                    <a href={gameInfo.url} target="_blank">{gameInfo.name}</a>
                    <img src={gameInfo.img} width="200"/>
                </div>
            );   
        }         
    }   
    let rowid = row + start;
    return (
        <div className="row" key={rowid}>{row}</div>
    );
  }

  handleClick(data) {
        window.open(data, "_blank");
  }

  render() {
      
    let rowsize = 3;
    let gameslist = [];

    for (var game = 0; game < this.state.games.length; game += rowsize) {
        gameslist.push(this.getGameRow(game, rowsize));
    }

    return (    

        <div style={styles.root}>
            <GridList cellHeight={180} style={styles.gridList} >
            <Subheader>Games</Subheader>
            {this.state.games.map((tile) => (
                <GridTile
                onClick={ (e) => {
                    this.handleClick(tile.url)
                }}
                key={tile.img}
                title={tile.name}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}>
                <img src={tile.img} />
                </GridTile>
            ))}
            </GridList>
        </div>
    );
  }
}
  