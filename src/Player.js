import React, { Component } from 'react'
import {PlayerToggle, Volume} from './utility/Controls'
import tracklist from './data/json/tracklist.js'

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 0.5,
      playing: false,
      timePlaying: 0,
    }
    this.togglePlay = this.togglePlay.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

togglePlay(e) {
  e.preventDefault();
  if (this.state.playing) {
    this.audio.pause();
  } else {
    this.audio.play();
  }
  this.setState(prevState => ({
    playing: !prevState.playing
  }))
}

  changeVolume(e) {
    this.setState( {volume: e.target.value/100} )
  }

componentDidUpdate(prevProps, prevState) {
  if (this.state.volume !== prevState.volume) {
    this.audio.volume = this.state.volume;
  }
}


  render () {
    let buttonClass = this.state.playing ? "stop" : "play"
    return (
    <div className="Player_Wrapper columns">
      <div className="column">
        <img src={tracklist[0].picture} />
      </div>
      <div className="column">
        <audio
        ref={(audioTag) => { this.audio = audioTag }}
        volume={this.state.volume}
        src={tracklist[0].url}
        >
        </audio>
        <PlayerToggle text={buttonClass} onClick={this.togglePlay} />
        <Volume onChange={this.changeVolume} currentVolume={this.state.volume} />
      </div>
    </div>
  );
  }
}
