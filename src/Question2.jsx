import './page.css';
import q2 from '/q2.png';
import q2Solution from './solutions/q2.txt';

import TextFetch from './assets/textFetch.jsx';
import Explanation from './assets/Explanation.jsx';

export default function Q1() {
  let template = TextFetch(q2Solution);
  let resources = {};

  return (
    <>
      <h1>Q2: 2020 MT2, Problem 1</h1>
      <img src={q2} alt="Question 2" />
      <Explanation template={template} resources={resources} />
      <a href="index.html">BACK</a>
    </>);
}
