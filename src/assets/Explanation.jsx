import katex from 'katex';
import "katex/dist/katex.min.css";  // css for latex
import PropTypes from 'prop-types';
import '/src/assets/Explanation.css'

function Math(props) {
  let mathHTML = katex.renderToString(props.latex, {throwOnError: false});
  return <span dangerouslySetInnerHTML={{__html: mathHTML}}></span>;
}

Math.propTypes = {
  latex: PropTypes.string
}

export default function Explanation() {
  return (
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
  );
};