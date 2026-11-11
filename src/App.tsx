import Nav from './components/Nav'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Grader from './components/Grader'
import { DeepDive, FinalCTA, Integrations, Pillars, Privacy, Stats, Testimonials } from './components/Sections'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Pillars />
        <DeepDive />
        <Grader />
        <Testimonials />
        <Integrations />
        <Privacy />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
