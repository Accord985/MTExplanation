import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <section>
      <h1>Midterm Explanation</h1>
      <ul>
        <li><a href="/page.html">Page</a></li>
        <li>Coming soon...</li>
      </ul>
    </section>
  </StrictMode>,
)
