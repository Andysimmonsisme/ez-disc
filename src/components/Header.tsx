import { useEffect, useState } from 'react';
import Navigation from './Navigation';

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className='flex flex-wrap justify-between items-center mb-4'>
      <Navigation />
      <h1 className='text-4xl font-extrabold text-blue-900 dark:text-white'>
        {title}
      </h1>

      <div role='group' aria-label='Dark and Light Mode Toggle' className='flex'>
        <button
          onClick={() => setDarkMode(true)}
          aria-pressed={darkMode}
          className={`px-4 py-2 rounded ${
            darkMode ? 'bg-blue-600' : 'border border-gray-300 hover:bg-gray-200'
          }`}
        >
          Dark Mode
        </button>
        <button
          onClick={() => setDarkMode(false)}
          aria-pressed={!darkMode}
          className={`px-4 py-2 rounded ${
            !darkMode ? 'bg-blue-600 text-white' : 'border border-gray-600 hover:bg-gray-600'
          }`}
        >
          Light Mode
        </button>
      </div>
    </header>
  );
}

export default Header;
