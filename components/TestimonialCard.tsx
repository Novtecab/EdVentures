import React from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  program: string;
  avatarUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, program, avatarUrl }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg dark:shadow-none dark:border dark:border-gray-700 flex flex-col h-full">
      <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg italic mb-6 flex-grow">"{quote}"</p>
      <div className="flex items-center mt-auto">
        <div className="w-14 h-14 rounded-full overflow-hidden mr-4 flex-shrink-0">
          <img 
            src={avatarUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
        <div>
          <p className="font-bold text-gray-800 dark:text-gray-100 text-base sm:text-lg">{name}</p>
          <p className="text-blue-600 dark:text-blue-400 font-medium">{program}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;