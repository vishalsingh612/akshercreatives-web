import React, { useEffect, useRef, useState } from "react";
import "./AboutUs.css";

// import your logos (replace with your real imports)
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo7 from "../assets/logo7.png";
import logo10 from "../assets/logo10.png";

const logos = [logo2, logo3, logo4, logo7, logo10];

const countersConfig = [
  { id: "c1", value: 300, suffix: "+", label: "Short Form\nVideos Generated" },
  { id: "c2", value: 200, suffix: "+", label: "Long Form\nVideos Generated" },
  { id: "c3", value: 2, suffix: "+", label: "Years In\nContent Creation" },
  { id: "c4", value: 4, suffix: "+", label: "Years In\nVideo Editing" },
];

const CountUp = ({ end, suffix = "", play = false, duration = 2200 }) => {
  const [value, setValue] = useState(0);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!play || ranRef.current) return;
    ranRef.current = true;

    const frames = Math.min(90, Math.ceil(duration / 16));
    const increment = end / frames;
    let current = 0;

    const id = setInterval(() => {
      current += increment;
      if (current >= end) {
        setValue(end);
        clearInterval(id);
      } else {
        setValue(Math.floor(current));
      }
    }, duration / frames);

    return () => clearInterval(id);
  }, [play, end, duration]);

  return (
    <span className="count-value" aria-live="polite">
      {value}
      {suffix}
    </span>
  );
};

const AboutUs = () => {
  const marqueeRef = useRef(null);
  const sectionRef = useRef(null);
  const countersRowRef = useRef(null);
  const [playCounters, setPlayCounters] = useState(false);

  // start counters when section visible
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPlayCounters(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // layout safety-net: ensure counters-row is full-bleed and DOES NOT capture pointer events
  useEffect(() => {
    const el = countersRowRef.current;
    const sectionEl = sectionRef.current;
    if (!el || !sectionEl) return;

    const applyLayout = () => {
      const rect = sectionEl.getBoundingClientRect();

      // width / left to make full-bleed aligned with viewport
      el.style.width = `${window.innerWidth}px`;
      el.style.marginLeft = `${-rect.left}px`;
      el.style.boxSizing = "border-box";

      // defensive: ensure not transformed or absolute
      el.style.left = "0";
      el.style.transform = "none";
      el.style.position = "relative";

      // IMPORTANT: do not intercept pointer events so touches scroll the page
      el.style.pointerEvents = "none";

      // but allow children to receive pointer events if needed in future
      // we set child .counter-item pointer-events to auto via CSS (see AboutUs.css)
    };

    applyLayout();

    // debounce resize to avoid too many calls
    let resizeTimer = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyLayout, 80);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // small delayed reapply for late fonts/layout
    const timeout = setTimeout(applyLayout, 250);

    return () => {
      clearTimeout(timeout);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  // make marquee pause on hover or focus
  useEffect(() => {
    const m = marqueeRef.current;
    if (!m) return;
    const onEnter = () => m.classList.add("paused");
    const onLeave = () => m.classList.remove("paused");
    m.addEventListener("mouseenter", onEnter);
    m.addEventListener("mouseleave", onLeave);
    m.addEventListener("focusin", onEnter);
    m.addEventListener("focusout", onLeave);
    return () => {
      m.removeEventListener("mouseenter", onEnter);
      m.removeEventListener("mouseleave", onLeave);
      m.removeEventListener("focusin", onEnter);
      m.removeEventListener("focusout", onLeave);
    };
  }, []);

  return (
    <section className="aboutus-section" id="about" ref={sectionRef}>
      {/* full-bleed counters row as a direct child of the section */}
      <div className="counters-row" ref={countersRowRef} role="list" aria-label="Key metrics">
        {countersConfig.map((c, i) => (
          <div
            className={`counter-item ${playCounters ? "visible" : ""}`}
            role="listitem"
            key={c.id}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className="counter-number">
              <CountUp end={c.value} suffix={c.suffix} play={playCounters} duration={2600} />
            </div>
            <div className="counter-label">
              {c.label.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* centered area for the marquee and rest of content */}
      <div className="aboutus-inner">
        <div className="logos-marquee-wrap" aria-hidden="false">
          <div className="logos-marquee" ref={marqueeRef}>
            {[...logos, ...logos].map((logo, i) => (
              <div className="logo-item" key={i}>
                <img src={logo} alt={`client-${i}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
