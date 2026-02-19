import HeroSection from "./components/HeroSection";
import AboutSection from "./about/page";
import ProjectsSection from "./projects/page";
import ContactSection from "./contact/page";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import SectionDivider from "./components/SectionDivider";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main>
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
