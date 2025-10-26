import React, { useState } from 'react';
import TestimonialCard from './TestimonialCard';
import { ChevronLeftIcon, ChevronRightIcon } from './IconComponents';

const testimonialsData = [
  {
    quote: "Global EdVentures made my dream of studying in the UK a reality. Their guidance on the visa and application process was invaluable. I felt supported from Lahore all the way to London! The entire team was professional, responsive, and incredibly knowledgeable, making the entire process seamless.",
    name: 'Fatima Ahmed',
    program: 'MSc Computer Science - UK',
    avatarUrl: 'https://picsum.photos/100/100?image=880',
  },
  {
    quote: "I wasn't sure which local university was right for me. The counselors helped me choose IBA, and it's been the perfect fit. The campus life and quality of education are exceptional.",
    name: 'Ali Khan',
    program: 'BBA at IBA - Karachi',
    avatarUrl: 'https://picsum.photos/100/100?image=835',
  },
  {
    quote: "Juggling cricket and academics is tough, but this program in Australia was perfect. The training was world-class, and I managed to keep up with my studies. An amazing experience!",
    name: 'Saad Iqbal',
    program: 'Cricket Scholarship - Australia',
    avatarUrl: 'https://picsum.photos/100/100?image=838',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonialsData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === testimonialsData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <section id="testimonials" className="py-20 bg-blue-50 dark:bg-gray-900">
       <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">What Our Students Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Hear directly from students who have embarked on their own global ed-venture with us.
          </p>
        </div>
        <div className="relative w-full max-w-3xl mx-auto">
          {/* Container for testimonials. Grid layout ensures it sizes to the tallest child, preventing layout jumps. */}
          <div className="relative grid grid-cols-1 grid-rows-1">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={index}
                className={`
                  col-start-1 row-start-1 
                  transition-all duration-700 ease-in-out
                  ${ index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none' }
                `}
                aria-hidden={index !== currentIndex}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-4 md:-left-12 p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-gray-200" />
          </button>
          
          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-4 md:-right-12 p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-gray-200" />
          </button>
          
          <div className="flex justify-center space-x-3 pt-8">
            {testimonialsData.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === slideIndex ? 'bg-blue-600 dark:bg-blue-400 scale-125' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-current={currentIndex === slideIndex}
                aria-label={`Go to testimonial ${slideIndex + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;