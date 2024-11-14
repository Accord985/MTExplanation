import { useState } from 'react';
import './Interactive.css';
import PropTypes from 'prop-types';

function Interactive(props) {
  if (!props || !props.left || !props.middle || !props.right) {
    throw new Error("Interactive requires 3 pictures");
  }
  if (!props.dimensions || !props.dimensions.width
        || !props.dimensions.height || !props.dimensions.middleWidth) {
    throw new Error("Dimensions Missing");
  }
  let left = props.left;
  let middle = props.middle;
  let right = props.right;
  let width = props.dimensions.width;
  let height = props.dimensions.height;
  let midWidth = props.dimensions.middleWidth;
  let minRange = props.minRange;
  let maxRange = props.maxRange;

  let minVal = (minRange) ? Math.floor(minRange * width) : midWidth;
  let maxVal = (maxRange) ? Math.floor(maxRange * width) : width;
  let initial = Math.floor(minVal * 0.7 + maxVal * 0.3);
  const [x, setX] = useState(initial);
  const onInput = (evt) => {
    setX(evt.target.value);
  };

  // adapt the width of wrapper
  const correctionFactor = 0.8 * document.body.clientWidth / width;
  let style = {};
  if (correctionFactor < 1) {
    style = {
      transform: `translateX(${(document.body.clientWidth - width) / 2}px) scale(${correctionFactor})`,
      width: `max(${width}px, 80vw)`
    };
  }

  return (
    <>
      <h2 className='diagram'>Interactive Example: Drag the slider!</h2>
      <section>
        <div style={style}>
          <div id="overlay" style={{width: `${x}px`}}>
            <img src={left} width={width} height={height} alt="Back Layer" />
            <img src={middle} width={midWidth} height={height} style={{left: `${x - width - midWidth}px`}} alt="Middle Sliding Layer" />
          </div>
          <div id="back" style={{width: `${width - x}px`}}>
            <img src={right} width={width} height={height} alt="Top Layer" />
          </div>
        </div>
        <input type="range" style={{width: `${width * 0.8}px`}}
            min={minVal} max={maxVal} placeholder={initial} onInput={onInput} />
      </section>
    </>
  )
}

// use Typescript instead of cheking in runtime
Interactive.propTypes = {
  left: PropTypes.string,
  middle: PropTypes.string,
  right: PropTypes.string,
  dimensions: PropTypes.object,
  minRange: PropTypes.number || null,
  maxRange: PropTypes.number || null
}

export default Interactive;
