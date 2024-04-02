import React, { useState, useEffect } from "react";
import "../../styles/carousel.css";
import Logo_blanco from "../../assets/Logo_blanco.png";
import Carousel1 from "../../assets/carousel1.png";
import Carousel2 from "../../assets/carousel2.png";
import Carousel3 from "../../assets/carousel3.png";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: Carousel1,
      text1: "Visualiza la distribución del agua",
      text2: "Crea zonas de captación, acumulación y riego.",
    },
    {
      image: Carousel2,
      text1: "Automatiza el proceso hidrológico",
      text2:
        "Genera rápidamente patrones de diseño óptimos para cualquier terreno.",
    },
    {
      image: Carousel3,
      text1: "Utiliza Realidad Aumentada",
      text2:
        "Digitaliza tu gestión de aguas de lluvia en tu terreno con tecnología IA.",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlide, slides.length]);

  return (
    <div className="componenteCarouselInterior">
      <div className="componenteInterior">
        <div className="divVertical">
       
          <div className="carousel">
         
            <div className="slide">
            <img className="LogoBlanco" src={Logo_blanco} alt="" />
            <br />
            <br />
            <br />
            <br />
              <img className="imgCarousel"
                src={slides[currentSlide].image}
                alt={`Imagen ${currentSlide + 1}`}
              />
              <br />
              <br />
              <h4>{slides[currentSlide].text1}</h4>
              <p>{slides[currentSlide].text2}</p>
            </div>
          </div>
          <br />
          <br />
          <div className="navigation">
            {slides.map((slide, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
