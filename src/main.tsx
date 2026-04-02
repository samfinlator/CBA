import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import StyleGuide from './StyleGuide.tsx'
import GetInTouchPage from './GetInTouchPage.tsx'

const isStyleGuide = window.location.pathname === '/styleguide'
const isGetInTouchPage = window.location.pathname === '/get-in-touch'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isStyleGuide ? <StyleGuide /> : isGetInTouchPage ? <GetInTouchPage /> : <App />}
  </StrictMode>,
)
