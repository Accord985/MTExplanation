import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Q1 from './Question1.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Q1 />
  </StrictMode>,
)
