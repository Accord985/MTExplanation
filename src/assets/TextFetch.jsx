import { useState } from 'react';

export default function TextFetch(textUrl) {  // have to start with uppercase because i need to use useState
  let [template, setTemplate] = useState("");
  fetch(textUrl)
    .then(statusCheck)
    .then((res) => res.text())
    .then((result) => {
      if (result.startsWith("<!doctype html>")) {
        throw new Error("Fetch for solution text found an HTML response. Check if the source file exists.");
      }
      setTemplate(result);
    })
    .catch((err) => {setTemplate("Error: " + err.message);});
  return template;
}

async function statusCheck(res) {
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res;
}