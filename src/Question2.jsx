import './page.css';
import q2 from '/q2.png';
import q2Solution from './solutions/q2.txt';

import q1Back from '/q1-back.svg';
import q1Mid from '/q1-ground.svg';
import q1 from '/q1.svg';

import TextFetch from './assets/TextFetch.tsx';
import Explanation from './assets/Explanation.tsx';
import Interactive from './assets/Interactive.tsx';

export default function Q2() {
  let template = TextFetch(q2Solution);
  let sliderExample = <Interactive leftUrl={q1Back} middleUrl={q1Mid} rightUrl={q1}
      dimensions={{width: 580, height: 232, middleWidth: 23}}
      maxRange={0.784} />;
  let resources = {
    showcase: sliderExample,
  };

  return (
    <>
      <h1>Q2: 2020 MT2, Problem 1</h1>
      <img src={q2} alt="Question 2" />
      <Explanation template={template} resources={resources} />
      <a href="index.html">BACK</a>
    </>);
}
