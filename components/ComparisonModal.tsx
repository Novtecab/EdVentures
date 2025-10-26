import React, { useEffect, useRef } from 'react';
import { Program, SelectedProgram } from './types';
import { 
    CloseIcon, 
    ClockIcon, 
    CalendarIcon, 
    ClipboardListIcon, 
    CashIcon, 
    HomeModernIcon,
    AcademicCapIcon,
    PlusIcon,
    CheckIcon,
    TrashIcon,
    SparklesIcon
} from './IconComponents';

interface ComparisonModalProps {
  programs: Program[];
  institutionName: string;
  selectedPrograms: SelectedProgram[];
  onClose: () => void;
  onClear: () => void;
  onToggleProgram: (program: SelectedProgram) => void;
}

const features = [
  { key: 'type', label: 'Program Type', icon: AcademicCapIcon },
  { key: 'duration', label: 'Duration', icon: ClockIcon },
  { key: 'cost.tuition', label: 'Tuition Cost', icon: CashIcon },
  { key: 'cost.livingExpenses', label: 'Est. Living Expenses', icon: HomeModernIcon },
  { key: 'prerequisites', label: 'Prerequisites', icon: ClipboardListIcon },
  { key: 'applicationDeadline', label: 'Application Deadline', icon: CalendarIcon },
];

const getNestedValue = (obj: any, path: string) => path.split('.').reduce((o, key) => (o && o[key] !== 'undefined' ? o[key] : undefined), obj);

const ComparisonModal: React.FC<ComparisonModalProps> = ({ 
  programs,
  institutionName,
  selectedPrograms,
  onClose,
  onClear,
  onToggleProgram
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const firstFocusableElement = modalRef.current?.querySelector('button');
    firstFocusableElement?.focus();

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getGridClass = (count: number) => {
    switch(count) {
        case 1: return 'grid-cols-2';
        case 2: return 'grid-cols-3';
        case 3: return 'grid-cols-4';
        default: return 'grid-cols-1';
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60] p-4 transition-opacity duration-300"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          <div>
            <h2 id="comparison-modal-title" className="text-2xl font-bold text-white">Program Comparison</h2>
            <p className="text-sm text-gray-400">{institutionName}</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onClear} className="flex items-center gap-2 py-2 px-3 bg-gray-600 text-white text-sm font-semibold rounded-md hover:bg-gray-700 transition-colors">
              <TrashIcon className="w-4 h-4" /> Clear All
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white rounded-full p-2 hover:bg-gray-700 transition" aria-label="Close modal">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
        </header>

        <main className="p-6 overflow-auto">
          <div className={`grid ${getGridClass(programs.length)} gap-px bg-gray-700 border border-gray-700 rounded-lg overflow-hidden`}>
            {/* Header Row */}
            <div className="bg-gray-900 p-4 font-bold text-white sticky top-0">Feature</div>
            {programs.map(p => (
              <div key={p.name} className="bg-gray-900 p-4 font-bold text-white text-center sticky top-0">
                {p.name}
              </div>
            ))}

            {/* Feature Rows */}
            {features.map(feature => (
              <React.Fragment key={feature.key}>
                <div className="bg-gray-800 p-4 font-semibold text-gray-300 flex items-center">
                  {React.createElement(feature.icon, { className: 'w-5 h-5 mr-3 text-blue-400' })}
                  {feature.label}
                </div>
                {programs.map(p => (
                  <div key={p.name} className="bg-gray-800 p-4 text-gray-200 text-center">
                    {String(getNestedValue(p, feature.key) ?? 'N/A')}
                  </div>
                ))}
              </React.Fragment>
            ))}

            {/* Tags Row */}
            <React.Fragment>
                <div className="bg-gray-800 p-4 font-semibold text-gray-300 flex items-center">Tags</div>
                {programs.map(p => (
                  <div key={p.name} className="bg-gray-800 p-4 flex flex-wrap gap-2 justify-center items-center">
                    {p.tags?.map(tag => (
                       <span key={tag} className="text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                ))}
            </React.Fragment>
            
            {/* Scholarships Row */}
            <React.Fragment>
                <div className="bg-gray-800 p-4 font-semibold text-gray-300 flex items-center">
                    <SparklesIcon className="w-5 h-5 mr-3 text-yellow-400" />
                    Scholarships
                </div>
                {programs.map(p => (
                    <div key={p.name} className="bg-gray-800 p-4 text-gray-200 text-left align-top">
                        {p.scholarships && p.scholarships.length > 0 ? (
                            <ul className="space-y-3 text-sm">
                                {p.scholarships.map((s, index) => (
                                    <li key={index} className="p-2 bg-gray-700/50 rounded-md">
                                        <p className="font-bold text-white">{s.name} <span className="text-xs font-semibold text-green-300 bg-green-500/20 px-2 py-0.5 rounded-full ml-2 whitespace-nowrap">{s.amount}</span></p>
                                        <p className="text-gray-400 mt-1"><span className="font-semibold">Eligibility:</span> {s.eligibility}</p>
                                        {s.applicationDeadline && <p className="text-gray-400"><span className="font-semibold">Deadline:</span> {s.applicationDeadline}</p>}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic text-center">None available</p>
                        )}
                    </div>
                ))}
            </React.Fragment>

             {/* Action Row */}
            <React.Fragment>
                <div className="bg-gray-800 p-4"></div>
                {programs.map(p => {
                    const isSelected = selectedPrograms.some(sp => sp.name === p.name && sp.institutionName === institutionName);
                    const programWithInstitution = { ...p, institutionName };
                    return (
                        <div key={p.name} className="bg-gray-800 p-4 text-center">
                            {isSelected ? (
                              <button
                                onClick={() => onToggleProgram(programWithInstitution)}
                                className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
                              >
                                <CheckIcon className="w-5 h-5 mr-2" />
                                Added
                              </button>
                            ) : (
                              <button
                                onClick={() => onToggleProgram(programWithInstitution)}
                                className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                              >
                                <PlusIcon className="w-5 h-5 mr-2"/>
                                Add to Application
                              </button>
                            )}
                        </div>
                    );
                })}
            </React.Fragment>
          </div>
        </main>
      </div>
       <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
    </div>
  );
};

export default ComparisonModal;