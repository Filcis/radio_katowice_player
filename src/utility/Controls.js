import React, { Component } from 'react'

const PlayerToggle = (props) => {
    return(
      <button className="button" onClick ={props.onClick}>{props.text}</button>
    )
}

const Volume = (props) => {
    return(
    <input onChange={props.onChange} type="range" min="0" max="100"/>
    )
}


export {PlayerToggle, Volume}
