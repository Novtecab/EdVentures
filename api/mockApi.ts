import { initialInstitutionsData } from './data';
import { Institution, SubmittedApplication, ApplicationStatus } from '../components/types';

// In-memory storage for applications, simulating a database.
const applications: { [key: string]: SubmittedApplication } = {};

const simulateStatusUpdates = (appId: string) => {
    const updateStatus = (status: ApplicationStatus, notes: string) => {
      const app = applications[appId];
      if (app) {
        const newUpdate = {
          timestamp: new Date().toISOString(),
          status,
          notes,
        };
        app.statusHistory.push(newUpdate);
        applications[appId] = app;
      }
    };
  
    setTimeout(() => {
      updateStatus('Under Review', 'Your application is now under review by our admissions team. This process typically takes 3-5 business days.');
    }, 15000); // 15 seconds
  
    setTimeout(() => {
      const finalStatuses = [
        { status: 'Accepted', notes: 'Congratulations! Your application has been accepted. Please check your email for the official offer letter and next steps.' },
        { status: 'Rejected', notes: 'We regret to inform you that after careful consideration, we are unable to offer you a place at this time. We wish you the best in your future endeavors.' },
        { status: 'Action Required', notes: 'We require additional information. Please upload a certified copy of your academic transcripts to the portal.' }
      ] as const;
      const randomStatus = finalStatuses[Math.floor(Math.random() * finalStatuses.length)];
      updateStatus(randomStatus.status, randomStatus.notes);
    }, 30000); // 30 seconds
};

export const getInstitutions = (): Promise<Institution[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(initialInstitutionsData)));
    }, 1500);
  });
};

export const postApplication = (formData: Omit<SubmittedApplication, 'applicationId' | 'submissionDate' | 'statusHistory'>): Promise<{ applicationId: string }> => {
  return new Promise((resolve) => {
    const newId = `GEV-${Date.now()}`;
    const submissionDate = new Date().toISOString();

    const initialStatus = {
      timestamp: submissionDate,
      status: 'Submitted' as ApplicationStatus,
      notes: 'Your application has been successfully received. An advisor will be assigned to your case shortly.'
    };

    const newApplication: SubmittedApplication = {
      ...formData,
      applicationId: newId,
      submissionDate: submissionDate,
      statusHistory: [initialStatus],
    };

    applications[newId] = newApplication;
    simulateStatusUpdates(newId);

    // Simulate network delay for the response
    setTimeout(() => {
      resolve({ applicationId: newId });
    }, 500);
  });
};

export const getApplicationById = (id: string): Promise<SubmittedApplication> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const application = applications[id];
      if (application) {
        // Return a copy to prevent direct mutation
        resolve(JSON.parse(JSON.stringify(application)));
      } else {
        reject(new Error('Application ID not found. Please check the ID and try again.'));
      }
    }, 1000);
  });
};
