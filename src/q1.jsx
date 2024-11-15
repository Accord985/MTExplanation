import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import q1Solution from './solutions/q1.txt';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>Question 1</h1>
    <img src="/q1.png" alt="Question 1 (NOT there yet)" />
    <App textUrl={q1Solution} />
  </StrictMode>,
)
