import Navbar from './sections/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import Marquee from './sections/Marquee.jsx'
import About from './sections/About.jsx'
import Services from './sections/Services.jsx'
import Booking from './sections/Booking.jsx'
import Team from './sections/Team.jsx'
import Gallery from './sections/Gallery.jsx'
import Testimonials from './sections/Testimonials.jsx'
import Hours from './sections/Hours.jsx'
import FinalCta from './sections/FinalCta.jsx'
import Footer from './sections/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'

// Cada seção é independente: remova, reordene ou duplique à vontade.
export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Booking />
        <Team />
        <Gallery />
        <Testimonials />
        <Hours />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
