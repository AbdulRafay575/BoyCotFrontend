import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const defaultForm = {
  name: '',
  description: '',
  type: '',
  website: '',
  logo: '',
  category: '',
  categorySlug: '',
  alternative: '',
  altWebsite: '',
  altDescription: '',
  altLogo: '',
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
        logo: editingProduct.logo?.url || '',
        category: editingProduct.categories?.[0]?.name || '',
        categorySlug: editingProduct.categories?.[0]?.slug || '',
        alternative: editingProduct.alternatives?.[0]?.name || '',
        altWebsite: editingProduct.alternatives?.[0]?.website || '',
        altDescription: editingProduct.alternatives?.[0]?.description || '',
        altLogo: editingProduct.alternatives?.[0]?.logo?.url || '',
      });
    } else {
      setForm(defaultForm);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: form.name,
      description: form.description,
      type: form.type,
      website: form.website,
      logo: { url: form.logo },
      categories: [
        {
          id: uuidv4(),
          name: form.category,
          slug: form.categorySlug || form.category.toLowerCase().replace(/\s+/g, '-'),
        },
      ],
      alternatives: [
        {
          id: uuidv4(),
          name: form.alternative,
          website: form.altWebsite,
          description: form.altDescription,
          logo: { url: form.altLogo },
        },
      ],
    };

    onSave(productData, editingProduct?._id);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white shadow-md rounded-xl p-6 mb-8"
    >
      {Object.entries({
        name: 'Product Name',
        description: 'Description',
        type: 'Support Type',
        website: 'Website URL',
        logo: 'Logo URL',
        category: 'Category Name',
        categorySlug: 'Category Slug',
        alternative: 'Alternative Name',
        altWebsite: 'Alternative Website',
        altDescription: 'Alternative Description',
        altLogo: 'Alternative Logo URL',
      }).map(([key, label]) => (
        <div key={key} className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">{label}:</label>
          <input
            type="text"
            name={key}
            value={form[key]}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      <button
        type="submit"
        className="md:col-span-2 lg:col-span-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-all"
      >
        {editingProduct ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
