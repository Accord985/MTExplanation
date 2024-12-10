import './page.css';
import q3 from '/q3.jpg';
import q3Solution from './solutions/q3.txt';

import fig1Left from '/q3-fig1-left.svg';
import fig1Right from '/q3-fig1-right.svg';
import fig1Mid from '/q3-fig1Mid.svg';

import TextFetch from './assets/TextFetch.tsx';
import Explanation from './assets/Explanation.tsx';
import Interactive from './assets/Interactive.tsx';

export default function Q3() {
  let template = TextFetch(q3Solution);

  let fig1Dimensions = {
    width: 580,
    height: 232,
    middleWidth: 80
  };
  let figure1 = <Interactive leftUrl={fig1Left} middleUrl={fig1Mid} rightUrl={fig1Right}
      dimensions={fig1Dimensions} minRange={40/192} maxRange={155/192} />;
  let resources = {
    fig1: figure1,
  };

  return (
    <>
      <h1>Q3: 2021 Final, Problem 2</h1>
      <img src={q3} alt="Question 3" />
      <Explanation template={template} resources={resources} />
      <a href="index.html">BACK</a>
    </>);
}
