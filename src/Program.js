import React, { Component } from 'react'
import AliceCarousel from 'react-alice-carousel';
import program from './data/json/program.js'

export const Program = () => {
  const handleOnDragStart = e => e.preventDefault()

  var result = program.map(a => a.timestamp + " " +a.name);

  return (
    <AliceCarousel
    mouseDragEnabled
    items={result}
    dotsDisabled={true}
    startIndex = {3}
    responsive= {
    {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 3 },
  }
    }
      >
    </AliceCarousel>
  )
}
