import React, { Component } from 'react'
import Slider from 'react-rangeslider'


import PlayIcon from '../data/img/SVG/playIcon.svg';
import StopIcon from '../data/img/SVG/stopIcon.svg';

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
    <Slider
        value= {props.currentVolume}
        orientation="horizontal"
        onChange={props.onChange}
        step= {1}
        tooltip= {false}
      />
    )
}


export {PlayerToggle, Volume}
