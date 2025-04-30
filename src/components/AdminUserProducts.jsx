import React, { useEffect, useState } from 'react';
import AdminLogin from './AdminLogin';

const AdminUserProducts = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));

  const fetchUserProducts = async () => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch('https://boycotbackend.onrender.com/api/userproducts', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401 || res.status === 403) {
      setIsLoggedIn(false);
      return;
    }

    const data = await res.json();
    setUserProducts(data);
  };

  useEffect(() => {
    if (isLoggedIn) fetchUserProducts();
  }, [isLoggedIn]);

  const handleApprove = async (id) => {
    const token = localStorage.getItem('adminToken');
    await fetch(`https://boycotbackend.onrender.com/api/userproducts/${id}/approve`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUserProducts();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    await fetch(`https://boycotbackend.onrender.com/api/userproducts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUserProducts();
  };

  if (!isLoggedIn) return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-700 ease-in-out py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-6xl sm:text-7xl font-extrabold text-black-800 dark:text-white drop-shadow-lg tracking-wide font-serif leading-tight">
            Products
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              setIsLoggedIn(false);
            }}
            className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-lg shadow-lg font-semibold transition"
          >
            Logout
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {userProducts.map((p, index) => (
            <div
              key={p.id}
              className={`rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 border-2
                ${Math.floor(index / 2) % 2 === 0 ? 'bg-white text-gray-900 border-gray-300' : 'bg-gray-900 text-gray-100 border-gray-700'}`}
            >
              <h2 className="text-3xl font-bold mb-3 font-serif tracking-tight">
                {p.name}
              </h2>
              <p><span className="font-semibold">Type:</span> {p.type}</p>
              <p><span className="font-semibold">Website:</span> <a href={p.website} className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">View Website</a></p>
              <p><span className="font-semibold">Description:</span> {p.description || 'No description available'}</p>
              {p.categories && p.categories.length > 0 && (
                <div>
                  <span className="font-semibold">Categories:</span>
                  <ul>
                    {p.categories.map((category) => (
                      <li key={category.id}>{category.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              {p.alternatives && p.alternatives.length > 0 && (
                <div>
                  <span className="font-semibold">Alternatives:</span>
                  <ul>
                    {p.alternatives.map((alt) => (
                      <li key={alt.id}>
                        <p>{alt.name}</p>
                        {alt.description && <p>{alt.description}</p>}
                        {alt.website && <a href={alt.website} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Visit Website</a>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {p.logo && (
                <div className="mt-3">
                  <span className="font-semibold">Logo:</span>
                  <img src={p.logo.url} alt={`${p.name} logo`} className="w-20 h-20 object-contain" />
                </div>
              )}
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => handleApprove(p.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUserProducts;
