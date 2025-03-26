import { useEffect, useState } from "react";

function Header() {
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
    <header className='flex justify-between items-center mb-4'>
      <h1 className='text-4xl font-extrabold text-blue-900 dark:text-white'>
        EZ Disc
      </h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className='px-4 py-2 rounded bg-gray-700 dark:bg-gray-200 text-white dark:text-black hover:bg-gray-600 dark:hover:bg-gray-300'
      >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
    </header>
  );
}

export default Header;
