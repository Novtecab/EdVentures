import React, { useState } from 'react';
import { BriefcaseIcon, CpuChipIcon, TrophyIcon, PaintBrushIcon } from './IconComponents';

const goals = [
  { name: 'Entrepreneur / Business Leader', icon: BriefcaseIcon, tag: 'Business' },
  { name: 'Tech Innovator / Engineer', icon: CpuChipIcon, tag: 'STEM' },
  { name: 'Pro Athlete', icon: TrophyIcon, tag: 'Sports' },
  { name: 'Creative Artist / Designer', icon: PaintBrushIcon, tag: 'Arts' },
];

const locations = ['In Pakistan', 'Abroad'];

interface CareerGoalProps {
  onSetGoal: (goal: string, location: string) => void;
}

const CareerGoal: React.FC<CareerGoalProps> = ({ onSetGoal }) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleApply = () => {
    if (selectedGoal && selectedLocation) {
      onSetGoal(selectedGoal, selectedLocation);
      document.getElementById('universities')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="career-goal" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Chart Your Course</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Tell us your ambition, and we'll tailor the path for you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">1. What is your primary career goal?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {goals.map(goal => {
                const isSelected = selectedGoal === goal.tag;
                return (
                  <button
                    key={goal.name}
                    onClick={() => setSelectedGoal(goal.tag)}
                    className={`p-6 text-center rounded-lg border-2 transition-all duration-300 transform hover:-translate-y-1 ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/50 dark:border-blue-500 shadow-lg'
                        : 'bg-gray-50 border-transparent dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <goal.icon className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{goal.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">2. Where do you want to study?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              {locations.map(location => {
                const isSelected = selectedLocation === location;
                return (
                  <button
                    key={location}
                    onClick={() => setSelectedLocation(location)}
                    className={`flex-1 p-6 text-center rounded-lg border-2 transition-all duration-300 ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/50 dark:border-blue-500 shadow-lg'
                        : 'bg-gray-50 border-transparent dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <span className="text-xl font-bold text-gray-800 dark:text-gray-200">{location}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="text-center pt-4">
            <button
              onClick={handleApply}
              disabled={!selectedGoal || !selectedLocation}
              className="px-12 py-4 bg-blue-600 text-white text-xl font-bold rounded-full shadow-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Find My Path
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerGoal;
