import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EnhancedNavbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'light' ? false : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold dark:text-white text-gray-900">
        BoyCott
        </Link>

        <ul className="flex items-center space-x-6 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/suggest" className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
              Suggest Product
            </Link>
          </li>
          <li>
            <Link to="/admin/user-products" className="hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
              Admin View
            </Link>
          </li>
          <li>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="bg-gray-200 dark:bg-gray-800 text-sm px-3 py-1 rounded-md transition hover:scale-105 hover:shadow"
            >
              {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default EnhancedNavbar;
