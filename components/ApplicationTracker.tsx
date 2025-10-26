import React, { useState } from 'react';
import { SubmittedApplication, ApplicationStatus } from './types';
import { EyeIcon, CheckCircleIcon, ClockIcon, ExclamationCircleIcon, AcademicCapIcon, XCircleIcon } from './IconComponents';
import { getApplicationById } from '../api/mockApi';

const statusConfig: { [key in ApplicationStatus]: { icon: React.FC<{className?: string}>; color: string; } } = {
    Submitted: { icon: CheckCircleIcon, color: 'text-green-400' },
    'Under Review': { icon: ClockIcon, color: 'text-blue-400' },
    'Action Required': { icon: ExclamationCircleIcon, color: 'text-yellow-400' },
    Accepted: { icon: AcademicCapIcon, color: 'text-green-400' },
    Rejected: { icon: XCircleIcon, color: 'text-red-400' },
};

const ApplicationTracker: React.FC = () => {
    const [appId, setAppId] = useState('');
    const [application, setApplication] = useState<SubmittedApplication | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleTrackApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!appId) {
            setError('Please enter an Application ID.');
            return;
        }
        setIsLoading(true);
        setError('');
        setApplication(null);
        
        try {
            const data = await getApplicationById(appId.trim());
            setApplication(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleScrollToForm = () => {
        document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' });
    };

    const currentStatus = application ? application.statusHistory[application.statusHistory.length - 1].status : null;

    return (
        <section id="tracker" className="py-20 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center">
                        <EyeIcon className="w-10 h-10 mr-3" />
                        Track Your Application
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                        Enter the Application ID you received upon submission to check your current status.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    {!application ? (
                        <form onSubmit={handleTrackApplication} className="space-y-4">
                            <div>
                                <label htmlFor="appId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Application ID
                                </label>
                                <input
                                    type="text"
                                    id="appId"
                                    value={appId}
                                    onChange={(e) => setAppId(e.target.value)}
                                    className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., GEV-1234567890"
                                    aria-describedby="error-message"
                                />
                            </div>
                            {error && <p id="error-message" className="text-red-500 text-sm">{error}</p>}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-6 bg-blue-600 text-white text-lg font-bold rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Tracking...
                                    </>
                                ) : (
                                    'Track Status'
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="animate-fade-in">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">Status for {application.fullName}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Application ID: {application.applicationId}</p>

                            <div className="mb-8 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
                                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Current Status</h4>
                                {currentStatus &&
                                    <p className={`text-xl font-bold flex items-center ${statusConfig[currentStatus].color}`}>
                                        {React.createElement(statusConfig[currentStatus].icon, { className: 'w-6 h-6 mr-2' })}
                                        {currentStatus}
                                    </p>
                                }
                            </div>
                            
                            <div className="space-y-2 mb-8">
                                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Selected Programs</h4>
                                {application.selectedPrograms.map(p => (
                                    <div key={p.name} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                                        <p className="font-bold text-gray-800 dark:text-gray-100">{p.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{p.institutionName}</p>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Application History</h4>
                                <div className="border-l-2 border-gray-200 dark:border-gray-600 pl-6 space-y-8">
                                    {application.statusHistory.slice().reverse().map((update, index) => {
                                        const config = statusConfig[update.status];
                                        const isCurrent = index === 0;
                                        return (
                                            <div key={index} className="relative">
                                                <div className={`absolute -left-[34px] top-1 w-4 h-4 rounded-full ${isCurrent ? 'bg-blue-500 ring-4 ring-blue-500/30' : 'bg-gray-300 dark:bg-gray-500'}`}></div>
                                                <p className={`font-bold text-lg flex items-center ${config.color}`}>
                                                    {React.createElement(config.icon, { className: 'w-5 h-5 mr-2' })}
                                                    {update.status}
                                                </p>
                                                <time className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">{new Date(update.timestamp).toLocaleString()}</time>
                                                <p className="text-gray-600 dark:text-gray-300">{update.notes}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <button
                                onClick={() => { setApplication(null); setAppId(''); }}
                                className="w-full mt-8 py-2 px-6 bg-gray-500 text-white text-md font-bold rounded-md hover:bg-gray-600 transition-colors duration-300"
                            >
                                Track Another Application
                            </button>
                        </div>
                    )}
                    
                    {!application && (
                         <div className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                             <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Haven't applied yet?</h4>
                             <p className="text-gray-600 dark:text-gray-400 my-2">Complete your universal application to get started.</p>
                             <button onClick={handleScrollToForm} className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                                 Go to Application Form
                             </button>
                         </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ApplicationTracker;