import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/logo_white.png";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add black blur background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false); // close mobile menu
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        
        {/* LOGO */}
        <div className="navbar-logo">
          <img
            src={logo}
            alt="Aksher Creatives"
          />
          <span>Aksher Creatives</span>
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-links">
          <li onClick={() => scrollToSection("home")}>Home</li>
          <li onClick={() => scrollToSection("about")}>Why Aksher</li>
          <li onClick={() => scrollToSection("testimonials")}>Testimonials</li>
          <li onClick={() => scrollToSection("services")}>What We Do</li>
          <li onClick={() => scrollToSection("faq")}>FAQ</li>
        </ul>

        {/* Hamburger icon */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <p onClick={() => scrollToSection("home")}>Home</p>
          <p onClick={() => scrollToSection("why")}>Why Aksher</p>
          <p onClick={() => scrollToSection("testimonials")}>Testimonials</p>
          <p onClick={() => scrollToSection("services")}>What We Do</p>
          <p onClick={() => scrollToSection("faq")}>FAQ</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
