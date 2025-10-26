import React, { useState, useEffect } from 'react';
import InstitutionCard from './ProgramCard';
import InstitutionModal from './InstitutionModal';
import { Institution, Scholarship, SelectedProgram } from './types';
import ProgramCardSkeleton from './ProgramCardSkeleton';
import { GlobeAltIcon, AcademicCapIcon, BookOpenIcon, SparklesIcon } from './IconComponents';

const programFilters = [
  { type: 'All', label: 'All Programs', icon: GlobeAltIcon },
  { type: 'Bachelors', label: 'Bachelors', icon: AcademicCapIcon },
  { type: 'Masters', label: 'Masters', icon: AcademicCapIcon },
  { type: 'Course', label: 'Course', icon: BookOpenIcon },
] as const;

const scholarshipFilters = [
  { type: 'All', label: 'All Programs', icon: GlobeAltIcon },
  { type: 'Available', label: 'With Scholarships', icon: SparklesIcon },
] as const;

interface ProgramsProps {
  institutionsData: Institution[];
  isLoading: boolean;
  selectedPrograms: SelectedProgram[];
  onToggleProgram: (program: SelectedProgram) => void;
  onToggleScholarship: (programIdentifier: { name: string; institutionName: string }, scholarship: Scholarship) => void;
  onCostChange: (programIdentifier: { name: string; institutionName: string }, costType: 'tuition' | 'livingExpenses', value: string) => void;
  careerGoalFilters: { goal: string; location: string } | null;
}

const Programs: React.FC<ProgramsProps> = ({ institutionsData, isLoading, selectedPrograms, onToggleProgram, onToggleScholarship, onCostChange, careerGoalFilters }) => {
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedType, setSelectedType] = useState<'All' | 'Bachelors' | 'Masters' | 'Course'>('All');
  const [scholarshipFilter, setScholarshipFilter] = useState<'All' | 'Available'>('All');
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    if (careerGoalFilters) {
      const goalToTagMap: { [key: string]: string } = {
        Business: 'Business',
        STEM: 'STEM',
        Sports: 'Sports',
        Arts: 'Arts',
      };
      setSelectedTag(goalToTagMap[careerGoalFilters.goal] || 'All');

      if (careerGoalFilters.location === 'In Pakistan') {
        setSelectedRegion('Asia');
        setSelectedCountry('Pakistan');
      } else {
        setSelectedRegion('All');
        setSelectedCountry('All');
      }
    }
  }, [careerGoalFilters]);

  const regions = ['All', ...Array.from(new Set(institutionsData.map(inst => inst.region))).sort()];
  const countries = ['All', ...Array.from(new Set(institutionsData.map(inst => inst.location.split(', ').pop() as string))).sort()];
  const allTags = ['All', ...Array.from(new Set(institutionsData.flatMap(inst => inst.programs.flatMap(p => p.tags || [])))).sort()];

  const handleViewDetails = (institution: Institution) => {
    setSelectedInstitution(institution);
  };

  const handleCloseModal = () => {
    setSelectedInstitution(null);
  };

  const filteredInstitutions = institutionsData.filter(inst => {
    const regionMatch = selectedRegion === 'All' || inst.region === selectedRegion;
    const countryMatch = selectedCountry === 'All' || inst.location.includes(selectedCountry);
    const typeMatch = selectedType === 'All' || inst.programs.some(p => p.type === selectedType);
    const scholarshipMatch = scholarshipFilter === 'All' || inst.programs.some(p => p.scholarships && p.scholarships.length > 0);
    const tagMatch = selectedTag === 'All' || inst.programs.some(p => p.tags?.includes(selectedTag));
    
    const abroadConditionMet = careerGoalFilters?.location === 'Abroad' 
        && selectedRegion === 'All' 
        && selectedCountry === 'All'
        && inst.location.includes('Pakistan');

    if (abroadConditionMet) {
        return false;
    }
    
    return regionMatch && countryMatch && typeMatch && scholarshipMatch && tagMatch;
  });

  return (
    <section id="universities" className="py-20 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Our Partner Institutions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Explore our network of world-class universities, both locally and internationally.
          </p>
        </div>

        <div className="mb-12 p-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-md space-y-8">
          {/* Region Filter */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Region</h3>
            <div className="flex flex-wrap gap-3" role="group" aria-label="Region filter">
              {regions.map(region => {
                const isSelected = selectedRegion === region;
                const isAllButton = region === 'All';
                
                const baseClasses = `px-4 py-2 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 flex items-center justify-center gap-2`;
                const selectedClasses = `bg-blue-600 text-white shadow-lg border border-transparent`;
                const unselectedAllClasses = `bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700`;
                const unselectedOtherClasses = `bg-gray-200 dark:bg-gray-700/60 border border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700`;
                const loadingClasses = isLoading ? 'cursor-not-allowed opacity-50' : '';

                return (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    disabled={isLoading}
                    className={`${baseClasses} ${loadingClasses} ${isSelected ? selectedClasses : (isAllButton ? unselectedAllClasses : unselectedOtherClasses)}`}
                  >
                    {isAllButton && <GlobeAltIcon className="w-5 h-5" />}
                    <span>{isAllButton ? 'All Regions' : region}</span>
                  </button>
                );
              })}
            </div>
          </div>
        
          {/* Location Filter */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Location</h3>
            <div className="flex flex-wrap gap-3" role="group" aria-label="Country filter">
              {countries.map(country => {
                const isSelected = selectedCountry === country;
                const isAllButton = country === 'All';
                
                const baseClasses = `px-4 py-2 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 flex items-center justify-center gap-2`;
                const selectedClasses = `bg-blue-600 text-white shadow-lg border border-transparent`;
                const unselectedAllClasses = `bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700`;
                const unselectedOtherClasses = `bg-gray-200 dark:bg-gray-700/60 border border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700`;
                const loadingClasses = isLoading ? 'cursor-not-allowed opacity-50' : '';

                return (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    disabled={isLoading}
                    className={`${baseClasses} ${loadingClasses} ${isSelected ? selectedClasses : (isAllButton ? unselectedAllClasses : unselectedOtherClasses)}`}
                  >
                    {isAllButton && <GlobeAltIcon className="w-5 h-5" />}
                    <span>{isAllButton ? 'All Countries' : country}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Program Level Filter */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Program Level</h3>
            <div className="flex flex-wrap gap-3" role="group" aria-label="Program type filter">
              {programFilters.map(filter => {
                const IconComponent = filter.icon;
                const isSelected = selectedType === filter.type;
                const isAllButton = filter.type === 'All';

                const baseClasses = `px-4 py-2 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 flex items-center justify-center gap-2`;
                const selectedClasses = `bg-blue-600 text-white shadow-lg border border-transparent`;
                const unselectedAllClasses = `bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700`;
                const unselectedOtherClasses = `bg-gray-200 dark:bg-gray-700/60 border border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700`;
                const loadingClasses = isLoading ? 'cursor-not-allowed opacity-50' : '';
                
                return (
                  <button
                    key={filter.type}
                    onClick={() => setSelectedType(filter.type)}
                    disabled={isLoading}
                    className={`${baseClasses} ${loadingClasses} ${isSelected ? selectedClasses : (isAllButton ? unselectedAllClasses : unselectedOtherClasses)}`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Scholarship Filter */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Scholarships</h3>
            <div className="flex flex-wrap gap-3" role="group" aria-label="Scholarship availability filter">
              {scholarshipFilters.map(filter => {
                const IconComponent = filter.icon;
                const isSelected = scholarshipFilter === filter.type;
                const isAllButton = filter.type === 'All';

                const baseClasses = `px-4 py-2 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 flex items-center justify-center gap-2`;
                const selectedClasses = `bg-blue-600 text-white shadow-lg border border-transparent`;
                const unselectedAllClasses = `bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700`;
                const unselectedOtherClasses = `bg-gray-200 dark:bg-gray-700/60 border border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700`;
                const loadingClasses = isLoading ? 'cursor-not-allowed opacity-50' : '';
                
                return (
                  <button
                    key={filter.type}
                    onClick={() => setScholarshipFilter(filter.type)}
                    disabled={isLoading}
                    className={`${baseClasses} ${loadingClasses} ${isSelected ? selectedClasses : (isAllButton ? unselectedAllClasses : unselectedOtherClasses)}`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tag Filter */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Field of Study</h3>
            <div className="flex flex-wrap gap-3" role="group" aria-label="Tag filter">
              {allTags.map(tag => {
                const isSelected = selectedTag === tag;
                const isAllButton = tag === 'All';
                
                const baseClasses = `px-4 py-2 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 flex items-center justify-center gap-2`;
                const selectedClasses = `bg-blue-600 text-white shadow-lg border border-transparent`;
                const unselectedAllClasses = `bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700`;
                const unselectedOtherClasses = `bg-gray-200 dark:bg-gray-700/60 border border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700`;
                const loadingClasses = isLoading ? 'cursor-not-allowed opacity-50' : '';

                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    disabled={isLoading}
                    className={`${baseClasses} ${loadingClasses} ${isSelected ? selectedClasses : (isAllButton ? unselectedAllClasses : unselectedOtherClasses)}`}
                  >
                    {isAllButton && <GlobeAltIcon className="w-5 h-5" />}
                    <span>{isAllButton ? 'All Fields' : tag}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => <ProgramCardSkeleton key={index} />)
          ) : filteredInstitutions.length > 0 ? (
            filteredInstitutions.map((inst, index) => {
              const hasSelectedPrograms = selectedPrograms.some(p => p.institutionName === inst.name);
              return <InstitutionCard key={index} {...inst} onViewDetails={() => handleViewDetails(inst)} hasSelectedPrograms={hasSelectedPrograms} />
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-500 dark:text-gray-400">No institutions match your filter criteria.</p>
            </div>
          )}
        </div>
      </div>
      {selectedInstitution && (
        <InstitutionModal 
          institution={selectedInstitution} 
          onClose={handleCloseModal}
          selectedPrograms={selectedPrograms}
          onToggleProgram={onToggleProgram} 
          onToggleScholarship={onToggleScholarship}
          onCostChange={onCostChange}
        />
      )}
    </section>
  );
};

export default Programs;