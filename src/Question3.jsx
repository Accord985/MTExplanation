import './page.css';
import q3 from '/q3.jpg';
import q3Solution from './solutions/q3.txt';

import TextFetch from './assets/TextFetch.tsx';
import Explanation from './assets/Explanation.tsx';
// import Interactive from './assets/Interactive.tsx';

export default function Q3() {
  let template = TextFetch(q3Solution);

  let resources = {};

  return (
    <>
      <h1>Q3: 2021 Final, Problem 2</h1>
      <img src={q3} alt="Question 3" />
      <Explanation template={template} resources={resources} />
      <a href="index.html">BACK</a>
    </>);
}
