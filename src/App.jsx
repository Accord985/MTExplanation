import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import q1 from '/q1.svg'
import './App.css'

import katex from 'katex';

function App() {
  const [count, setCount] = useState(0);
  let formula = katex.renderToString("c=\\pm\\sqrt{a^2+b^2}", {throwOnError: false});

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <section>
        <div id="overlay">
          <img src="/q1-ground.svg" alt="Question 1 ground" />
        </div>
        <img src={q1} alt="Question 1 figure" />
      </section>
      <article dangerouslySetInnerHTML={{__html: formula}}></article>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
