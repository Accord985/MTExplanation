import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import q2Solution from './solutions/q2.txt';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>Q2: 2020 MT2, Problem 1</h1>
    <img src="/q2.png" alt="Question 2" />
    <App textUrl={q2Solution} />
  </StrictMode>,
)
