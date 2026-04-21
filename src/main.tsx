import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import StyleGuide from './StyleGuide.tsx'
import GetInTouchPage from './GetInTouchPage.tsx'
import PrivacyPolicyPage from './PrivacyPolicyPage.tsx'
import CookiesPolicyPage from './CookiesPolicyPage.tsx'

const isStyleGuide = window.location.pathname === '/styleguide'
const isGetInTouchPage = window.location.pathname === '/get-in-touch'
const isPrivacyPolicyPage = window.location.pathname === '/privacy-policy'
const isCookiesPolicyPage = window.location.pathname === '/cookies-policy'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isStyleGuide ? <StyleGuide /> : isGetInTouchPage ? <GetInTouchPage /> : isPrivacyPolicyPage ? <PrivacyPolicyPage /> : isCookiesPolicyPage ? <CookiesPolicyPage /> : <App />}
  </StrictMode>,
)
