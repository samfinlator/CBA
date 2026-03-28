import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import StyleGuide from './StyleGuide.tsx'

const isStyleGuide = window.location.pathname === '/styleguide'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isStyleGuide ? <StyleGuide /> : <App />}
  </StrictMode>,
)
