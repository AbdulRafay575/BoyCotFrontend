import React, { useEffect, useState } from 'react';

const AddProductUser = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    type: '',
    website: '',
    logo: '', // this could be an object, if it has type and url
    categories: [{ id: '', name: '', slug: '' }], // array of categories
    alternatives: [{ id: '', name: '', description: '', website: '', logo: {} }], // array of alternatives
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;
    if (savedTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('categories') || name.startsWith('alternatives')) {
      const [arrayName, index, fieldName] = name.split('.');
      const updatedArray = [...form[arrayName]];
      updatedArray[index][fieldName] = value;
      setForm({ ...form, [arrayName]: updatedArray });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://boycotbackend.onrender.com/api/userproducts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert('Submitted for admin review!');
        setForm({
          name: '',
          description: '',
          type: '',
          website: '',
          logo: '',
          categories: [{ id: '', name: '', slug: '' }],
          alternatives: [{ id: '', name: '', description: '', website: '', logo: {} }],
        });
      } else {
        alert('Error submitting');
      }
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  const formatLabel = (key) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-700 ease-in-out py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden md:max-w-2xl transition-colors duration-700 ease-in-out">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Suggest a Product
            </h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Help us improve our catalog by suggesting new products
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {Object.keys(form).map((key) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {formatLabel(key)}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 p-3 shadow-sm transition duration-150 ease-in-out"
                    required
                  />
                </div>
              ))}
              {form.categories.map((category, index) => (
                <div key={`category-${index}`} className="sm:grid sm:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor={`categories.${index}.id`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category ID
                    </label>
                    <input
                      type="text"
                      id={`categories.${index}.id`}
                      name={`categories.${index}.id`}
                      value={category.id}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 p-3 shadow-sm transition duration-150 ease-in-out"
                    />
                  </div>
                  <div>
                    <label htmlFor={`categories.${index}.name`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category Name
                    </label>
                    <input
                      type="text"
                      id={`categories.${index}.name`}
                      name={`categories.${index}.name`}
                      value={category.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 p-3 shadow-sm transition duration-150 ease-in-out"
                    />
                  </div>
                  <div>
                    <label htmlFor={`categories.${index}.slug`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category Slug
                    </label>
                    <input
                      type="text"
                      id={`categories.${index}.slug`}
                      name={`categories.${index}.slug`}
                      value={category.slug}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 p-3 shadow-sm transition duration-150 ease-in-out"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out transform hover:scale-105"
              >
                Submit for Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductUser;
