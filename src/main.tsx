import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import StyleGuide from './StyleGuide.tsx'
import GetInTouchPage from './GetInTouchPage.tsx'
import PrivacyPolicyPage from './PrivacyPolicyPage.tsx'
import CookiesPolicyPage from './CookiesPolicyPage.tsx'

const faviconFrames = [
  '/favicon-frame-1.svg',
  '/favicon-frame-3.svg',
  '/favicon-frame-2.svg',
]

function startFaviconAnimation() {
  const iconEl = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!iconEl) return

  let frame = 0
  iconEl.href = faviconFrames[frame]

  window.setInterval(() => {
    frame = (frame + 1) % faviconFrames.length
    iconEl.href = `${faviconFrames[frame]}?v=${frame}`
  }, 700)
}

const isStyleGuide = window.location.pathname === '/styleguide'
const isGetInTouchPage = window.location.pathname === '/get-in-touch'
const isPrivacyPolicyPage = window.location.pathname === '/privacy-policy'
const isCookiesPolicyPage = window.location.pathname === '/cookies-policy'

startFaviconAnimation()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isStyleGuide ? <StyleGuide /> : isGetInTouchPage ? <GetInTouchPage /> : isPrivacyPolicyPage ? <PrivacyPolicyPage /> : isCookiesPolicyPage ? <CookiesPolicyPage /> : <App />}
  </StrictMode>,
)
