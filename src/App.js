import React, { Component } from 'react';
import Player from './Player';
import logo from './logo.svg';
import Granim from 'react-granim'
import './App.css';

class App extends Component {
  render() {

var GranimConfig = {
      states : {
          "default-state": {
              gradients: [
                  ['#574444', '#000'],
                  ['#000', '#574444'],
                  ['#B81313', '#574444'],
                  ['#574444','#B81313']
              ],
              transitionSpeed: 2000,
              loop: true
          },
      }
    }

    var GranimStyle = {
      position: 'absolute',
display: 'block',
width: '100%',
height: '19em',
top: 0,
right: 0,
bottom: 0,
left: 0
    }

    return (
      <div className="App">
        <Granim style={GranimStyle} states={GranimConfig.states} id="granim"></Granim>
        <div className="container">
        <Player />
        </div>
      </div>
    );
  }
}

export default App;
