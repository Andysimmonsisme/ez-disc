import { FocusTrap } from 'focus-trap-react';
import { useEffect, useRef } from 'react';

interface SaveGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartNewGame: () => void;
}

function SaveGameModal({
  isOpen,
  onClose,
  onStartNewGame,
}: SaveGameModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Optionally, focus the modal when opened
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <FocusTrap active={isOpen}>
      <div className='fixed inset-0 flex justify-center items-center z-10'>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-lg font-bold mb-4'>Save Game</h2>
          <p className='mb-4'>
            Would you like to start a new game or keep the current game active?
          </p>
          <div className='flex justify-end space-x-4'>
            <button
              onClick={onClose}
              className='bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded'
            >
              Keep Current Game Active
            </button>
            <button
              onClick={() => {
                onStartNewGame();
                onClose();
              }}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
            >
              Start New Game
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default SaveGameModal;
