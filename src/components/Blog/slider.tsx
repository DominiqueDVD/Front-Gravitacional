// SliderComponent.tsx
import React, { useState, useEffect } from 'react';
import '../../styles/blog.css';

const SliderComponent: React.FC<{ slides: any[] }> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides]);

  const handleSlideClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="story-slider">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          alt={`Slide ${index}`}
          className={index === currentSlide ? 'active' : ''}
          onClick={() => handleSlideClick(index)}
        />
      ))}
    </div>
  );
};

export default SliderComponent;
