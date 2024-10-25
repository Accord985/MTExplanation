import { useState } from 'react';  //
import './App.css';
import q1 from '/q1.svg';  // "/..." means importing from public folder. Necessary import statement so the webpack handles the correct route for me when base url is different
import q1Ground from '/q1-ground.svg'
import katex from 'katex';

function App() {
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
        <br />
        <div id="overlay" style={{width: `${x}px`}}>
          <img src={q1Ground} alt="Question 1 ground" />
        </div>
        <img src={q1} alt="Question 1 figure" />
      </section>
      <article>
        Some LaTeX formula:
        <div dangerouslySetInnerHTML={{__html: formula}}></div>
      </article>
      <a href="index.html">BACK</a>
    </>
  )
}

export default App
