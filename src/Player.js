import React, { Component } from 'react'
import {PlayerToggle, Volume} from './utility/Controls'
import tracklist from './data/json/tracklist.js'
import {secondsToMs} from './utility/secondsToMs'

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


  render () {
    let buttonClass = this.state.playing ? "stop" : "play"
    return (
    <div className="Player_Wrapper columns is-gapless">
      <div className="column is-one-quarter player_picture" style={ {backgroundImage: "url("+tracklist[this.state.currentTrack].picture+")"} }></div>
      <div className="column is-three-quarters">
        <div className="columns is-multiline is-gapless has-background-red ">
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
              <p>{secondsToMs(this.state.timePlaying)}</p>
            </div>
          </div>
          <div className="column is-full program_wrapper">

          </div>
        </div>
      </div>
    </div>
  );
  }
}
