import { useEffect, useRef, useState } from 'react'
import GradientCanvas from './components/GradientCanvas'
import { GRADIENT_SEED, GRADIENT_START_TIME } from './gradientConfig'
import Header from './components/Header'
import Hero from './components/Hero'
import LogoTicker from './components/LogoTicker'
import About from './components/About'
import FeaturedQuotes from './components/FeaturedQuotes'
import OurPeople from './components/OurPeople'
import TrackRecord from './components/TrackRecord'
import WhatMakesUs from './components/WhatMakesUs'
import TheNumbers from './components/TheNumbers'
import GetInTouch from './components/GetInTouch'
import Footer from './components/Footer'

function App() {
  const mainContentRef = useRef<HTMLDivElement>(null)
  const [viewportW, setViewportW] = useState(() => window.outerWidth || document.documentElement.clientWidth || window.innerWidth)

  useEffect(() => {
    const setViewportMetrics = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
      setViewportW(window.outerWidth || document.documentElement.clientWidth || window.innerWidth)
    }

    setViewportMetrics()
    window.addEventListener('resize', setViewportMetrics)

    return () => {
      window.removeEventListener('resize', setViewportMetrics)
    }
  }, [])


  return (
    <>
      {/* Fixed gradient canvas — behind all content */}
      <div className="fixed inset-0 -z-10">
        <GradientCanvas className="w-full h-full" fixed seed={GRADIENT_SEED} startTime={GRADIENT_START_TIME} />
      </div>

      {/* Gutter cover: fills the areas outside the 1512px content column
          with the page colour so the gradient doesn't bleed into the sides
          at any zoom level. pointer-events:none so it never blocks clicks. */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: `linear-gradient(to right,
            var(--color-page) 0px,
            var(--color-page) calc(50% - 756px),
            transparent      calc(50% - 756px),
            transparent      calc(50% + 756px),
            var(--color-page) calc(50% + 756px),
            var(--color-page) 100%)`,
        }}
      />

      {/* Overscroll top cover — hides gradient canvas when macOS rubber-band scrolls above the page */}
      <div
        className="fixed left-0 right-0 pointer-events-none"
        style={{ top: "-300px", height: "300px", backgroundColor: "var(--color-page)", zIndex: 1 }}
      />

      <Header />

      {/* Hero + Logo Ticker — Safari-safe viewport height container */}
      <div
        id="hero-section"
        className="bg-page flex flex-col"
        style={{
          padding: "5px",
          height: viewportW < 900 ? "var(--app-height, 100svh)" : "calc(var(--app-height, 100svh) / 0.9)",
          gap: "6px",
        }}
      >
        <Hero />
        <LogoTicker />
      </div>

      {/* Main content — flex column with section gaps */}
      <div ref={mainContentRef} className="relative flex flex-col gap-[80px] bg-page">
        <div className="relative z-10 w-full max-w-[1512px] mx-auto">
          <About />
        </div>

        <div className="relative z-10">
          <FeaturedQuotes />
        </div>

        <div className="relative z-10 w-full max-w-[1512px] mx-auto">
          <OurPeople />
        </div>

        <div className="relative z-10">
          <TrackRecord />
        </div>
        
        
        <div className="relative z-10 w-full max-w-[1512px] mx-auto">
          <WhatMakesUs />
        </div>

        <div className="relative z-10 w-full max-w-[1512px] mx-auto">
          <TheNumbers />
        </div>

        <div className="relative z-10 w-full max-w-[1512px] mx-auto">
          <GetInTouch />
        </div>

      </div>

      {/* Footer — full bleed */}
      <Footer />
    </>
  )
}

export default App
