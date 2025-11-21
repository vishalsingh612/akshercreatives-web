import React, { useEffect, useRef, useState } from "react";
import "./AboutUs.css";

// IMPORT LOGOS FROM YOUR ASSETS
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo7 from "../assets/logo7.png";
import logo10 from "../assets/logo10.png";

// Add/remove logos here
const logos = [logo2, logo3, logo4, logo7, logo10];

const countersConfig = [
  { id: "c1", value: 300, suffix: "+", label: "Short Form\nVideos Generated" },
  { id: "c2", value: 200, suffix: "+", label: "Long Form\nVideos Generated" },
  { id: "c3", value: 2, suffix: "+", label: "Years In\nContent Creation" },
  { id: "c4", value: 4, suffix: "+", label: "Years In\nVideo Editing" },
];

/**
 * CountUp now accepts a `play` boolean prop.
 * When play === true the animation runs once.
 */
const CountUp = ({ end, suffix = "", play = false, duration = 2200 }) => {
  const [value, setValue] = useState(0);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!play || ranRef.current) return;
    ranRef.current = true;
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  const animate = () => {
    // smoother/slower animation controlled by duration prop
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
  };

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
  const [playCounters, setPlayCounters] = useState(false);

  useEffect(() => {
    // Observe the whole section; when it's visible start counters
    const node = sectionRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPlayCounters(true);
            obs.disconnect(); // only trigger once
          }
        });
      },
      { threshold: 0.35 }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="aboutus-section" id="about" ref={sectionRef}>
      <div className="aboutus-inner">
        {/* Counters Row */}
        <div className="counters-row" role="list" aria-label="Key metrics">
          {countersConfig.map((c, idx) => (
            <React.Fragment key={c.id}>
              <div className="counter-item" role="listitem">
                <div className="counter-number">
                  {/* Longer duration for smoother visual */}
                  <CountUp end={c.value} suffix={c.suffix} play={playCounters} duration={2800} />
                </div>
                <div className="counter-label">
                  {c.label.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>

              {idx < countersConfig.length - 1 && (
                <div className="counter-divider" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* LOGO MARQUEE */}
        <div
          className="logos-marquee-wrap"
          onMouseEnter={() => marqueeRef.current?.classList.add("paused")}
          onMouseLeave={() => marqueeRef.current?.classList.remove("paused")}
        >
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
