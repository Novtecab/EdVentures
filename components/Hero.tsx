
import React, { useState, useEffect } from 'react';
import { ChevronRightIcon } from './IconComponents';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensures animation runs on load
    setIsLoaded(true);
  }, []);

  const handleScrollTo = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&h=1200&fit=crop" alt="Graduation caps tossed in the air at a university" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="relative z-10 text-center px-4">
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-lg transition-all ease-out duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          Your Gateway to Local & Global Education
        </h1>
        <p className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 font-light drop-shadow-md transition-all ease-out duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          Explore top universities in Pakistan and abroad. We provide expert guidance for your academic journey.
        </p>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 ease-out delay-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <a 
            href="#universities"
            onClick={(e) => handleScrollTo(e, 'universities')}
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-xl font-bold rounded-full shadow-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            Explore Universities <ChevronRightIcon className="w-6 h-6 ml-2" />
          </a>
          <a 
            href="#application"
            onClick={(e) => handleScrollTo(e, 'application')}
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white text-xl font-bold rounded-full shadow-xl hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
