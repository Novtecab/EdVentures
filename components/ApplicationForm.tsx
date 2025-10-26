import React, { useState, useEffect, useMemo } from 'react';
import { SelectedProgram, Institution, VisaType, AccommodationPreference, DocumentUpload, FileUploadState, SupportService } from './types';
import { 
    CloseIcon, 
    DocumentTextIcon, 
    UploadIcon, 
    AcademicCapIcon, 
    UserIcon, 
    GlobeAltIcon, 
    DocumentDuplicateIcon, 
    HomeIcon, 
    SparklesIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    PlusIcon,
    TrashIcon,
    EyeIcon,
    CheckIcon,
    CashIcon
} from './IconComponents';
import AccordionItem from './AccordionItem';
import PreviewModal from './PreviewModal';
import ConfirmationModal from './ConfirmationModal';

interface ApplicationFormProps {
  selectedPrograms: SelectedProgram[];
  onToggleProgram: (program: SelectedProgram) => void;
  onFeeChange: (programIdentifier: { name: string; institutionName: string }, feeType: 'university' | 'scholarship', feeValue: number, scholarshipName?: string) => void;
  institutionsData: Institution[];
  applicationId: string | null;
  onApplicationSubmit: (formData: any) => void;
  onStartNew: () => void;
}

const documentTypes = ['Passport', 'Visa', 'CV', 'Transcript', 'Personal Statement', 'Reference Letter(s)', 'Other'];

const availableServices: SupportService[] = [
  { id: 'visa', name: 'Visa Service', description: 'Comprehensive guidance and support through your entire visa application process.', cost: 50000 },
  { id: 'testPrep', name: 'Test Preparation', description: 'Assistance for tests like IELTS, TOEFL, etc.', cost: 35000 },
  { id: 'airportPickup', name: 'Airport Pickup', description: 'Reliable pickup service from the airport to your accommodation.', cost: 10000 },
  { id: 'preDeparture', name: 'Pre-departure Briefing', description: 'A complete guide on what to expect and how to prepare for your new journey.', cost: 7500 },
];


// --- Helper Components for ApplicationForm ---
interface SelectedProgramsListProps {
  selectedPrograms: SelectedProgram[];
  onToggleProgram: (p: SelectedProgram) => void;
  onFeeChange: (programIdentifier: { name: string; institutionName: string }, feeType: 'university' | 'scholarship', feeValue: number, scholarshipName?: string) => void;
}


const SelectedProgramsList: React.FC<SelectedProgramsListProps> = ({ selectedPrograms, onToggleProgram, onFeeChange }) => {
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

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-200">Your Selected Programs</h3>
      {selectedPrograms.length > 0 ? (
        <div className="space-y-6 p-3 bg-gray-900/50 rounded-md">
          {Object.entries(programsByInstitution).map(([institutionName, programs]) => (
            <div key={institutionName} className="bg-gray-800 p-4 rounded-lg border border-gray-700 animate-fade-in">
              <h4 className="text-lg font-bold text-white mb-3">{institutionName}</h4>
              
              <div className="mb-4">
                <label htmlFor={`uni-fee-${institutionName}`} className="block text-sm font-medium text-gray-400 mb-1">University Application Fee (PKR)</label>
                <input
                  id={`uni-fee-${institutionName}`}
                  type="number"
                  min="0"
                  step="1"
                  value={programs[0].universityApplicationFee ?? ''}
                  onChange={(e) => onFeeChange({ name: '', institutionName }, 'university', parseFloat(e.target.value) || 0)}
                  className="w-full max-w-xs px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-3">
                {programs.map(program => (
                  <div key={program.name} className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-200">{program.name}</p>
                        <p className="text-xs text-gray-400">{program.type}</p>
                      </div>
                      <button 
                        onClick={() => onToggleProgram(program)} 
                        className="ml-2 rounded-full hover:bg-gray-700 p-1 transition-colors duration-200 flex-shrink-0" 
                        aria-label={`Remove ${program.name}`}
                      >
                        <TrashIcon className="w-5 h-5 text-red-400 hover:text-red-300" />
                      </button>
                    </div>
                    
                    {program.selectedScholarships && program.selectedScholarships.length > 0 && (
                      <div className="mt-3 pl-2">
                        <h5 className="text-sm font-semibold text-gray-300 mb-2">Scholarship Fees:</h5>
                        <div className="space-y-2">
                          {program.selectedScholarships.map(scholarship => (
                            <div key={scholarship.name} className="flex items-center justify-between gap-4">
                              <label htmlFor={`scholarship-fee-${scholarship.name.replace(/\s+/g, '-')}`} className="text-sm text-gray-400 flex items-center">
                                <SparklesIcon className="w-4 h-4 mr-2 text-teal-400" />
                                {scholarship.name}
                              </label>
                              <input
                                id={`scholarship-fee-${scholarship.name.replace(/\s+/g, '-')}`}
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Fee (PKR)"
                                value={scholarship.applicationFee ?? ''}
                                onChange={(e) => onFeeChange({ name: program.name, institutionName }, 'scholarship', parseFloat(e.target.value) || 0, scholarship.name)}
                                className="w-28 px-2 py-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3 bg-gray-900/50 rounded-md">
          <p className="text-gray-400 italic">No programs selected. Browse our institutions to add to your application.</p>
        </div>
      )}
    </div>
  );
};

const ApplicationProgress: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="mb-6">
    <div className="flex justify-between items-end mb-2">
      <h3 className="text-xl font-semibold text-gray-200" id="progress-label">Application Progress</h3>
      <span className="text-lg font-bold text-blue-400">{progress}%</span>
    </div>
    <div
      className="w-full bg-gray-700 rounded-full h-2.5"
      role="progressbar"
      aria-labelledby="progress-label"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${progress} percent complete`}
    >
      <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out" style={{width: `${progress}%`}}></div>
    </div>
  </div>
);


const SubmissionSuccess: React.FC<{ applicationId: string | null; onStartNew: () => void }> = ({ applicationId, onStartNew }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (applicationId) {
      navigator.clipboard.writeText(applicationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900/50 rounded-lg p-8 text-center">
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }`}</style>
      <div className="animate-fade-in">
        <CheckCircleIcon className="w-20 h-20 text-green-400 mb-4 mx-auto" />
        <h3 className="text-3xl font-bold text-white mb-2">Application Submitted!</h3>
        <p className="text-gray-300 max-w-sm mb-6">
            Thank you! Please save your Application ID to track your progress. An advisor will contact you shortly.
        </p>
         <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-400 mb-2">Your Application ID</label>
          <div className="flex items-center justify-center gap-2 p-3 bg-gray-800 border border-gray-700 rounded-lg">
            <span className="text-lg font-mono text-yellow-300">{applicationId}</span>
            <button onClick={handleCopy} className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors" title="Copy to clipboard">
              {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <DocumentDuplicateIcon className="w-5 h-5 text-gray-300" />}
            </button>
          </div>
        </div>
        <button onClick={onStartNew} className="py-3 px-6 bg-blue-600 text-white text-lg font-bold rounded-md hover:bg-blue-700 transition-colors duration-300">
          Submit Another Application
        </button>
      </div>
    </div>
  );
};

interface CostSummaryProps {
  selectedPrograms: SelectedProgram[];
  selectedServices: string[];
}

const CostSummary: React.FC<CostSummaryProps> = ({ selectedPrograms, selectedServices }) => {
  const { universityFees, scholarshipFees, serviceFees, total } = useMemo(() => {
    const universityFeeMap = new Map<string, number>();
    selectedPrograms.forEach(p => {
      universityFeeMap.set(p.institutionName, p.universityApplicationFee || 0);
    });
    const universityFees = Array.from(universityFeeMap.values()).reduce((acc, fee) => acc + fee, 0);

    const scholarshipFees = selectedPrograms.reduce((acc, prog) => {
      return acc + (prog.selectedScholarships?.reduce((sAcc, schol) => sAcc + (schol.applicationFee || 0), 0) || 0);
    }, 0);

    const serviceFees = selectedServices.reduce((acc, serviceId) => {
      const service = availableServices.find(s => s.id === serviceId);
      return acc + (service?.cost || 0);
    }, 0);

    return {
      universityFees,
      scholarshipFees,
      serviceFees,
      total: universityFees + scholarshipFees + serviceFees,
    };
  }, [selectedPrograms, selectedServices]);

  if (total === 0) return null;

  return (
    <div className="space-y-4 my-8">
      <h3 className="text-xl font-semibold text-gray-200 flex items-center">
        <CashIcon className="w-6 h-6 mr-2" />
        Cost Summary
      </h3>
      <div className="p-4 bg-gray-900/50 rounded-md space-y-3 text-gray-300">
        <div className="flex justify-between items-center">
          <span>University Application Fees</span>
          <span className="font-mono">PKR {universityFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Scholarship Application Fees</span>
          <span className="font-mono">PKR {scholarshipFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Support Services</span>
          <span className="font-mono">PKR {serviceFees.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-700 my-2"></div>
        <div className="flex justify-between items-center text-white font-bold text-lg">
          <span>Total Estimated Cost</span>
          <span className="font-mono">PKR {total.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-500 text-center pt-2">Note: All fees are estimates. An advisor will provide a final quote.</p>
      </div>
    </div>
  );
};


// --- Main ApplicationForm Component ---

const ApplicationForm: React.FC<ApplicationFormProps> = ({ selectedPrograms, onToggleProgram, onFeeChange, institutionsData, applicationId, onApplicationSubmit, onStartNew }) => {
  const [visaType, setVisaType] = useState<VisaType>('none');
  const [accommodationPreference, setAccommodationPreference] = useState<AccommodationPreference>('none');
  const [documents, setDocuments] = useState<DocumentUpload[]>([]);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  const isSubmitted = applicationId !== null;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = {
      applicantInfo: fullName.trim() !== '' && /^\S+@\S+\.\S+$/.test(email),
      selectedPrograms: selectedPrograms.length > 0,
      documents: documents.some(d => d.uploadState.status === 'success'),
      accommodation: accommodationPreference !== 'none',
      support: selectedServices.length > 0,
    };

    const completedCount = Object.values(sections).filter(Boolean).length;
    const totalCount = Object.keys(sections).length;

    setProgress(Math.round((completedCount / totalCount) * 100));
  }, [fullName, email, selectedPrograms, documents, accommodationPreference, selectedServices]);

  const resetFormFields = () => {
    setFullName('');
    setEmail('');
    setVisaType('none');
    setAccommodationPreference('none');
    setDocuments([]);
    setSelectedServices([]);
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactMessage('');
  };
  
  const handleStartNewApplication = () => {
    resetFormFields();
    onStartNew();
  };

  const handleAddDocument = () => {
    const newDocument: DocumentUpload = {
      id: Date.now(),
      type: '',
      otherType: '',
      uploadState: { files: null, status: 'idle', progress: 0 },
    };
    setDocuments(prev => [...prev, newDocument]);
  };

  const handleRemoveDocument = (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };
  
  const handleDocumentTypeChange = (id: number, type: string) => {
    setDocuments(prev => prev.map(doc => doc.id === id ? { ...doc, type } : doc));
  };

  const handleDocumentOtherTypeChange = (id: number, otherType: string) => {
    setDocuments(prev => prev.map(doc => (doc.id === id ? { ...doc, otherType } : doc)));
  };
  
  const simulateUpload = (id: number, filesToUpload: File[]) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === id ? { ...doc, uploadState: { files: filesToUpload, status: 'uploading', progress: 0, error: undefined } } : doc
    ));

    const progressInterval = setInterval(() => {
        setDocuments(prevDocs => {
            const targetDoc = prevDocs.find(d => d.id === id);
            if (!targetDoc || !targetDoc.uploadState.files) {
                clearInterval(progressInterval);
                return prevDocs;
            }

            const newProgress = targetDoc.uploadState.progress + 10;
            if (newProgress >= 100) {
                clearInterval(progressInterval);
                
                setTimeout(() => {
                    const isSuccess = Math.random() > 0.2;
                    setDocuments(docs => docs.map(doc =>
                        doc.id === id ? {
                            ...doc,
                            uploadState: {
                                ...doc.uploadState,
                                status: isSuccess ? 'success' : 'error',
                                progress: 100,
                                error: isSuccess ? undefined : 'Upload failed. Please try again.'
                            }
                        } : doc
                    ));
                }, 500);

                return prevDocs.map(doc => doc.id === id ? { ...doc, uploadState: { ...doc.uploadState, progress: 100 } } : doc);
            }
            return prevDocs.map(doc => doc.id === id ? { ...doc, uploadState: { ...doc.uploadState, progress: newProgress } } : doc);
        });
    }, 150);
  };

  const handleFileChange = (id: number, selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setDocuments(docs => docs.map(doc => 
        doc.id === id ? { ...doc, uploadState: { files: null, status: 'idle', progress: 0, error: undefined } } : doc
      ));
      return;
    }
    simulateUpload(id, Array.from(selectedFiles));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
        setIsConfirmModalOpen(true);
    } else {
        e.currentTarget.reportValidity();
    }
  };

  const handleConfirmSubmit = () => {
    const formData = {
        fullName,
        email,
        selectedPrograms,
        visaType,
        accommodationPreference,
        documents: documents.map(d => ({ 
            type: d.type === 'Other' ? `Other: ${d.otherType}` : d.type,
            fileName: d.uploadState.files?.[0]?.name 
        })),
        selectedServices: availableServices.filter(s => selectedServices.includes(s.id)),
        contactName,
        contactEmail,
        contactPhone,
        contactMessage
    };
    onApplicationSubmit(formData);
    setIsConfirmModalOpen(false);
    document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleToggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleVisaTypeChange = (type: VisaType) => {
    setVisaType(type);
    if (type === 'study' || type === 'tourist') {
      // Add 'visa' service if not already present
      setSelectedServices(prev => [...new Set([...prev, 'visa'])]);
    } else {
      // Remove 'visa' service if changing back to 'none'
      setSelectedServices(prev => prev.filter(id => id !== 'visa'));
    }
  };
  
  return (
    <section id="application" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="bg-gray-800 text-white rounded-lg shadow-2xl p-8 md:p-12 lg:flex lg:items-start lg:space-x-12">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold mb-4 flex items-center"><DocumentTextIcon className="w-10 h-10 mr-3" /> Your Universal Application</h2>
            <p className="text-lg text-gray-300 mb-6">
              Apply to your selected programs, upload documents, and specify your needs all in one place. An advisor will contact you to finalize your journey.
            </p>
            <SelectedProgramsList 
                selectedPrograms={selectedPrograms} 
                onToggleProgram={onToggleProgram} 
                onFeeChange={onFeeChange}
            />
            <CostSummary selectedPrograms={selectedPrograms} selectedServices={selectedServices} />
          </div>

          <div className="lg:w-1/2">
            {isSubmitted ? (
              <SubmissionSuccess applicationId={applicationId} onStartNew={handleStartNewApplication} />
            ) : (
              <>
                <ApplicationProgress progress={progress} />
                
                <form className="space-y-4" onSubmit={handleFormSubmit} noValidate>
                  <AccordionItem title="Applicant & Contact Information" icon={<UserIcon />} defaultOpen={true}>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-300 mb-2">Applicant Details</h4>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="fullName" className="sr-only">Full Name</label>
                            <input id="fullName" type="text" placeholder="Full Name" required className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" value={fullName} onChange={e => setFullName(e.target.value)} />
                          </div>
                          <div>
                            <label htmlFor="email" className="sr-only">Email Address</label>
                            <input id="email" type="email" placeholder="Email Address" required className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={e => setEmail(e.target.value)} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-700 pt-6">
                        <h4 className="font-semibold text-gray-300 mb-2">Guardian / Emergency Contact (Optional)</h4>
                         <div className="space-y-4">
                            <div>
                              <label htmlFor="contactName" className="sr-only">Contact Full Name</label>
                              <input id="contactName" type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" value={contactName} onChange={e => setContactName(e.target.value)} />
                            </div>
                            <div>
                              <label htmlFor="contactEmail" className="sr-only">Contact Email Address</label>
                              <input id="contactEmail" type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
                            </div>
                            <div>
                              <label htmlFor="contactPhone" className="sr-only">Contact Phone Number</label>
                              <input id="contactPhone" type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
                            </div>
                            <div>
                              <label htmlFor="contactMessage" className="sr-only">Your Message</label>
                              <textarea
                                  id="contactMessage"
                                  placeholder="Additional notes..."
                                  className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-y"
                                  value={contactMessage}
                                  onChange={e => setContactMessage(e.target.value)}
                              />
                            </div>
                        </div>
                      </div>

                    </div>
                  </AccordionItem>

                  <AccordionItem title="Visa Details" icon={<GlobeAltIcon />}>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-300 mb-2">Do you require visa assistance?</h4>
                        <p className="text-sm text-gray-400 mb-3">Our advisors will determine specific visa requirements based on your selected programs and citizenship. Selecting 'Study' or 'Tourist' will automatically add our Visa Service to your application.</p>
                        <fieldset>
                          <legend className="sr-only">Visa Options</legend>
                          <div className="flex space-x-4">
                            {(['none', 'study', 'tourist'] as const).map(type => (
                              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                                  <input type="radio" name="visa" checked={visaType === type} onChange={() => handleVisaTypeChange(type)} className="form-radio bg-gray-600 border-gray-500 text-blue-500 focus:ring-blue-500" />
                                  <span>{type === 'none' ? "Not needed" : `${type.charAt(0).toUpperCase() + type.slice(1)} Visa`}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </AccordionItem>
                  
                  <AccordionItem title="Supporting Documents" icon={<DocumentDuplicateIcon />}>
                    <DocumentsSection 
                        documents={documents}
                        onAddDocument={handleAddDocument}
                        onRemoveDocument={handleRemoveDocument}
                        onDocumentTypeChange={handleDocumentTypeChange}
                        onDocumentOtherTypeChange={handleDocumentOtherTypeChange}
                        onFileChange={handleFileChange}
                    />
                  </AccordionItem>
                  
                  <AccordionItem title="Accommodation Preferences" icon={<HomeIcon />}>
                     <fieldset>
                        <legend className="sr-only">Accommodation Preferences</legend>
                        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                          {(['on-campus', 'off-campus', 'none'] as const).map(type => (
                            <label key={type} className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="accommodation" checked={accommodationPreference === type} onChange={() => setAccommodationPreference(type)} className="form-radio bg-gray-600 border-gray-500 text-blue-500 focus:ring-blue-500" />
                                <span>{type === 'none' ? 'No Preference' : (type.charAt(0).toUpperCase() + type.slice(1)).replace('-', ' ')}</span>
                            </label>
                          ))}
                        </div>
                     </fieldset>
                  </AccordionItem>
                  
                  <AccordionItem title="Support Services" icon={<SparklesIcon />}>
                     <fieldset>
                        <legend className="sr-only">Additional Support Services</legend>
                        <div className="space-y-3">
                          {availableServices.map(service => {
                            const isVisaService = service.id === 'visa';
                            const isVisaRequired = visaType === 'study' || visaType === 'tourist';
                            const isVisaServiceDisabled = isVisaService && isVisaRequired;
                            const isChecked = selectedServices.includes(service.id);

                            return (
                              <label 
                                key={service.id} 
                                className={`block p-3 rounded-lg border-2 transition-all bg-gray-700/50 ${isVisaServiceDisabled ? 'opacity-70 cursor-not-allowed' : 'hover:border-gray-500 cursor-pointer'}`}
                                style={{
                                  borderColor: isChecked ? 'var(--tw-color-blue-500)' : 'transparent',
                                  boxShadow: isChecked ? '0 0 0 1px var(--tw-color-blue-500)' : 'none',
                                }}
                              >
                                <div className="flex items-start gap-4">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={isChecked}
                                    disabled={isVisaServiceDisabled}
                                    onChange={() => handleToggleService(service.id)}
                                />
                                <div className={`w-6 h-6 rounded-md border-2 flex-shrink-0 mt-1 flex items-center justify-center transition-all duration-200 ${
                                    isChecked ? 'bg-blue-600 border-blue-600' : 'bg-transparent border-gray-500'
                                }`}>
                                    {isChecked && <CheckIcon className="w-4 h-4 text-white" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start gap-2">
                                      <p className="font-bold text-gray-100">{service.name}</p>
                                      <span className="flex-shrink-0 text-xs font-semibold text-green-300 bg-green-500/20 px-2 py-1 rounded-full">PKR {service.cost}</span>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1">{service.description}</p>
                                </div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                     </fieldset>
                  </AccordionItem>

                  <div className="flex flex-col sm:flex-row gap-4 !mt-8">
                    <button type="button" onClick={() => setIsPreviewModalOpen(true)} className="w-full py-3 px-6 bg-gray-600 text-white text-lg font-bold rounded-md hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center">
                        <EyeIcon className="w-6 h-6 mr-2" />
                        Preview Application
                    </button>
                    <button type="submit" className="w-full py-3 px-6 bg-blue-600 text-white text-lg font-bold rounded-md hover:bg-blue-700 transition-colors duration-300">
                        Submit Application
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      {isConfirmModalOpen && (
        <ConfirmationModal
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleConfirmSubmit}
            title="Confirm Submission"
        >
            <p>Are you sure you want to submit the application?</p>
        </ConfirmationModal>
      )}
      {isPreviewModalOpen && (
        <PreviewModal
            onClose={() => setIsPreviewModalOpen(false)}
            fullName={fullName}
            email={email}
            selectedPrograms={selectedPrograms}
            visaType={visaType}
            accommodationPreference={accommodationPreference}
            documents={documents}
            selectedServices={availableServices.filter(s => selectedServices.includes(s.id))}
            contactName={contactName}
            contactEmail={contactEmail}
            contactPhone={contactPhone}
            contactMessage={contactMessage}
        />
      )}
    </section>
  );
};


const FileInput: React.FC<{
  uploadState: FileUploadState;
  onFileChange: (files: FileList | null) => void;
  accept: string;
  multiple?: boolean;
}> = ({ uploadState, onFileChange, accept, multiple = false }) => {
  const { files, status, progress, error } = uploadState;
  const uniqueId = React.useId();

  const isUploading = status === 'uploading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  const handleRemove = () => {
    const fileInput = document.getElementById(uniqueId) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    onFileChange(null);
  };
  
  const iconAndTextColor = isSuccess ? 'text-green-400' : isError ? 'text-red-400' : 'text-gray-400';
  
  const fileCount = files?.length || 0;
  const getDisplayText = () => {
    if (fileCount === 0) return `Select file(s)...`;
    if (fileCount === 1) return files![0].name;
    return `${fileCount} files selected`;
  };

  return (
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={uniqueId}>File Upload</label>
        <div className={`flex items-center justify-between p-3 bg-gray-700 border rounded-md transition-all duration-300 ${
          isError ? 'border-red-500/50' : isSuccess ? 'border-green-500/50' : 'border-gray-600'
        }`}>
          <div className="flex items-center min-w-0">
            <DocumentDuplicateIcon className={`w-5 h-5 mr-3 flex-shrink-0 ${iconAndTextColor}`} />
            <span className="text-white truncate pr-2 flex-grow">{getDisplayText()}</span>
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
            {isUploading ? (
              <div className="w-6 h-6 relative">
                 <svg className="w-full h-full text-gray-600" viewBox="0 0 36 36"><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path></svg>
                 <svg className="w-full h-full absolute top-0 left-0 text-blue-500 transform -rotate-90" viewBox="0 0 36 36"><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray={`${progress}, 100`}></path></svg>
              </div>
            ) : (
              <>
                {fileCount > 0 && (
                  <button type="button" onClick={handleRemove} className="text-gray-400 hover:text-white" aria-label="Remove file">
                    <CloseIcon className="w-4 h-4" />
                  </button>
                )}
                <label className="cursor-pointer text-blue-400 hover:text-blue-300">
                  <UploadIcon className="w-5 h-5" />
                  <input id={uniqueId} type="file" className="hidden" onChange={(e) => onFileChange(e.target.files)} accept={accept} multiple={multiple} />
                </label>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div aria-live="polite" role="status" className="text-sm h-5">
        {isError && (
          <p className="text-red-400 flex items-center"><ExclamationCircleIcon className="w-4 h-4 mr-1.5"/>{error}</p>
        )}
        {isSuccess && (
          <p className="text-green-400 flex items-center"><CheckCircleIcon className="w-4 h-4 mr-1.5"/>{fileCount > 1 ? 'Files' : 'File'} uploaded successfully.</p>
        )}
      </div>
    </div>
  );
};

const DocumentsSection: React.FC<{
  documents: DocumentUpload[];
  onAddDocument: () => void;
  onRemoveDocument: (id: number) => void;
  onDocumentTypeChange: (id: number, type: string) => void;
  onFileChange: (id: number, files: FileList | null) => void;
  onDocumentOtherTypeChange: (id: number, otherType: string) => void;
}> = ({ documents, onAddDocument, onRemoveDocument, onDocumentTypeChange, onFileChange, onDocumentOtherTypeChange }) => (
  <div className="space-y-4">
    {documents.map((doc) => (
      <div key={doc.id} className="p-4 bg-gray-700/50 rounded-lg space-y-4 relative animate-fade-in">
        <button 
            type="button" 
            onClick={() => onRemoveDocument(doc.id)} 
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10 p-1 rounded-full hover:bg-gray-600"
            aria-label="Remove document"
        >
            <TrashIcon className="w-5 h-5" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`doc-type-${doc.id}`} className="block text-sm font-medium text-gray-300 mb-1">Document Type</label>
            <select
              id={`doc-type-${doc.id}`}
              value={doc.type}
              onChange={(e) => onDocumentTypeChange(doc.id, e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
            >
              <option value="" disabled>Select a type</option>
              {documentTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            {doc.type === 'Other' && (
                <div className="mt-2">
                    <label htmlFor={`doc-other-type-${doc.id}`} className="sr-only">Specify Other Document Type</label>
                    <input
                        id={`doc-other-type-${doc.id}`}
                        type="text"
                        placeholder="Please specify document type"
                        value={doc.otherType || ''}
                        onChange={(e) => onDocumentOtherTypeChange(doc.id, e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}
          </div>
          <FileInput
              uploadState={doc.uploadState}
              onFileChange={(f) => onFileChange(doc.id, f)}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              multiple={doc.type === 'Transcript'}
          />
        </div>
      </div>
    ))}
    <button
      type="button"
      onClick={onAddDocument}
      className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-gray-600 rounded-md text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
    >
      <PlusIcon className="w-5 h-5 mr-2" />
      Add Document
    </button>
  </div>
);


export default ApplicationForm;