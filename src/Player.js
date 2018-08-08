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
      currentTrack: 0,
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
              <Volume onChange={this.changeVolume} currentVolume={this.state.volume} />
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
