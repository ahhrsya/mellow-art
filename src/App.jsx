import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CreativeShowcase from './components/CreativeShowcase'
import Marquee from './components/Marquee'
import About from './components/About'
import FeaturedEvents from './components/FeaturedEvents'
import EventsScrollReveal from './components/EventsScrollReveal'
import Artists from './components/Artists'
import MakersDirectory from './components/MakersDirectory'
import Contact from './components/Contact'
import Footer from './components/Footer'

import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CreativeShowcase />
        <Marquee variant="alt" />
        <About />
        <Marquee />
        <FeaturedEvents />
        <EventsScrollReveal />
        <Marquee variant="alt" />
        <Artists />
        <MakersDirectory />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
