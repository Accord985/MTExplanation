import katex from 'katex';
import "katex/dist/katex.min.css";  // css for latex
import PropTypes from 'prop-types';
import '/src/assets/Explanation.css'
import { Fragment, isValidElement, cloneElement, Children } from 'react';
import reactStringReplace from 'react-string-replace';

// only inline expressions supported. No display mode
function Math(props) {
  let mathHTML = katex.renderToString(props.latex, {throwOnError: false});
  return <span dangerouslySetInnerHTML={{__html: mathHTML}}></span>;
}

Math.propTypes = {
  latex: PropTypes.string
};

function Notes(props) {
  let note = props.note;
  return (
    <Fragment key={stringHash("notes wrapper"+note)}>
      <section className='notes' key={stringHash("notes"+note)}>
        <h3 key={stringHash("notes head"+note)}>Notes</h3>
        <p key={stringHash(""+note)}>{note}</p>
      </section>
    </Fragment>
  );
}

Notes.propTypes = {
  note: PropTypes.array
}

function stringHash(s) {
  let hash = 0;
  if (s.length === 0) return hash;
  for (let i = 0; i < s.length; i++) {
    let chr = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;  // ((hash << 5) - hash) means (hash * 31)
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export default function Explanation(props) {
  let template = props.template;
  if (template === "") {
    return <h2>Loading Explanations ...</h2>
  }
  if (template.startsWith("Error: ")) {
    return (
      <section className='error'>
        <h2>Error</h2>
        <p>{template.substring(7)}</p>
      </section>
    );
  }
  let sections = template.split("<S>\n");
  let result = [];
  for (let i = 0; i < sections.length; i++) {
    let curr = sections[i];
    if (curr !== "") {
      let currSection = buildSection(curr);
      result[i] = currSection;
    }
  }

  result = <section className='explanation'>{result}</section>;
  result = replaceMath(result);


  function replaceMath(element) {
    // base: children is string: replace the value at where i find it; no children: do nothing
    // recursive: find props children and repeat for them.
    //  array: flatten and then go through elements; element: find children; note: find the note
    const doubleBrackets = /{{((?:[^{}]+[{}]{1})*[^{}]+)}}/;  // allow any single {} in between but not {{ or }}. Captures the thing between {{ }}
    if (typeof element === 'string') {
      return reactStringReplace(element, doubleBrackets, (match, i) => {
        return <Math key={match+i} latex={match} />;
      })
    } else if (isValidElement(element)) {
      if (element.props.note) {  // in case it is Notes
        return cloneElement(element, {
          note: replaceMath(element.props.note[0])
        });
      }
      return cloneElement(element, {
        children: Children.map(element.props.children, (child) =>
          replaceMath(child)
        ),
      });
    }
    // else if (isValidElement(element)) {
    //   if (element.props.children) {
    //     replaceMath(element.props.children);
    //   } else {
    //     replaceMath(element.props.note);
    //   }
    // }
    // else if (Array.isArray(element)) {
    //   element = element.flat();
    //   for (let i = 0; i < element.length; i++) {
    //     replaceMath(element[i]);
    //   }
    // }

    // if (typeof(element) === "string") {
    //   // actually replace
    //
    //   let result = reactStringReplace(element)
    //   console.log(element);
    // } else if (element) {
    //   // could be array, another element, or the special custom Note element (whose prop is note)
    //   let children = (element.props) ? (element.props.children || element.props.note) : element;
    //   if (typeof(children) === 'string') {
    //     replaceMath(children);
    //   } else {
    //     for (let i = 0; i < children.length; i++) {
    //       replaceMath(children[i]);
    //     }
    //   }
    // }
  }

  function buildSection(sectionTemplate) {
    // a key is recommended for generating a list of elements.
    // so we let the application know which element is which.
    let parts = sectionTemplate.split('\n\n');
    let contents = [];
    for (let i = 0; i < parts.length; i++) {
      let curr = parts[i].trim();
      const numCheck = /^\d+\. /;
      if (curr.match(numCheck)) {
        contents[i] = buildList(curr);
      } else if (curr !== "") {  // do not want to render empty string
        contents[i] = buildStandard(curr);
      }
    }
    return (
      <section key={stringHash(sectionTemplate)}>
        {contents}
      </section>
    );
  }

  // * only allowed in list template
  function buildList(listTemplate) {
    const numCheck = /^\d+\. /;
    let items = listTemplate.split('\n');
    let itemElements = [];
    for (let i = 0; i < items.length; i++) {
      let curr = items[i];
      if (curr.match(numCheck)) {
        let content = curr.split(numCheck)[1];
        itemElements[i] = <li key={stringHash(content)}>{content}</li>;
      } else if (curr.startsWith("* ")) {
        itemElements[i] = <Notes note={[curr.substring(2)]} />;
      } else if (curr !== "") {
        itemElements[i] = <p key={stringHash(curr)}>{curr}</p>;
      }
    }
    return <ol key={stringHash(listTemplate)}>
      {itemElements}
    </ol>;
  }

  function buildStandard(template) {
    let lines = template.split('\n');
    let contents = [];
    for (let i = 0; i < lines.length; i++) {
      let curr = lines[i];
      if (curr.startsWith('# ')) {
        contents[i] = <h2 key={stringHash(curr)}>{curr.substring('2')}</h2>
      } else if (curr.startsWith('## ')) {
        contents[i] = <h3 key={stringHash(curr)}>{curr.substring('3')}</h3>
      } else if (curr.startsWith('### ')) {
        contents[i] = <h4 key={stringHash(curr)}>{curr.substring('4')}</h4>
      } else {
        contents[i] = <p key={stringHash(curr)}>{curr}</p>
      }
    }
    return <Fragment key={stringHash(template)}>{contents}</Fragment>;
  }

  return result;
    /*
    <section className='explanation'>
      <section>
        1. Identify the type of the Problem:
        <ol>
          <li>Stress problem: The question asks for material failure. Thus we do not need to care about the strain.</li>
          <li>Load type: axial force.</li>
          <li>bar type: segmental, which involves continuously varying force on one segment</li>
          <li>working direction: reverse [where I find appropriate properties for a given outcome (failure)]</li>
        </ol>
      </section>
      <article>
        2. Follow the procedures according to the type:
        <section>
          <p>Find the maximal load (internal force) inside the bar.</p>
          <p>· To do this, we begin by finding the internal force at any arbitrary location x (defined by the distance to the solid support)</p>
          <p>o The bar is segmented, so we cut between the 2 segments to find the expression for the internal force (as the free body diagram is different in different segments)</p>
          <p>[a] <Math latex="0<x<L-l" />: </p>
          <p>* We assume N goes to the left if it is positive because we applied internal sign convention. The benefit is that we know the force is tensile or compressive by its sign. (+=Tensile, -=Compressive)</p>
          <p>* We only replace the distributed load with resultant load (here we don&apos;t need to integrate because <Math latex="F_d" /> is uniform) after the cut.</p>
          <p>FIGURE COMPARISON</p>
          <p>* When we cut, we keep the side without solid support (easier calculation!) and assume a solid support at the cut.</p>
          <p>FIGURE INTERACTIVE</p>
          <p>Replace distributed load: <Math latex="F_R=\\int_{L-l}^L F_d dx=F_dl" /></p>
          <p><Math latex="\\sum F_x=-N+F_d(L-x)=0 => N=F_d(L-x)" /></p>
          <p>Thus, <Math latex="N(x)=F_d l, 0<x<=L-l; F_d(L-x), L-l<x<L" /></p>
          <p>Pick the maximum of N in each stage of x. </p>
          <p>In <Math latex="0<x<=L-l" />, <Math latex="max(N(x))=F_d.l" />;...</p>
          <p></p>
        </section>
        <section>
          <p>Given the general formula for axial loads, we have</p>
          <p><Math latex="\\sigma_x(x)=blablabla" /></p>
          <p>Also, as this is axial load, sig y=0 and tau=0</p>
          <p>Then the problem has become a planar stress transformation problem.</p>
        </section>
        <section>
          <p>Test for failure at x=L-l:</p>
          <p>As this is a seam problem, we are not using sig1,2 and taumax but instead the ones for calculating stress at seam:</p>
          <p>3 FORMULAS WITH TRIG</p>
          <p>As the seam will break on normal stress or shear stress, I will compare sigytheta to UTS and tautheta to USS. (sigyt lt UTS, |taut| lt USS)</p>
          <p>LAST FEW PLUG INS</p>
        </section>
      </article>
    </section>
    */
};

Explanation.propTypes = {
  template: PropTypes.string
}