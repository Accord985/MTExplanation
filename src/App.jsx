import { useState } from 'react';
import './App.css';
import q1 from '/q1.svg';
import q1Back from '/q1-back.svg';  // "/..." means importing from public folder. Necessary import statement so the webpack handles the correct route for me when base url is different
import q1Ground from '/q1-ground.svg';
import Interactive from './assets/Interactive';
import Explanation from './assets/Explanation';
import textSolution from './solutions/q1-1.txt';

function App() {
  let [template, setTemplate] = useState("");
  fetch(textSolution)
    .then(statusCheck)
    .then((res) => res.text())
    .then((result) => {
      if (result.startsWith("<!doctype html>")) {
        throw new Error("Fetch for solution text found an HTML response. Check if the source file exists.");
      }
      setTemplate(result);
    })
    .catch((err) => {setTemplate("Error: " + err.message);});

  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  return (
    <>
      <section>
        Question
      </section>
      <Explanation template={template} />
      <Interactive left={q1Back} middle={q1Ground} right={q1}
          dimensions={{width: 580, height: 232, middleWidth: 23}}
          maxRange={0.784} />
      <a href="index.html">BACK</a>
    </>
  )
}

export default App
