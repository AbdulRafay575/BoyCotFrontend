import React, { useEffect, useState } from 'react';

const AddProductUser = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    type: '',
    website: '',
    logo: { type: '', url: '' },
    proof: '',
    categories: [{ name: '', slug: '' }],
    alternatives: [{ name: '', description: '', website: '', logo: { type: '', url: '' } }],
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', localStorage.getItem('theme') === 'dark');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const path = name.split('.');
    if (path.length === 1) {
      setForm({ ...form, [name]: value });
    } else {
      const updated = { ...form };
      let current = updated;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      setForm(updated);
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
          logo: { type: '', url: '' },
          proof: '',
          categories: [{ name: '', slug: '' }],
          alternatives: [{ name: '', description: '', website: '', logo: { type: '', url: '' } }],
        });
      } else {
        alert('Error submitting the form.');
      }
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Suggest a Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'description', 'type', 'website', 'proof'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Logo Type</label>
              <input
                type="text"
                name="logo.type"
                value={form.logo.type}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Logo URL</label>
              <input
                type="text"
                name="logo.url"
                value={form.logo.url}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <h3 className="mt-6 font-semibold">Categories</h3>
          {form.categories.map((cat, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              {['name', 'slug'].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={`categories.${i}.${field}`}
                  value={cat[field]}
                  onChange={handleChange}
                  placeholder={`Category ${field}`}
                  className="p-2 rounded border bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
                />
              ))}
            </div>
          ))}

          <h3 className="mt-6 font-semibold">Alternatives</h3>
          {form.alternatives.map((alt, i) => (
            <div key={i} className="space-y-2">
              {['name', 'description', 'website'].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={`alternatives.${i}.${field}`}
                  value={alt[field]}
                  onChange={handleChange}
                  placeholder={`Alternative ${field}`}
                  className="w-full p-2 rounded border bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
                />
              ))}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name={`alternatives.${i}.logo.type`}
                  value={alt.logo.type}
                  onChange={handleChange}
                  placeholder="Logo type"
                  className="p-2 rounded border bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
                />
                <input
                  type="text"
                  name={`alternatives.${i}.logo.url`}
                  value={alt.logo.url}
                  onChange={handleChange}
                  placeholder="Logo URL"
                  className="p-2 rounded border bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-medium"
            >
              Submit for Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductUser;
