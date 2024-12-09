import { useState } from 'react';
import './Interactive.css';
import React from 'react';

function Interactive({leftUrl, middleUrl, rightUrl, dimensions, minRange, maxRange}: Props) {
  if (!leftUrl || !middleUrl || !rightUrl) {
    throw new Error("Interactive requires 3 pictures");
  }
  let width = dimensions.width;
  let height = dimensions.height;
  let midWidth = dimensions.middleWidth;

  let minVal = (minRange) ? Math.floor(minRange * width) : midWidth;
  let maxVal = (maxRange) ? Math.floor(maxRange * width) : width;
  let initial = Math.floor(minVal * 0.7 + maxVal * 0.3);
  const [x, setX] = useState(initial);
  const onInput = (event: React.FormEvent) => {
    let value = parseFloat((event.target as HTMLInputElement).value);
    setX(value);
  };

  // adapt the width of wrapper
  const CLIENT_WIDTH = document.body.clientWidth;
  const correctionFactor = 0.8 * CLIENT_WIDTH / width;
  let style = {};
  let dialLength = width * 0.8;
  if (correctionFactor < 1) {
    style = {
      transform: `scale(${correctionFactor})`,
      width: `max(${width}px, 80vw)`,
    };
    dialLength = CLIENT_WIDTH * 0.8;
  }

  return (
    <section className='interactive'>
      <h2 className='diagram'>(Experimental) Interactive Example: Drag the slider!</h2>
      <section>
        <div style={style}>
          <div style={{width: `${x}px`}}>
            <img src={leftUrl} width={width} height={height} alt="Back Layer" />
            <img src={middleUrl} width={midWidth} height={height} style={{left: `${x - width - midWidth}px`}} alt="Middle Sliding Layer" />
          </div>
          <div style={{width: `${width - x}px`}}>
            <img src={rightUrl} width={width} height={height} alt="Top Layer" />
          </div>
        </div>
        <input type="range" style={{width: `${dialLength}px`}}
            min={minVal} max={maxVal} placeholder={""+initial} onInput={onInput} />
      </section>
    </section>
  )
}

// use Typescript instead of cheking in runtime
type Props = {
  leftUrl: string,
  middleUrl: string,
  rightUrl: string,
  dimensions: {
    width: number,
    height: number,
    middleWidth: number
  },
  minRange?: number,
  maxRange?: number
};

export default Interactive;
