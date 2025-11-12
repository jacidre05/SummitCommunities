import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Home.css";
const slides = [
    {
        img: "/images/SCLogo.png",
        title: "WELCOME TO\nSUMMIT COMMUNITIES",
        text: "Our ‘Reach for the Top’ philosophy means we are dedicated to providing clean, quality housing to those who might have previously gone through a challenging time in life. We continuously strive to be the best in the industry.",
        bg: "/images/BC.jpg"
    },
    {
        img: "/images/SCLogo.png",
        title: "TRUSTED BY INVESTORS\nRESIDENTS & COMMUNITIES",
        text: "Summit Communities focuses on value-add multifamily opportunities. We transform neglected properties into clean and comfortable communities for working class residents, provide an engaging and fun place to work for our employees and provide above average returns for investors.",
        bg: "/images/ABG.png"
    },
    {
        img: "/images/SCLogo.png",
        title: "PROVIDING CAREER OPPORTUNITIES\nIN A FAST GROWING COMPANY ",
        text: "We pride ourselves on a providing a familial-like community for our residents. In order to attract and retain employees who are approachable, accepting, and proactive, we’ve created a welcoming culture. In addition to competitive compensation, we offer a place to build a career and truly make an impact on our residents' lives.",
        bg: "/images/KABG.png"
    },
];
const Home = () => {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "slider-container", children: _jsx(Swiper, { modules: [Autoplay, Pagination, EffectFade], effect: "fade", autoplay: { delay: 5000, disableOnInteraction: false }, pagination: { clickable: true }, loop: true, children: slides.map((slide, index) => (_jsx(SwiperSlide, { children: _jsxs("div", { className: "slide-background", style: { backgroundImage: `url(${slide.bg})` }, children: [_jsx("div", { className: "overlay" }), _jsxs("div", { className: "slide-text", children: [_jsx("img", { src: slide.img, alt: "Logo" }), _jsx("h2", { children: slide.title.split("\n").map((line, i) => (_jsxs("span", { children: [line, _jsx("br", {})] }, i))) }), _jsx("div", { className: "slide-separator" }), _jsx("p", { children: slide.text })] })] }) }, index))) }) }), _jsxs("section", { className: "image-text-section", children: [_jsx("div", { className: "image-container", children: _jsx("img", { src: "/images/Sample.png", alt: "Sample" }) }), _jsxs("div", { className: "text-container", children: [_jsx("h2", { children: "About Our Community" }), _jsx("p", { children: "Summit Communities is committed to creating modern, sustainable, and vibrant communities where people can thrive. Join us to explore opportunities and experience our unique developments." })] })] })] }));
};
export default Home;
