// src/components/Navbar.js
import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo_white.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Blur background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu if screen goes desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // SMOOTH SCROLL WITH OFFSET FOR FIXED NAVBAR
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navHeight = navRef.current?.getBoundingClientRect().height || 0;
    const top = window.pageYOffset + el.getBoundingClientRect().top - navHeight - 12;

    window.scrollTo({ top, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        
        {/* LOGO */}
        <div className="navbar-logo" onClick={() => scrollToSection("home")}>
          <img src={logo} alt="Aksher Creatives" />
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

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <p onClick={() => scrollToSection("home")}>Home</p>
          <p onClick={() => scrollToSection("about")}>Why Aksher</p>
          <p onClick={() => scrollToSection("testimonials")}>Testimonials</p>
          <p onClick={() => scrollToSection("services")}>What We Do</p>
          <p onClick={() => scrollToSection("faq")}>FAQ</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
