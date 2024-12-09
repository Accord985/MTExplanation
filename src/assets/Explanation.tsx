import katex from 'katex';
import "katex/dist/katex.min.css";  // css for latex
import PropTypes from 'prop-types';
import '/src/assets/Explanation.css'
import { Fragment, isValidElement, cloneElement, Children, ReactElement } from 'react';
import reactStringReplace from 'react-string-replace';
import React from 'react';

// only inline expressions supported. No display mode
function Math({latex, display}: {latex: string, display: boolean}) {
  let mathHTML = katex.renderToString(latex, {throwOnError: false, displayMode: display});
  return <span dangerouslySetInnerHTML={{__html: mathHTML}}></span>;
}

function Notes({note}: {note: (string | ReactElement)[]}) {
  console.log(note);
  return (
    <Fragment key={stringHash("notes wrapper"+note)}>
      <section className='notes' key={stringHash("notes"+note)}>
        <h3 key={stringHash("notes head"+note)}>Notes</h3>
        <p key={stringHash(""+note)}>{note}</p>
      </section>
    </Fragment>
  );
}

function stringHash(s: string) {
  let hash = 0;
  if (s.length === 0) return hash;
  for (let i = 0; i < s.length; i++) {
    let chr = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;  // ((hash << 5) - hash) means (hash * 31)
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export default function Explanation(props: {template: string, resources: Record<string, ReactElement>}) {
  let template = props.template;
  let resources = props.resources;
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
  let sections: string[] = template.split("<S>\n");
  let sectionElements = [];
  for (let i = 0; i < sections.length; i++) {
    let curr = sections[i];
    if (curr !== "") {
      let currSection = buildSection(curr);
      sectionElements[i] = currSection;
    }
  }

  let result = <section className='explanation'>{sectionElements}</section>;
  const doubleBrackets: RegExp = /{{((?:[^{}]+[{}]{1})*[^{}]+)}}/;  // allow any single {} in between but not {{ or }}. Captures the thing between {{ }}
  result = replaceInlineTemplates(result, doubleBrackets, (match, i) => {
    return <Math key={match+i} latex={match} display={false} />;
  }) as ReactElement;
  const figure = /##RESOURCE (.+)/;  // I don't care about resource in resource
  result = replaceInlineTemplates(result, figure, (match,i) => {
    let resource = resources[match] || <p key={match+i}>{`Error: unable to find an item with key "${match}" in resources`}</p>;
    return resource;
  }) as ReactElement;

  function replaceInlineTemplates(element: ReactElement | string, regex: RegExp, replaceFunc: (match: string, i: number) => ReactElement): (string | ReactElement) {
    // base: children is string: replace the value at where i find it; no children: do nothing
    // recursive: find props children and repeat for them.
    //  array: flatten and then go through elements; element: find children; note: find the note
    if (typeof element === 'string') {
      let replacement = reactStringReplace(element, regex, replaceFunc);
      return <>{replacement}</>;
    } else if (isValidElement(element)) {
      let eProps = element.props as {note?: (string | ReactElement)[], latex?: string, children: ReactElement[]};
      if (eProps.note) {  // Notes has a different way of accessing the children
        let replaced = eProps.note.map((item: string | ReactElement) => {
          return replaceInlineTemplates(item, regex, replaceFunc);
        });  // replace every single component
        return <Notes note={replaced.flat()} />;
      }
      if (eProps.latex) {  // Don't process Math element
        return element;
      }
      return cloneElement(element, eProps, Children.map(eProps.children, (child) =>
        replaceInlineTemplates(child, regex, replaceFunc)
      ));
    }
    return <></>;
  }

  function buildSection(sectionTemplate: string) {
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
  function buildList(listTemplate: string) {
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
      } else if (curr.startsWith('##RESOURCE ')) {
        let resourceName = curr.substring(11);
        itemElements[i] = resources[resourceName] ||
            <p key={resourceName}>{`Error: unable to find an item with key "${resourceName}" in resources`}</p>;;
      } else if (curr !== "") {
        itemElements[i] = <p key={stringHash(curr)}>{curr}</p>;
      }
    }
    return <ol key={stringHash(listTemplate)}>
      {itemElements}
    </ol>;
  }

  function buildStandard(template: string) {
    let lines = template.split('\n');
    let contents = [];
    for (let i = 0; i < lines.length; i++) {
      let curr = lines[i];
      let currKey = stringHash(curr);
      if (curr.startsWith('# ')) {
        contents[i] = <h2 key={currKey}>{curr.substring(2)}</h2>
      } else if (curr.startsWith('## ')) {
        contents[i] = <h3 key={currKey}>{curr.substring(3)}</h3>
      } else if (curr.startsWith('### ')) {
        contents[i] = <h4 key={currKey}>{curr.substring(4)}</h4>
      } else if (curr.startsWith('* ')) {
        contents[i] = <h4 key={currKey}>{curr.substring(2)}</h4>
      } else if (curr.startsWith('$ ')) {
        contents[i] = <Math latex={curr.substring(2)} display={true} />
      } else if (curr.startsWith('##RESOURCE ')) {
        let resourceName = curr.substring(11);
        contents[i] = resources[resourceName] ||
            <p key={resourceName}>{`Error: unable to find an item with key "${resourceName}" in resources`}</p>;;
      } else {
        contents[i] = <p key={currKey}>{curr}</p>
      }
    }
    return <Fragment key={stringHash(template)}>{contents}</Fragment>;
  }

  return result;
};

Explanation.propTypes = {
  template: PropTypes.string,
  resources: PropTypes.object
}