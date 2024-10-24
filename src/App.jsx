import { useState } from 'react';  // "/..." means importing from public folder
import './App.css';
import katex from 'katex';

function App() {
  const [count, setCount] = useState(0);
  const [x, setX] = useState(80);
  let formula = katex.renderToString("c=\\pm\\sqrt{a^2+b^2}", {throwOnError: false});
  const onInput = (evt) => {
    setX(evt.target.value);
  };

  return (
    <>
      <section>
        Question
      </section>
      <section>
        Some explanation
      </section>
      <section>
        Interactive Example: Drag the slider!
        <input type="range" min="2" max="449" placeholder="80" onInput={onInput} />
        <div id="overlay" style={{width: `${x}px`}}>
          <img src="./src/assets/q1-ground.svg" alt="Question 1 ground" />
        </div>
        <img src="./src/assets/q1.svg" alt="Question 1 figure" />
      </section>
      <article dangerouslySetInnerHTML={{__html: formula}}></article>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
