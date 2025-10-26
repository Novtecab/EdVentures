export interface SupportService {
  id: string;
  name: string;
  description: string;
  cost: number; // in PKR
}

export interface Scholarship {
  name: string;
  description: string;
  amount: string;
  eligibility:string;
  applicationDeadline?: string;
  applicationFee?: number;
}

export interface ProgramCost {
  tuition: string;
  livingExpenses: string;
}

export interface Program {
  name: string;
  type: 'Masters' | 'Bachelors' | 'Course';
  duration: string;
  prerequisites: string;
  applicationDeadline: string;
  cost: ProgramCost;
  scholarships?: Scholarship[];
  tags?: string[];
}

export interface InstitutionDetails {
  history: string;
  notableAlumni: string[];
  campusFacilities: string[];
}

export interface Institution {
  name: string;
  location: string;
  imageUrl: string;
  description: string;
  region: string;
  programs: Program[];
  details?: InstitutionDetails;
  applicationFee?: number;
}

export interface SelectedProgram extends Program {
  institutionName: string;
  selectedScholarships?: Scholarship[];
  universityApplicationFee?: number;
  editedCost?: ProgramCost;
}

export type VisaType = 'none' | 'study' | 'tourist';
export type AccommodationPreference = 'on-campus' | 'off-campus' | 'none';

export interface FileUploadState {
  files: File[] | null;
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

export interface DocumentUpload {
  id: number;
  type: string;
  otherType?: string;
  uploadState: FileUploadState;
}

export type ApplicationStatus = 'Submitted' | 'Under Review' | 'Action Required' | 'Accepted' | 'Rejected';

export interface ApplicationUpdate {
  timestamp: string;
  status: ApplicationStatus;
  notes: string;
}

export interface SubmittedApplication {
  applicationId: string;
  submissionDate: string;
  statusHistory: ApplicationUpdate[];
  // Applicant Info
  fullName: string;
  email: string;
  // Programs
  selectedPrograms: SelectedProgram[];
  // Preferences
  visaType: VisaType;
  accommodationPreference: AccommodationPreference;
  selectedServices: SupportService[];
  // Contact Info
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactMessage: string;
  documents: { type: string, fileName: string | undefined }[];
}