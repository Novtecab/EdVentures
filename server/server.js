const express = require('express');
const cors = require('cors');
const { initialInstitutionsData } = require('./data');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// In-memory storage for applications
const applications = {};

// --- API Endpoints ---

// Get all institutions
app.get('/api/institutions', (req, res) => {
  // Simulate network delay
  setTimeout(() => {
    res.json(initialInstitutionsData);
  }, 1500);
});

// Submit a new application
app.post('/api/applications', (req, res) => {
  const formData = req.body;
  const newId = `GEV-${Date.now()}`;
  const submissionDate = new Date().toISOString();
  
  const initialStatus = {
    timestamp: submissionDate,
    status: 'Submitted',
    notes: 'Your application has been successfully received. An advisor will be assigned to your case shortly.'
  };

  const newApplication = {
    ...formData,
    applicationId: newId,
    submissionDate: submissionDate,
    statusHistory: [initialStatus],
  };

  applications[newId] = newApplication;
  
  // Simulate status updates on the backend
  simulateStatusUpdates(newId);

  res.status(201).json({ applicationId: newId });
});

// Get application status by ID
app.get('/api/applications/:id', (req, res) => {
  const { id } = req.params;
  const application = applications[id];

  // Simulate network delay
  setTimeout(() => {
    if (application) {
        res.json(application);
    } else {
        res.status(404).json({ message: 'Application not found' });
    }
  }, 1000);
});


// --- Server Start ---
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// --- Helper Functions ---
const simulateStatusUpdates = (appId) => {
    const updateStatus = (status, notes) => {
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
      ];
      const randomStatus = finalStatuses[Math.floor(Math.random() * finalStatuses.length)];
      updateStatus(randomStatus.status, randomStatus.notes);
    }, 30000); // 30 seconds
};
