import React, { useState, useEffect, useRef } from 'react';
import { CloseIcon, AcademicCapIcon, LocationMarkerIcon, CheckIcon, BookOpenIcon, ClockIcon, CalendarIcon, ClipboardListIcon, CashIcon, HomeModernIcon, SparklesIcon, PlusIcon, ChevronDownIcon, CheckCircleIcon, UserGroupIcon, DocumentDuplicateIcon, TrashIcon } from './IconComponents';
import { Institution, Program, Scholarship, SelectedProgram } from './types';
import ComparisonModal from './ComparisonModal';

type ProgramTypeFilter = 'All' | 'Masters' | 'Bachelors' | 'Course';

interface InstitutionModalProps {
  institution: Institution;
  onClose: () => void;
  selectedPrograms: SelectedProgram[];
  onToggleProgram: (program: SelectedProgram) => void;
  onToggleScholarship: (programIdentifier: { name: string; institutionName: string }, scholarship: Scholarship) => void;
  onCostChange: (programIdentifier: { name: string; institutionName: string }, costType: 'tuition' | 'livingExpenses', value: string) => void;
}

interface ProgramListItemProps {
  program: Program;
  isSelected: boolean;
  selectedScholarshipsForProgram: Scholarship[];
  onToggleProgram: (program: SelectedProgram) => void;
  onToggleScholarship: (programIdentifier: { name: string; institutionName: string }, scholarship: Scholarship) => void;
  institutionName: string;
  currentSelectedProgram: SelectedProgram | undefined;
  onCostChange: (programIdentifier: { name: string; institutionName: string }, costType: 'tuition' | 'livingExpenses', value: string) => void;
  onToggleCompare: (program: Program) => void;
  isComparing: boolean;
  compareDisabled: boolean;
}

const ProgramListItem: React.FC<ProgramListItemProps> = ({ 
  program, 
  isSelected, 
  selectedScholarshipsForProgram,
  onToggleProgram,
  onToggleScholarship,
  institutionName,
  currentSelectedProgram,
  onCostChange,
  onToggleCompare,
  isComparing,
  compareDisabled
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const programWithInstitution = { ...program, institutionName };
  const selectedScholarshipCount = selectedScholarshipsForProgram.length;
  const prevIsSelectedRef = useRef(isSelected);

  useEffect(() => {
    // When a program is newly selected (i.e., isSelected becomes true from false), 
    // auto-expand the details to reveal scholarships if they are available.
    // This now correctly triggers only on the action of adding, not on re-renders.
    if (isSelected && !prevIsSelectedRef.current && program.scholarships && program.scholarships.length > 0) {
      setIsExpanded(true);
    }
    // Update the ref after the effect runs to track the state for the next render.
    prevIsSelectedRef.current = isSelected;
  }, [isSelected, program.scholarships]);
  
  const tuitionValue = currentSelectedProgram?.editedCost?.tuition ?? program.cost.tuition;
  const livingExpensesValue = currentSelectedProgram?.editedCost?.livingExpenses ?? program.cost.livingExpenses;


  return (
    <li className={`bg-white dark:bg-gray-700/50 rounded-lg overflow-hidden transition-all duration-300 shadow-sm ${ isSelected ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200 dark:ring-gray-600/50' } ${ isComparing ? 'ring-2 ring-teal-500' : '' }`}>
      <div className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{program.name}</h4>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-white bg-blue-500 px-2 py-0.5 rounded-full">{program.type}</span>
                {program.tags?.map((tag, index) => (
                    <span key={index} className="text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 px-2 py-0.5 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={() => onToggleCompare(program)}
              disabled={compareDisabled}
              className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                isComparing 
                ? 'bg-teal-500 border-transparent text-white hover:bg-teal-600 focus:ring-teal-400' 
                : 'bg-gray-200 dark:bg-gray-600 border-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 focus:ring-gray-400'
              } ${compareDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={compareDisabled ? "You can compare up to 3 programs at a time." : isComparing ? `Remove ${program.name} from comparison` : `Add ${program.name} to comparison`}
            >
              <DocumentDuplicateIcon className="w-5 h-5 mr-2" />
              {isComparing ? 'Comparing' : 'Compare'}
            </button>
            {isSelected ? (
              <button
                onClick={() => onToggleProgram(programWithInstitution)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
                aria-label={`Remove ${program.name} from application`}
              >
                <CheckIcon className="w-5 h-5 mr-2" />
                <span>
                  Added
                  {selectedScholarshipCount > 0 && 
                    ` (${selectedScholarshipCount}S)`}
                </span>
              </button>
            ) : (
              <button
                onClick={() => onToggleProgram(programWithInstitution)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                aria-label={`Add ${program.name} to application`}
              >
                <PlusIcon className="w-5 h-5 mr-2"/>
                Add
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 mt-4 text-sm border-t border-gray-200 dark:border-gray-600 pt-4">
          <div className="flex items-start">
            <ClockIcon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-500 dark:text-gray-400">Duration</p>
              <p className="font-semibold text-gray-700 dark:text-gray-200">{program.duration}</p>
            </div>
          </div>
          <div className="flex items-start">
            <CalendarIcon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-500 dark:text-gray-400">Deadline</p>
              <p className="font-semibold text-gray-700 dark:text-gray-200">{program.applicationDeadline}</p>
            </div>
          </div>
          <div className="flex items-start">
            <CashIcon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <label htmlFor={`tuition-${program.name}`} className="text-gray-500 dark:text-gray-400">Tuition</label>
              <input
                id={`tuition-${program.name}`}
                type="text"
                value={tuitionValue}
                disabled={!isSelected}
                onChange={(e) => onCostChange({ name: program.name, institutionName }, 'tuition', e.target.value)}
                className="w-full bg-transparent font-semibold text-gray-700 dark:text-gray-200 rounded-md p-1 -ml-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-100 dark:focus:bg-gray-600 disabled:bg-transparent disabled:cursor-default"
                aria-label={`Tuition cost for ${program.name}`}
              />
            </div>
          </div>
          <div className="flex items-start">
            <HomeModernIcon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <label htmlFor={`living-${program.name}`} className="text-gray-500 dark:text-gray-400">Est. Living</label>
               <input
                id={`living-${program.name}`}
                type="text"
                value={livingExpensesValue}
                disabled={!isSelected}
                onChange={(e) => onCostChange({ name: program.name, institutionName }, 'livingExpenses', e.target.value)}
                className="w-full bg-transparent font-semibold text-gray-700 dark:text-gray-200 rounded-md p-1 -ml-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-100 dark:focus:bg-gray-600 disabled:bg-transparent disabled:cursor-default"
                aria-label={`Living expense for ${program.name}`}
              />
            </div>
          </div>
        </div>
      </div>
      
      {(program.prerequisites || (program.scholarships && program.scholarships.length > 0)) && (
        <>
            <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                <div className="px-4 pb-4 pt-2">
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-4">
                    <div>
                        <h5 className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1"><ClipboardListIcon className="w-4 h-4 mr-2" /> Prerequisites</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400 pl-6">{program.prerequisites}</p>
                    </div>

                    {program.scholarships && program.scholarships.length > 0 && (
                        <div>
                        <h5 className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                            <SparklesIcon className="w-4 h-4 mr-2 text-yellow-500" /> Available Scholarships
                        </h5>
                        <div className="pl-6 space-y-3">
                            {program.scholarships.map((s, i) => {
                            const isScholarshipSelected = selectedScholarshipsForProgram.some(sel => sel.name === s.name);
                            const uniqueId = `scholarship-${program.name.replace(/\s+/g, '-')}-${i}`;
                            return (
                                <div key={i} className={`transition-all duration-300 ${!isSelected ? 'opacity-60' : ''}`}>
                                <label
                                    className={`block p-3 rounded-lg border-2 transition-all ${
                                    isScholarshipSelected
                                        ? 'bg-blue-500/10 border-blue-500 shadow-md'
                                        : 'bg-gray-100 dark:bg-gray-700/50 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                                    } ${isSelected ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                    title={!isSelected ? "Add the program to your application to select scholarships" : `Select scholarship: ${s.name}`}
                                >
                                    <div className="flex items-start gap-4">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={isScholarshipSelected}
                                        disabled={!isSelected}
                                        onChange={() => onToggleScholarship({ name: program.name, institutionName }, s)}
                                        aria-labelledby={`${uniqueId}-name`}
                                    />
                                    <div className={`w-6 h-6 rounded-md border-2 flex-shrink-0 mt-1 flex items-center justify-center transition-all duration-200 ${
                                        isScholarshipSelected
                                        ? 'bg-blue-600 border-blue-600'
                                        : `bg-transparent ${!isSelected ? 'border-gray-400 dark:border-gray-500' : 'border-gray-400 dark:border-gray-500'}`
                                    }`}>
                                        {isScholarshipSelected && <CheckIcon className="w-4 h-4 text-white" />}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start gap-2">
                                        <p id={`${uniqueId}-name`} className="font-bold text-gray-800 dark:text-gray-100">{s.name}</p>
                                        <span className="flex-shrink-0 text-xs font-semibold text-green-800 dark:text-green-300 bg-green-200 dark:bg-green-500/20 px-2 py-1 rounded-full">{s.amount}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{s.description}</p>
                                        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600/50 space-y-2">
                                        <div className="flex items-start">
                                            <UserGroupIcon className="w-5 h-5 mr-2 mt-0.5 text-blue-400 flex-shrink-0"/>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold text-gray-600 dark:text-gray-300">Eligibility:</span> {s.eligibility}
                                            </p>
                                        </div>
                                        <div className="flex items-start">
                                            <CalendarIcon className="w-5 h-5 mr-2 mt-0.5 text-blue-400 flex-shrink-0"/>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold text-gray-600 dark:text-gray-300">Deadline:</span> {s.applicationDeadline || 'N/A'}
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </label>
                                {!isSelected && i === 0 && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 pl-4">
                                    Add the program to your application first to select scholarships.
                                    </p>
                                )}
                                </div>
                            );
                            })}
                        </div>
                        </div>
                    )}
                    </div>
                </div>
                </div>
            </div>
            
            <button onClick={() => setIsExpanded(!isExpanded)} className="w-full text-center py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900/50 text-blue-600 dark:text-blue-400 text-sm font-medium transition-colors flex items-center justify-center">
                {isExpanded ? 'Show Less' : 'Show More Details'}
                <ChevronDownIcon className={`w-4 h-4 ml-1.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
        </>
      )}
    </li>
  );
};


// --- Skeleton Components for Modal Loading State ---

const DetailsSkeleton: React.FC = () => (
  <div className="space-y-4 text-sm animate-pulse">
    {[...Array(3)].map((_, i) => (
      <div key={i}>
        <div className="h-5 w-1/3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="space-y-1 pl-7">
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

const ProgramListSkeleton: React.FC = () => (
  <ul className="space-y-4 animate-pulse">
    {[...Array(3)].map((_, i) => (
      <li key={i} className="bg-white dark:bg-gray-700/50 rounded-lg p-4 shadow-sm ring-1 ring-gray-200 dark:ring-gray-600/50">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="h-9 w-48 bg-gray-300 dark:bg-gray-600 rounded-md flex-shrink-0"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 border-t border-gray-200 dark:border-gray-600 pt-4">
          {[...Array(4)].map((_, j) => (
            <div key={j}>
              <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded mb-1.5"></div>
              <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>
      </li>
    ))}
  </ul>
);


const InstitutionModal: React.FC<InstitutionModalProps> = ({ institution, onClose, selectedPrograms, onToggleProgram, onToggleScholarship, onCostChange }) => {
  const [filter, setFilter] = useState<ProgramTypeFilter>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonList, setComparisonList] = useState<Program[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const filterOptions: ProgramTypeFilter[] = ['All', 'Masters', 'Bachelors', 'Course'];

  const filteredPrograms = institution.programs.filter(program => 
    filter === 'All' || program.type === filter
  );

  const handleToggleCompare = (program: Program) => {
    setComparisonList(prev => {
        const isInList = prev.some(p => p.name === program.name);
        if (isInList) {
            return prev.filter(p => p.name !== program.name);
        }
        if (prev.length < 3) {
            return [...prev, program];
        }
        // Optionally, add a user notification here that the limit is 3
        return prev;
    });
  };

  const handleClearCompare = () => {
      setComparisonList([]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750); // Simulate fetching details
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isComparisonModalOpen) {
          setIsComparisonModalOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    const modalNode = modalRef.current;
    if (!modalNode) return;

    const focusableElements = Array.from(modalNode.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.hasAttribute('disabled'));

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) { // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };
    
    firstElement.focus();
    window.addEventListener('keydown', handleTabKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('keydown', handleTabKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, isComparisonModalOpen]);

  const handleGoToApplication = () => {
    onClose();
    document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="institution-modal-title"
      >
        <div 
          ref={modalRef}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transform transition-transform duration-300 scale-95"
          style={{ transform: 'scale(1)' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="relative">
            <img src={institution.imageUrl} alt={institution.name} className="w-full h-48 object-cover"/>
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition"
              aria-label="Close modal"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 md:p-8 flex-grow overflow-y-auto bg-gray-50 dark:bg-gray-800 min-h-[300px]">
            <h2 id="institution-modal-title" className="text-3xl font-bold text-gray-800 dark:text-gray-100">{institution.name}</h2>
            <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1 mb-4">
              <LocationMarkerIcon className="w-5 h-5 mr-2" />
              <span>{institution.location}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{institution.description}</p>
            
            {institution.details && (
              <div className="mb-6 border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">About the Institution</h3>
                
                {isLoading ? <DetailsSkeleton /> : (
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
                    <div className="md:col-span-2">
                      <h4 className="flex items-center font-semibold text-gray-600 dark:text-gray-300 mb-1">
                        <BookOpenIcon className="w-5 h-5 mr-2 text-blue-400" />
                        History
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 pl-7">{institution.details.history}</p>
                    </div>

                    <div>
                      <h4 className="flex items-center font-semibold text-gray-600 dark:text-gray-300 mb-1">
                        <UserGroupIcon className="w-5 h-5 mr-2 text-blue-400" />
                        Notable Alumni
                      </h4>
                      <ul className="list-disc list-inside text-gray-500 dark:text-gray-400 pl-7 space-y-1">
                        {institution.details.notableAlumni.map((alumnus, index) => <li key={index}>{alumnus}</li>)}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="flex items-center font-semibold text-gray-600 dark:text-gray-300 mb-1">
                        <HomeModernIcon className="w-5 h-5 mr-2 text-blue-400" />
                        Campus Facilities
                      </h4>
                      <ul className="list-disc list-inside text-gray-500 dark:text-gray-400 pl-7 space-y-1">
                        {institution.details.campusFacilities.map((facility, index) => <li key={index}>{facility}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-6" aria-label="Filters">
                {filterOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => setFilter(option)}
                    disabled={isLoading}
                    className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors
                      ${filter === option
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {option}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Available Programs</h3>
              {isLoading ? <ProgramListSkeleton /> : (
                filteredPrograms.length > 0 ? (
                  <ul className="space-y-4">
                    {filteredPrograms.map((program, index) => {
                      const currentSelectedProgram = selectedPrograms.find(p => p.name === program.name && p.institutionName === institution.name);
                      const isSelected = !!currentSelectedProgram;
                      const isComparing = comparisonList.some(p => p.name === program.name);
                      const compareDisabled = !isComparing && comparisonList.length >= 3;
                      return (
                        <ProgramListItem
                            key={index}
                            program={program}
                            isSelected={isSelected}
                            selectedScholarshipsForProgram={currentSelectedProgram?.selectedScholarships || []}
                            onToggleProgram={onToggleProgram}
                            onToggleScholarship={onToggleScholarship}
                            institutionName={institution.name}
                            currentSelectedProgram={currentSelectedProgram}
                            onCostChange={onCostChange}
                            onToggleCompare={handleToggleCompare}
                            isComparing={isComparing}
                            compareDisabled={compareDisabled}
                          />
                      );
                    })}
                  </ul>
                ) : (
                  <div className="text-center py-8 px-4 bg-gray-100 dark:bg-gray-700/50 rounded-md">
                    <p className="text-gray-500 dark:text-gray-400">No programs found for this category.</p>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 space-y-3">
             {comparisonList.length > 0 && (
                <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg flex items-center justify-between gap-4 animate-fade-in">
                    <div className="flex-grow">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Comparison List ({comparisonList.length}/3)</h4>
                        <div className="flex flex-wrap gap-2">
                            {comparisonList.map(p => (
                                <span key={p.name} className="flex items-center text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 px-2 py-1 rounded-full">
                                    {p.name}
                                    <button onClick={() => handleToggleCompare(p)} className="ml-1.5 -mr-0.5 rounded-full hover:bg-teal-200 dark:hover:bg-teal-800" aria-label={`Remove ${p.name}`}>
                                        <CloseIcon className="w-3 h-3"/>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <button onClick={handleClearCompare} className="py-2 px-3 bg-gray-500 text-white text-sm font-semibold rounded-md hover:bg-gray-600 transition-colors">Clear</button>
                        <button 
                          onClick={() => setIsComparisonModalOpen(true)} 
                          disabled={comparisonList.length < 2}
                          className="py-2 px-4 bg-teal-600 text-white text-sm font-semibold rounded-md hover:bg-teal-700 transition-colors disabled:bg-teal-400 dark:disabled:bg-teal-800 disabled:cursor-not-allowed"
                          title={comparisonList.length < 2 ? "Select at least 2 programs to compare" : ""}
                        >
                          Compare ({comparisonList.length})
                        </button>
                    </div>
                </div>
            )}
            <div className="flex justify-end items-center space-x-4">
              <button onClick={onClose} className="py-2 px-6 bg-gray-500 text-white text-lg font-semibold rounded-md hover:bg-gray-600 transition-colors duration-300">
                Close
              </button>
              {selectedPrograms.some(p => p.institutionName === institution.name) && (
                <button 
                  onClick={handleGoToApplication} 
                  className="py-2 px-6 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Go to Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isComparisonModalOpen && (
        <ComparisonModal
          programs={comparisonList}
          institutionName={institution.name}
          selectedPrograms={selectedPrograms}
          onClose={() => setIsComparisonModalOpen(false)}
          onClear={handleClearCompare}
          onToggleProgram={onToggleProgram}
        />
      )}
    </>
  );
};

export default InstitutionModal;