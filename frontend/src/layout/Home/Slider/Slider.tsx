import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";

const slides = [
  {
    img: "https://media.istockphoto.com/id/1460007248/photo/library-research-and-row-of-books-on-bookshelf-for-reading-knowledge-and-educational-learning.jpg?s=612x612&w=0&k=20&c=CnesX3CEboQJ8gN92T4AUjWOl36Ygkmg9yG2catjzms=",
    title: "Discover New Books",
    subtitle: "Explore our curated collection today",
    button: "Browse Now",
    buttonLink: "/shop",
  },
  {
    img: "https://swiperjs.com/demos/images/nature-2.jpg",
    title: "Join the Book Lover Community",
    subtitle: "Connect with readers worldwide",
    button: "Get Started",
    buttonLink: "/community",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Slider() {
  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        effect="fade"
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ 
          clickable: true,
          el: '.swiper-pagination',
          renderBullet: (index, className) => {
            return `<span class="${className} bg-white/30 hover:bg-white/50 transition-all duration-300"></span>`;
          }
        }}
        autoplay={{ 
          delay: 6000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        speed={1200}
        className="book-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide 
            key={index} 
            className="relative"
          >
            {/* Background image with overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Content */}
            <div className="relative h-full flex items-center justify-center text-center px-4">
              <div className="max-w-3xl mx-auto">
                <motion.p
                  className="text-lg md:text-xl text-white/90 mb-4 font-light tracking-wider"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  {slide.subtitle}
                </motion.p>
                
                <motion.h2
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  {slide.title}
                </motion.h2>
                
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.6 }}
                >
                  <a
                    href={slide.buttonLink}
                    className="inline-block bg-white text-gray-900 hover:bg-transparent hover:border hover:border-white hover:scale-105 active:scale-95 py-3 px-8  text-lg font-medium transition-all duration-300 shadow-lg"
                  >
                    {slide.button}
                  </a>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Navigation arrows */}
        <div className="swiper-button-prev !hidden md:!flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="swiper-button-next !hidden md:!flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        {/* Pagination */}
        <div className="swiper-pagination !bottom-8"></div>
      </Swiper>
    </div>
  );
}