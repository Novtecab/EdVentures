import React from 'react';

const ProgramCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg dark:border dark:border-gray-700 flex flex-col">
      <div className="w-full h-56 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
        <div className="h-5 w-1/2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
        
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-6 flex-grow"></div>

        <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mt-auto"></div>
      </div>
    </div>
  );
};

export default ProgramCardSkeleton;
