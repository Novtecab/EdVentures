import React, { useEffect, useRef, useMemo } from 'react';
import {
  SelectedProgram,
  VisaType,
  AccommodationPreference,
  DocumentUpload,
  SupportService,
} from './types';
import {
  CloseIcon,
  UserIcon,
  GlobeAltIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  SparklesIcon,
  AcademicCapIcon,
  CheckCircleIcon,
} from './IconComponents';

interface PreviewModalProps {
  onClose: () => void;
  fullName: string;
  email: string;
  selectedPrograms: SelectedProgram[];
  visaType: VisaType;
  accommodationPreference: AccommodationPreference;
  documents: DocumentUpload[];
  selectedServices: SupportService[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactMessage: string;
}

const PreviewSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mb-6">
        <h3 className="flex items-center text-xl font-semibold text-gray-100 border-b border-gray-600 pb-2 mb-3">
            {icon}
            {title}
        </h3>
        <div className="text-gray-300 space-y-2 text-base">
            {children}
        </div>
    </div>
);

const DataPair: React.FC<{ label: string; value: string | React.ReactNode }> = ({ label, value }) => (
    <div>
        <span className="font-semibold text-gray-400">{label}: </span>
        <span>{value || <i className="text-gray-500">Not provided</i>}</span>
    </div>
);

const PreviewModal: React.FC<PreviewModalProps> = ({
  onClose,
  fullName,
  email,
  selectedPrograms,
  visaType,
  accommodationPreference,
  documents,
  selectedServices,
  contactName,
  contactEmail,
  contactPhone,
  contactMessage,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const programsByInstitution = useMemo(() =>
    selectedPrograms.reduce((acc, program) => {
        if (!acc[program.institutionName]) {
            acc[program.institutionName] = [];
        }
        acc[program.institutionName].push(program);
        return acc;
    }, {} as Record<string, SelectedProgram[]>),
    [selectedPrograms]
  );

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
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
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4 transition-opacity duration-300"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          <h2 id="preview-modal-title" className="text-2xl font-bold text-white">Application Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white rounded-full p-2 hover:bg-gray-700 transition"
            aria-label="Close modal"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="p-6 overflow-y-auto">
            <PreviewSection title="Selected Programs" icon={<AcademicCapIcon className="w-6 h-6 mr-3 text-blue-400" />}>
                {selectedPrograms.length > 0 ? Object.entries(programsByInstitution).map(([institutionName, programs]) => (
                    <div key={institutionName} className="p-3 bg-gray-700/50 rounded-md mb-3">
                        <h4 className="font-bold text-lg text-white">{institutionName}</h4>
                        <DataPair label="University Application Fee" value={`PKR ${(programs[0].universityApplicationFee || 0).toFixed(2)}`} />
                        <div className="mt-2 pt-2 border-t border-gray-600 space-y-2">
                            {programs.map(p => (
                                <div key={p.name}>
                                    <p className="font-semibold">{p.name}</p>
                                    {p.selectedScholarships && p.selectedScholarships.length > 0 && (
                                        <div className="pl-4">
                                            <h5 className="text-xs font-semibold text-gray-300">Scholarships:</h5>
                                            <ul className="list-disc list-inside text-sm text-gray-400">
                                                {p.selectedScholarships.map(s => 
                                                    <li key={s.name}>
                                                        {s.name} 
                                                        {(s.applicationFee ?? 0) > 0 ? ` - Fee: PKR ${s.applicationFee!.toFixed(2)}` : ''}
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )) : <p className="text-gray-500 italic">No programs selected.</p>}
            </PreviewSection>
          
            <PreviewSection title="Applicant & Contact Information" icon={<UserIcon className="w-6 h-6 mr-3 text-blue-400" />}>
                <div className="p-3 bg-gray-700/50 rounded-md mb-2">
                    <h4 className="font-bold mb-1">Applicant</h4>
                    <DataPair label="Full Name" value={fullName} />
                    <DataPair label="Email Address" value={email} />
                </div>
                 {(contactName || contactEmail || contactPhone || contactMessage) && (
                    <div className="p-3 bg-gray-700/50 rounded-md">
                        <h4 className="font-bold mb-1">Guardian / Emergency Contact</h4>
                        <DataPair label="Name" value={contactName} />
                        <DataPair label="Email" value={contactEmail} />
                        <DataPair label="Phone" value={contactPhone} />
                        {contactMessage && (
                            <div>
                                <span className="font-semibold text-gray-400">Notes: </span>
                                <p className="whitespace-pre-wrap bg-gray-700 p-2 rounded-md mt-1 text-sm">{contactMessage}</p>
                            </div>
                        )}
                    </div>
                 )}
            </PreviewSection>

            <PreviewSection title="Visa Details" icon={<GlobeAltIcon className="w-6 h-6 mr-3 text-blue-400" />}>
                <DataPair label="Visa Assistance" value={`${visaType.charAt(0).toUpperCase() + visaType.slice(1)} Visa`} />
            </PreviewSection>
            
            <PreviewSection title="Supporting Documents" icon={<DocumentDuplicateIcon className="w-6 h-6 mr-3 text-blue-400" />}>
                {documents.length > 0 ? documents.map(d => {
                    const docType = d.type === 'Other' 
                        ? `Other (${d.otherType || 'Not specified'})` 
                        : d.type;
                    return (
                        <div key={d.id} className="flex items-center justify-between p-2 bg-gray-700/50 rounded-md mb-2">
                            <p>{docType || <i className="text-gray-500">Unspecified type</i>}</p>
                            <div className="flex items-center">
                                <span className="text-sm mr-2 truncate max-w-[150px] sm:max-w-xs">{d.uploadState.files?.[0]?.name || "No file"}</span>
                                {d.uploadState.status === 'success' && <CheckCircleIcon className="w-5 h-5 text-green-400" />}
                            </div>
                        </div>
                    );
                }) : <p className="text-gray-500 italic">No documents uploaded.</p>}
            </PreviewSection>

            <PreviewSection title="Accommodation" icon={<HomeIcon className="w-6 h-6 mr-3 text-blue-400" />}>
                <DataPair label="Preference" value={(accommodationPreference.charAt(0).toUpperCase() + accommodationPreference.slice(1)).replace('-', ' ')} />
            </PreviewSection>

            <PreviewSection title="Support Services" icon={<SparklesIcon className="w-6 h-6 mr-3 text-blue-400" />}>
                 {selectedServices.length > 0 ? (
                    <ul className="space-y-1">
                        {selectedServices.map(service => (
                            <li key={service.id} className="flex justify-between items-center">
                                <span>{service.name}</span>
                                <span className="font-mono text-green-300">PKR {service.cost.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                 ) : <p className="text-gray-500 italic">No support services requested.</p>}
            </PreviewSection>

        </main>
        <footer className="p-4 bg-gray-900/50 border-t border-gray-700 text-right flex-shrink-0">
           <button onClick={onClose} className="py-2 px-6 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 transition-colors duration-300">
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PreviewModal;