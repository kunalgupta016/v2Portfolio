import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import SectionDivider from "./components/SectionDivider";
import LoadingScreen from "./components/LoadingScreen";


export default function Home() {
  return (
    <>
      <LoadingScreen />

      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Navbar />
      <main id="main-content">
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Achievements />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
