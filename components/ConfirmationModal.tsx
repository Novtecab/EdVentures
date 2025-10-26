import React, { useEffect, useRef } from 'react';
import { ExclamationCircleIcon } from './IconComponents';

interface ConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  onClose, 
  onConfirm, 
  title, 
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[70] p-4"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-md flex flex-col overflow-hidden"
        style={{ animation: 'scaleIn 0.2s ease-out forwards' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8 text-center">
            <ExclamationCircleIcon className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
            <h2 id="confirmation-modal-title" className="text-2xl font-bold text-white mb-2">{title}</h2>
            <div className="text-gray-300 text-lg">
                {children}
            </div>
        </div>
        <footer className="p-4 bg-gray-900/50 flex justify-end items-center space-x-4">
           <button 
             onClick={onClose} 
             className="py-2 px-6 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"
            >
            {cancelText}
          </button>
           <button 
             onClick={onConfirm} 
             className="py-2 px-6 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            >
            {confirmText}
          </button>
        </footer>
      </div>
       <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>
    </div>
  );
};

export default ConfirmationModal;