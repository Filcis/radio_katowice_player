import React, { Component } from 'react'
import {PlayerToggle, Volume, Timer} from './utility/Controls'
import tracklist from './data/json/tracklist.js'

import {Program} from './Program.js'

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 0.5,
      playing: false,
      timePlaying: 0,
      currentTrack: 0,
    }
    this.togglePlay = this.togglePlay.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.startClock = this.startClock.bind(this);
    this.pauseClock = this.pauseClock.bind(this);
  }

togglePlay(e) {
  e.preventDefault();
  if (this.state.playing) {
    this.audio.pause();
    this.pauseClock();
  } else {
    this.audio.play();
    this.startClock();
  }
  this.setState(prevState => ({
    playing: !prevState.playing
  }))
}

changeVolume(value) {
    this.setState( {volume: value/100} )
  }

countTime() {
  this.setState((prevState) => {return{timePlaying: prevState.timePlaying + 1}} )
}

startClock() {
  this.countTime();
  this.TimerInstantion = setInterval(this.countTime.bind(this), 1000);
}

pauseClock() {
  clearInterval(this.TimerInstantion);
  this.setState( {timePlaying: 0} )
}

componentDidUpdate(prevProps, prevState) {
  if (this.state.volume !== prevState.volume) {
    this.audio.volume = this.state.volume;
  }
}

// Handler for 1,2,3 keyboard keys. For changing trucks in demo. Will not be used in final player based on stream
_handleKeyPress(ev) {
  function reset () {
    if (this.state.playing) {
      this.setState({playing: 0})
      this.audio.pause();
      this.pauseClock();
    }
  }

  switch( ev.keyCode ) {
        case 49:
            this.setState({currentTrack: 0});
            reset.call(this);
            break;
        case 50:
            this.setState({currentTrack: 1});
            reset.call(this);
            break;
        case 51:
            this.setState({currentTrack: 2});
            reset.call(this);
            break;
        default:
            break;
    }
}

componentWillMount(){
    document.addEventListener("keypress", this._handleKeyPress.bind(this));
}


componentWillUnmount() {
    document.removeEventListener("keypress", this._handleKeyPress.bind(this));
}


  render () {
    let buttonClass = this.state.playing ? "stop" : "play"
    return (
    <div className="Player_Wrapper columns is-gapless">
      <div className="column is-one-quarter player_picture" style={ {backgroundImage: "url("+tracklist[this.state.currentTrack].picture+")"} }></div>
      <div className="column is-three-quarters">
        <div className="columns is-multiline is-gapless has-background-red has-rounded-corner">
          <div className="column is-one-quarter  is-verticaly-centered">
            <div className="player_info">
              <h5 className="player_headline is-size-7">Teraz na antenie:</h5>
              <p className="is-size-5 is-capitalized ">{tracklist[this.state.currentTrack].artist}</p>
              <p className="is-size-5 is-capitalized has-text-weight-bold	is-uppercase">{tracklist[this.state.currentTrack].songname}</p>
            </div>
          </div>
          <div className="column is-three-quarters is-verticaly-centered">
            <div className="player_controls">
              <audio
              ref={(audioTag) => { this.audio = audioTag }}
              volume={this.state.volume}
              src={tracklist[this.state.currentTrack].url}
              >
              </audio>
              <PlayerToggle isPlaying={this.state.playing} text={buttonClass} onClick={this.togglePlay} />
              <Volume onChange={this.changeVolume} currentVolume={this.state.volume * 100} />
              <Timer timePlaying={this.state.timePlaying} />
            </div>
          </div>
          <div className="column is-full program_wrapper has-rounded-corner">
            <div className="columns is-gapless">
            <div className="column is-1 has-background-grey">
              <h4 className="player_program_headline">DZISIAJ</h4>
            </div>
            <div className="column is-11">
            <Program />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
}
