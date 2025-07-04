import HeroSection from './components/HeroSection'
import AboutSection from './about/page'
import ProjectsSection from './projects/page'
import ContactSection from './contact/page'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Skills from './components/Skills'


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <Skills/>
        <ProjectsSection />
        <ContactSection />
        
      </main>
      <Footer />
    </>
  )
}
