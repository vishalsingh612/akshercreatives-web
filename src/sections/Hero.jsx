import React from "react";
import "./Hero.css";
import rightImage from "../assets/dummy.png";
import bottomBlur from "../assets/bottom_blur_image.png";


const Hero = () => {
  return (
    <section className="hero-section">

      {/* Top ribbon */}
      <div className="hero-blue-ribbon" />

      {/* Right decorative big image */}
      <div className="hero-right">
        <img src={rightImage} className="hero-right-img" alt="decorative" />
      </div>

      {/* Left content */}
      <div className="hero-content">
        <h1>
          YOUR AUDIENCE IS OUT THERE <br /> WAITING FOR YOU.
        </h1>

        <p className="hero-sub-title">
          YOU JUST <span>AREN'T IN FRONT OF THEM.</span>
        </p>

        <p className="hero-description">
          Everyone has problems and are looking for solutions, chances are the
          solution you are selling isn't reaching the people who need it most.
          Let’s change that — so you can help as many people as possible.
        </p>

        <button className="hero-btn">Book A Discovery Call</button>
      </div>

      {/* Bottom blur PNG */}
      <img src={bottomBlur} className="hero-bottom-blur" alt="blur"  />
    </section>
  );
};

export default Hero;
