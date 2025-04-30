import React, { useState } from 'react';

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('https://boycotbackend.onrender.com/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('adminToken', data.token);
      onLoginSuccess();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-700 ease-in-out p-6">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 transition-colors duration-700 ease-in-out">
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">Admin Login</h2>
        
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
