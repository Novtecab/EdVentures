import React from 'react';
import { useTheme } from '../ThemeContext';
import { SunIcon, MoonIcon } from './IconComponents';

const ThemeToggle: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => {
  const { theme, toggleTheme } = useTheme();

  // Base classes for consistent styling
  const buttonBaseClass = "relative w-10 h-10 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 overflow-hidden";
  const iconBaseClass = "w-6 h-6 transition-all duration-300 ease-in-out absolute";
  
  // Dynamic classes based on state
  let iconColorClass = '';
  let ringOffsetClass = '';
  let buttonBgClass = '';

  if (isScrolled) {
    buttonBgClass = 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600';
    iconColorClass = 'text-gray-700 dark:text-gray-300';
    ringOffsetClass = 'focus:ring-offset-white dark:focus:ring-offset-gray-800';
  } else {
    buttonBgClass = 'bg-black/20 hover:bg-black/30';
    iconColorClass = 'text-white';
    ringOffsetClass = 'focus:ring-offset-transparent'; 
  }

  return (
    <button
      onClick={toggleTheme}
      className={`${buttonBaseClass} ${buttonBgClass} ${ringOffsetClass}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <SunIcon 
        className={`${iconBaseClass} ${iconColorClass} ${
          theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
        }`} 
      />
      <MoonIcon 
        className={`${iconBaseClass} ${iconColorClass} ${
          theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
        }`} 
      />
    </button>
  );
};

export default ThemeToggle;