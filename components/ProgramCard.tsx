import React from 'react';
import { ChevronRightIcon, LocationMarkerIcon, CheckCircleIcon, SparklesIcon, GlobeAltIcon } from './IconComponents';
import { Program } from './types';

interface InstitutionCardProps {
  name: string;
  location: string;
  imageUrl: string;
  description: string;
  programs: Program[];
  region: string;
  onViewDetails: () => void;
  hasSelectedPrograms?: boolean;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({ name, location, imageUrl, description, programs, region, onViewDetails, hasSelectedPrograms }) => {
  const allScholarships = programs.flatMap(p => p.scholarships || []);
  
  const allTags = programs.flatMap(p => p.tags || []);
  const uniqueTags = [...new Set(allTags)];
  const topTags = uniqueTags.slice(0, 3);


  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-none dark:hover:border-blue-500 dark:border dark:border-gray-700 transform hover:-translate-y-2 transition-all duration-300 flex flex-col dark:hover:shadow-lg dark:hover:shadow-blue-500/20 ${hasSelectedPrograms ? 'ring-2 ring-offset-2 ring-offset-gray-50 dark:ring-offset-black ring-blue-500' : ''}`}>
      {hasSelectedPrograms && (
        <div 
          className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-full p-0.5 shadow-lg z-10"
          title="You have selected programs from this institution"
        >
          <CheckCircleIcon className="w-6 h-6 text-blue-500" />
        </div>
      )}
      <img src={imageUrl} alt={name} className="w-full h-56 object-cover" />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{name}</h3>
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
          <LocationMarkerIcon className="w-5 h-5 mr-2" />
          <span>{location}</span>
        </div>
         <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
          <GlobeAltIcon className="w-5 h-5 mr-2" />
          <span>{region}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
            {topTags.map(tag => (
                <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">{tag}</span>
            ))}
        </div>

        {allScholarships.length > 0 && (
          <div className="mb-6">
            <h4 className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <SparklesIcon className="w-5 h-5 mr-2 text-yellow-400" />
              Scholarships Available
            </h4>
            <ul className="space-y-1 pl-1">
              {allScholarships.slice(0, 2).map((scholarship, index) => (
                <li key={index} className="text-sm text-gray-500 dark:text-gray-400 truncate" title={scholarship.name}>
                  &bull; {scholarship.name}
                </li>
              ))}
              {allScholarships.length > 2 && (
                <li className="text-sm text-gray-500 dark:text-gray-400 italic">...and {allScholarships.length - 2} more</li>
              )}
            </ul>
          </div>
        )}

        <button 
          onClick={onViewDetails} 
          className="inline-flex items-center justify-center text-white bg-blue-600 dark:bg-blue-500 font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 mt-auto px-6 py-2 rounded-md"
        >
          View Details <ChevronRightIcon className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default InstitutionCard;