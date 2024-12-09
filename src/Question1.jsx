import './page.css';
import q1Solution from './solutions/q1.txt';
import q1Back from '/q1-back.svg';    // "/..." means importing from public folder. Necessary import statement so the webpack handles the correct route for me when base url is different
import q1Mid from '/q1-ground.svg';
import q1 from '/q1.svg';
import TextFetch from './assets/TextFetch.tsx';
import Explanation from './assets/Explanation.tsx';
import Interactive from './assets/Interactive.tsx';

export default function Q1() {
  let template = TextFetch(q1Solution);
  let sliderExample = <Interactive leftUrl={q1Back} middleUrl={q1Mid} rightUrl={q1}
  dimensions={{width: 580, height: 232, middleWidth: 23}}
  maxRange={0.784} />;
  let figure = <img src={q1} alt="figure 1" />
  let comparison = <img src={q1Mid} alt="comparison" />
  let resources = {
    slider: sliderExample,
    q1: figure,
    comparison: comparison
  };

  return (
    <>
      <h1>Question 1</h1>
      <img src="/q1.png" alt="Question 1 (NOT there yet)" />
      <Explanation template={template} resources={resources} />
      <a href="index.html">BACK</a>
    </>);
}
