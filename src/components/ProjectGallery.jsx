"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectGallery({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500 font-bold">
        Project Image
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <img 
        src={images[0]} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
      />
    );
  }

  const prevSlide = (e) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (e) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full group/gallery">
      <img 
        src={images[currentIndex]} 
        alt={`${title} - image ${currentIndex + 1}`} 
        className="w-full h-full object-cover transition-opacity duration-300" 
      />
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover/gallery:opacity-100 transition-opacity z-20"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover/gallery:opacity-100 transition-opacity z-20"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-20">
        {images.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-cyan-400' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
