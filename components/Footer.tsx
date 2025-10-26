import React from 'react';
import { GlobeIcon } from './IconComponents';

const Footer: React.FC = () => {
  const navLinks = [
    { name: 'Universities', href: '#universities' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Apply', href: '#application' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="flex items-center space-x-2 text-2xl font-bold text-white">
              <GlobeIcon className="w-8 h-8"/>
              <span>Global EdVentures</span>
            </a>
            <p className="mt-4 text-gray-400 max-w-xs">
              Pioneering futures through international education and athletic development.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-100 uppercase tracking-wider">Quick Links</h2>
              <ul className="text-gray-400 space-y-3">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-white transition-colors duration-300">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
             <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-100 uppercase tracking-wider">Follow Us</h2>
              <ul className="text-gray-400 space-y-3">
                {socialLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
             <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-100 uppercase tracking-wider">Legal</h2>
              <ul className="text-gray-400 space-y-3">
                <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="text-center text-gray-500">
          &copy; {new Date().getFullYear()} Global EdVentures. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;