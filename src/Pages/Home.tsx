import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./Home.css";
import BG1 from "./Components/BC.jpg";
import BG2 from "./Components/HL.jpg";
import BG3 from "./Components/Career.jpeg";
import IMG from "./Components/SCLogo.png";
import Slide1 from "./Components/home-slider1.png";
import Slide2 from "./Components/home-slider2.png";
import Slide3 from "./Components/home-slider3.png";
import Slide4 from "./Components/home-slider4.png";

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
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafRef = useRef<number | null>(null);

  const getParallaxIntensity = () => {
    const width = window.innerWidth;
    if (width >= 1200) return 40;
    if (width >= 768) return 25;
    return 15;
  };

  const getTextParallaxIntensity = () => {
    const width = window.innerWidth;
    if (width >= 1200) return 30;
    if (width >= 768) return 20;
    return 10;
  };

  // Parallax
  useEffect(() => {
    const animateParallax = () => {
      if (!swiperRef.current) return;
      const bgIntensity = getParallaxIntensity();
      const textIntensity = getTextParallaxIntensity();

      swiperRef.current.slides.forEach((slideEl: any) => {
        const bg = slideEl.querySelector(".slide-background") as HTMLElement;
        const text = slideEl.querySelector(".slide-text-content") as HTMLElement;

        if (bg) {
          const progress = slideEl.progress as number;
          bg.style.transform = `translateX(${progress * bgIntensity}px)`;
        }

        if (text) {
          const progress = slideEl.progress as number;
          text.style.transform = `translateY(${progress * textIntensity}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(animateParallax);
    };

    rafRef.current = requestAnimationFrame(animateParallax);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Update active index when slide changes
  const onSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <>
      <div className="slider-container">
        <Swiper
          modules={[Autoplay]}
          speed={800}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={onSlideChange}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="slide-background-wrapper">
                <div
                  className="slide-background"
                  style={{ backgroundImage: `url(${slide.bg})` }}
                />
                <div className="overlay" />
                <div className="slide-text">
                  <img src={slide.img} alt="Logo" />
                  <div className="slide-text-content">
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* React-based custom pagination */}
        <div className="custom-pagination">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`custom-bullet ${index === activeIndex ? "active" : ""}`}
              onClick={() => swiperRef.current.slideToLoop(index)}
            >
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
          ))}
          <div
            className="custom-line"
            style={{
              width: `${100 / slides.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        </div>
      </div>

      <section className="image-text-section">
        <div className="image-container">
          <Swiper
            modules={[Autoplay]}
            speed={800}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            spaceBetween={10}
          >
            {[Slide1, Slide2, Slide3, Slide4].map((imgSrc, index) => (
              <SwiperSlide key={index}>
                <img src={imgSrc} alt={`Slide ${index + 1}`} />
              </SwiperSlide>
            ))}
        </Swiper>
        </div>
        <div className="text-container">
          <h2>Next Level of Living</h2>
          <div className="text-separator"></div>
          <p>
            At Summit Communities, we exist to meet the human condition by providing clean, quality housing to the masses. We are focused on responsive management, understanding life challenges and providing compassion when working with applicants, and offering freshly renovated units with in-unit washer and dryer.
          <ul>
            <li>Albion Apartments</li>
            <li>Arboreta Apartments</li>
            <li>Boulder Crossroads</li>
            <li>Knight Apartments</li>
            <li>Sunlight Townhomes</li>
            <li>Highland Way Apartments</li>
            <li>Meadows at Town Center</li>
            <li>Sierra Vista</li>
          </ul>
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
