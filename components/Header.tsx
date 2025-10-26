import React, { useState, useEffect } from 'react';
import { MenuIcon, CloseIcon, GlobeIcon, HomeIcon, AcademicCapIcon, ChatBubbleIcon, EyeIcon } from './IconComponents';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', icon: HomeIcon },
    { name: 'Universities', href: '#universities', icon: AcademicCapIcon },
    { name: 'Testimonials', href: '#testimonials', icon: ChatBubbleIcon },
    { name: 'Track Application', href: '#tracker', icon: EyeIcon },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Close mobile menu if it is open
    if (isOpen) {
      setIsOpen(false);
    }
  };


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md dark:bg-gray-800' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className={`flex items-center space-x-2 text-2xl font-bold ${isScrolled ? 'text-blue-600 dark:text-blue-400' : 'text-white'}`}>
            <GlobeIcon className="w-8 h-8"/>
            <span>Global EdVentures</span>
          </a>
          <div className="hidden md:flex items-center">
            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`relative group flex items-center space-x-2 py-2 text-lg font-medium transition-all duration-300 hover:brightness-110 ${isScrolled ? 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400' : 'text-gray-100 hover:text-white'}`}>
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                  <span className={`absolute bottom-0 left-0 h-[2px] w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center ${isScrolled ? 'bg-blue-600 dark:bg-blue-400' : 'bg-white'}`}></span>
                </a>
              ))}
            </nav>
            <div className="ml-6">
              <ThemeToggle isScrolled={isScrolled} />
            </div>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle isScrolled={isScrolled} />
            <button onClick={() => setIsOpen(!isOpen)} className={`${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`}>
              {isOpen ? <CloseIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-800`}>
        <nav className="flex flex-col items-center space-y-4 py-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="relative group flex items-center space-x-2 py-2 text-xl font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-all duration-300 hover:brightness-110">
              <link.icon className="w-6 h-6" />
              <span>{link.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;