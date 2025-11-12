import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Home.css";

// Import images from src — Webpack will hash them
import BG1 from "./Components/BC.jpg";
import BG2 from "./Components/ABG.png";
import BG3 from "./Components/KABG.png";
import IMG from "./Components/SCLogo.png";
import Sample from "./Components/Sample.png";

const slides = [
  {
    img: IMG,
    title: "WELCOME TO\nSUMMIT COMMUNITIES",
    text: "Our ‘Reach for the Top’ philosophy means we are dedicated to providing clean, quality housing to those who might have previously gone through a challenging time in life. We continuously strive to be the best in the industry.",
    bg: BG1,
  },
  {
    img: IMG,
    title: "TRUSTED BY INVESTORS\nRESIDENTS & COMMUNITIES",
    text: "Summit Communities focuses on value-add multifamily opportunities. We transform neglected properties into clean and comfortable communities for working class residents, provide an engaging and fun place to work for our employees and provide above average returns for investors.",
    bg: BG2,
  },
  {
    img: IMG,
    title: "PROVIDING CAREER OPPORTUNITIES\nIN A FAST GROWING COMPANY",
    text: "We pride ourselves on a providing a familial-like community for our residents. In order to attract and retain employees who are approachable, accepting, and proactive, we’ve created a welcoming culture. In addition to competitive compensation, we offer a place to build a career and truly make an impact on our residents' lives.",
    bg: BG3,
  },
];

const Home: React.FC = () => {
  return (
    <>
      <div className="slider-container">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="slide-background"
                style={{ backgroundImage: `url(${slide.bg})` }}
              >
                <div className="overlay" />
                <div className="slide-text">
                  <img src={slide.img} alt="Logo" />
                  <h2>
                    {slide.title.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </h2>
                  <div className="slide-separator"></div>
                  <p>{slide.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <section className="image-text-section">
        <div className="image-container">
          <img src={Sample} alt="Sample" />
        </div>
        <div className="text-container">
          <h2>About Our Community</h2>
          <p>
            Summit Communities is committed to creating modern, sustainable,
            and vibrant communities where people can thrive. Join us to explore
            opportunities and experience our unique developments.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
