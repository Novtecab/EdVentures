import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Programs from './components/Programs';
import Testimonials from './components/Testimonials';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';
import { SelectedProgram, Institution, Scholarship, SubmittedApplication } from './components/types';
import ApplicationTracker from './components/ApplicationTracker';
import CareerGoal from './components/CareerGoal';
import { getInstitutions, postApplication } from './api/mockApi';


const App: React.FC = () => {
  const [selectedPrograms, setSelectedPrograms] = useState<SelectedProgram[]>([]);
  const [institutionsData, setInstitutionsData] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [careerGoalFilters, setCareerGoalFilters] = useState<{ goal: string; location: string } | null>(null);


  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getInstitutions();
        setInstitutionsData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch university data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  const toggleProgramSelection = (program: SelectedProgram) => {
    setSelectedPrograms(prev => {
      const isSelected = prev.some(p => p.name === program.name && p.institutionName === program.institutionName);
      if (isSelected) {
        // If it's already selected, filter it out (remove it)
        return prev.filter(p => !(p.name === program.name && p.institutionName === program.institutionName));
      } else {
        // If it's not selected, add it
        const institution = institutionsData.find(inst => inst.name === program.institutionName);
        const programToAdd: SelectedProgram = { 
            ...program,
            universityApplicationFee: institution?.applicationFee || 0
        };

        if (program.scholarships && program.scholarships.length > 0) {
          programToAdd.selectedScholarships = [program.scholarships[0]];
        } else {
          programToAdd.selectedScholarships = [];
        }
        return [...prev, programToAdd];
      }
    });
  };
  
  const toggleScholarshipSelection = (programIdentifier: { name: string; institutionName: string }, scholarship: Scholarship) => {
    setSelectedPrograms(prev => 
      prev.map(p => {
        if (p.name === programIdentifier.name && p.institutionName === programIdentifier.institutionName) {
          const scholarships = p.selectedScholarships || [];
          const isSelected = scholarships.some(s => s.name === scholarship.name);
          const newScholarships = isSelected 
            ? scholarships.filter(s => s.name !== scholarship.name)
            : [...scholarships, scholarship];
          return { ...p, selectedScholarships: newScholarships };
        }
        return p;
      })
    );
  };

  const handleFeeChange = (
    programIdentifier: { name: string; institutionName: string },
    feeType: 'university' | 'scholarship',
    feeValue: number,
    scholarshipName?: string
  ) => {
    setSelectedPrograms(prev =>
      prev.map(p => {
        // Update university fee for all programs of the same institution to ensure consistency
        if (feeType === 'university' && p.institutionName === programIdentifier.institutionName) {
          return { ...p, universityApplicationFee: feeValue };
        }
        // Update a specific scholarship fee for a specific program
        if (feeType === 'scholarship' && p.name === programIdentifier.name && p.institutionName === programIdentifier.institutionName) {
          const updatedScholarships = p.selectedScholarships?.map(s =>
            s.name === scholarshipName ? { ...s, applicationFee: feeValue } : s
          );
          return { ...p, selectedScholarships: updatedScholarships };
        }
        return p;
      })
    );
  };

  const handleCostChange = (
    programIdentifier: { name: string; institutionName: string },
    costType: 'tuition' | 'livingExpenses',
    value: string
  ) => {
    setSelectedPrograms(prev =>
      prev.map(p => {
        if (p.name === programIdentifier.name && p.institutionName === programIdentifier.institutionName) {
          // Create a new editedCost object, inheriting from original cost if it doesn't exist
          const newEditedCost = { ...(p.editedCost || p.cost) };
          newEditedCost[costType] = value;
          return { ...p, editedCost: newEditedCost };
        }
        return p;
      })
    );
  };
  
  const handleApplicationSubmit = async (formData: Omit<SubmittedApplication, 'applicationId' | 'submissionDate' | 'statusHistory'>) => {
    try {
      const result = await postApplication(formData);
      setApplicationId(result.applicationId);

    } catch (err: any) {
      console.error('Submission Error:', err);
      setError(err.message || 'Failed to submit application.');
    }
  };

  const handleSetCareerGoal = (goal: string, location: string) => {
    setCareerGoalFilters({ goal, location });
  };


  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <Header />
      <main>
        <Hero />
        <CareerGoal onSetGoal={handleSetCareerGoal} />
        {error ? (
          <section className="py-20 text-center">
            <h2 className="text-2xl font-bold text-red-500">An Error Occurred</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">{error}</p>
          </section>
        ) : (
          <Programs 
            institutionsData={institutionsData}
            isLoading={isLoading}
            selectedPrograms={selectedPrograms} 
            onToggleProgram={toggleProgramSelection}
            onToggleScholarship={toggleScholarshipSelection}
            onCostChange={handleCostChange}
            careerGoalFilters={careerGoalFilters}
          />
        )}
        <Testimonials />
        <ApplicationTracker />
        <ApplicationForm 
          institutionsData={institutionsData}
          selectedPrograms={selectedPrograms} 
          onToggleProgram={toggleProgramSelection}
          onFeeChange={handleFeeChange}
          applicationId={applicationId}
          onApplicationSubmit={handleApplicationSubmit}
          onStartNew={() => setApplicationId(null)}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;