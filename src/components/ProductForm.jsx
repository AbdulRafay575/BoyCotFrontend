import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const defaultForm = {
  name: '',
  description: '',
  type: '',
  website: '',
  proof: '',
  logo: {
    type: '',
    url: '',
  },
  categories: [
    {
      name: '',
      slug: '',
    },
  ],
  alternatives: [
    {
      name: '',
      description: '',
      website: '',
      logo: {
        type: '',
        url: '',
      },
    },
  ],
};

const ProductForm = ({ editingProduct, onSave }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || '',
        description: editingProduct.description || '',
        type: editingProduct.type || '',
        website: editingProduct.website || '',
        proof: editingProduct.proof || '',
        logo: {
          type: editingProduct.logo?.type || '',
          url: editingProduct.logo?.url || '',
        },
        categories: editingProduct.categories?.map((cat) => ({
          name: cat.name || '',
          slug: cat.slug || '',
        })) || [{ name: '', slug: '' }],
        alternatives: editingProduct.alternatives?.map((alt) => ({
          name: alt.name || '',
          description: alt.description || '',
          website: alt.website || '',
          logo: {
            type: alt.logo?.type || '',
            url: alt.logo?.url || '',
          },
        })) || [
          {
            name: '',
            description: '',
            website: '',
            logo: { type: '', url: '' },
          },
        ],
      });
    } else {
      setForm(defaultForm);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length === 1) {
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => {
        const updated = { ...prev };
        let current = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          if (Array.isArray(current[keys[i]])) {
            current = current[keys[i]][parseInt(keys[i + 1])];
            i++;
          } else {
            current = current[keys[i]];
          }
        }
        current[keys[keys.length - 1]] = value;
        return { ...updated };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      name: form.name,
      description: form.description,
      type: form.type,
      website: form.website,
      proof: form.proof,
      logo: {
        type: form.logo.type,
        url: form.logo.url,
      },
      categories: form.categories.map((cat) => ({
        _id: uuidv4(),
        name: cat.name,
        slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
      })),
      alternatives: form.alternatives.map((alt) => ({
        _id: uuidv4(),
        name: alt.name,
        description: alt.description,
        website: alt.website,
        logo: {
          type: alt.logo.type,
          url: alt.logo.url,
        },
      })),
    };

    onSave(finalData, editingProduct?._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {editingProduct ? 'Edit Product' : 'Add a Product'}
        </h2>
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

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-medium"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
