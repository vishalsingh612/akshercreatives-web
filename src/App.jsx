import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import "./App.css";
import AboutUs from "./sections/Aboutus";

function App() {

  // Smooth scrolling for same-page links
  useEffect(() => {
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });
  }, []);

  return (
    <div className="app-container">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section id="home">
        <Hero />
      </section>

      {/* ABOUT SECTION */}
      <section id="about">
       <AboutUs />
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="section">
        <h2>Services</h2>
        <p>Content coming soon…</p>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section">
        <h2>Contact</h2>
        <p>Content coming soon…</p>
      </section>

    </div>
  );
}

export default App;
