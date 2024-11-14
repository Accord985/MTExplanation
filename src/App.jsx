import './App.css';
import q1 from '/q1.svg';
import q1Back from '/q1-back.svg';  // "/..." means importing from public folder. Necessary import statement so the webpack handles the correct route for me when base url is different
import q1Ground from '/q1-ground.svg';
import Interactive from './assets/Interactive';
import Explanation from './assets/Explanation';

function App() {

  return (
    <>
      <section>
        Question
      </section>
      <Explanation />
      <Interactive left={q1Back} middle={q1Ground} right={q1}
          dimensions={{width: 580, height: 232, middleWidth: 23}}
          maxRange={0.784} />
      <a href="index.html">BACK</a>
    </>
  )
}

export default App
