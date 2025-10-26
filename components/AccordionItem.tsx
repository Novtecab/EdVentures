import React, { useState, ReactNode } from 'react';
import { ChevronDownIcon } from './IconComponents';

interface AccordionItemProps {
  title: string;
  // Fix: Specify that the icon accepts a className prop for type safety with React.cloneElement.
  icon: React.ReactElement<{ className?: string }>;
  children: ReactNode;
  defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-900/50 hover:bg-gray-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {React.cloneElement(icon, { className: 'w-6 h-6 mr-3 text-blue-400' })}
          <span className="text-xl font-semibold text-gray-200">{title}</span>
        </div>
        <ChevronDownIcon
          className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 bg-gray-800 border-t border-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
