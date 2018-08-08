import React, { Component } from 'react'

import PlayIcon from '../data/img/SVG/playIcon.svg';
import StopIcon from '../data/img/SVG/stopIcon.svg'

const PlayerToggle = (props) => {
  let Icon = PlayIcon;
  if (props.isPlaying) {
    Icon = StopIcon;
  }
    return(
      <button className="toggle_player_button" onClick ={props.onClick}>
        <img src={Icon} />
      </button>
    )
}

const Volume = (props) => {
    return(
    <input onChange={props.onChange} type="range" min="0" max="100"/>
    )
}


export {PlayerToggle, Volume}
