import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

const SkeletonCard = () => (
  <div className="animate-pulse p-4 rounded-xl shadow-md bg-white w-full max-w-md">
    <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-2/3 mb-1"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
    <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
    <div className="h-3 bg-gray-200 rounded w-1/4 mb-3"></div>
  </div>
);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
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
  });

  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://boycotbackend.onrender.com/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      id: editingId || uuidv4(),
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

    try {
      const url = `https://boycotbackend.onrender.com/api/products${editingId ? `/${editingId}` : ''}`;
      const method = editingId ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      setForm({
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
      });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || '',
      description: product.description || '',
      type: product.type || '',
      website: product.website || '',
      logo: product.logo?.url || '',
      category: product.categories?.[0]?.name || '',
      categorySlug: product.categories?.[0]?.slug || '',
      alternative: product.alternatives?.[0]?.name || '',
      altWebsite: product.alternatives?.[0]?.website || '',
      altDescription: product.alternatives?.[0]?.description || '',
      altLogo: product.alternatives?.[0]?.logo?.url || '',
    });
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://boycotbackend.onrender.com/api/products/${id}`, {
        method: 'DELETE',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🚫 Boycott Product Manager</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white shadow-md rounded-xl p-6 mb-8">
        {[ 
          ['name', 'Product Name'],
          ['description', 'Description'],
          ['type', 'Support Type'],
          ['website', 'Website URL'],
          ['logo', 'Logo URL'],
          ['category', 'Category Name'],
          ['categorySlug', 'Category Slug'],
          ['alternative', 'Alternative Name'],
          ['altWebsite', 'Alternative Website'],
          ['altDescription', 'Alternative Description'],
          ['altLogo', 'Alternative Logo URL'],
        ].map(([key, label]) => (
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
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          : products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-lg p-4 transition-transform duration-300 hover:scale-105"
              >
                {p.logo?.url && (
                  <img src={p.logo.url} alt={p.name} className="w-24 h-24 object-contain mb-2" />
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p><strong>Type:</strong> {p.type}</p>
                <p><strong>Description:</strong> {p.description}</p>
                <p><strong>Website:</strong> <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{p.website}</a></p>
                <p><strong>Category:</strong> {p.categories?.[0]?.name || 'N/A'} ({p.categories?.[0]?.slug || ''})</p>
                {p.alternatives?.[0] && (
                  <div className="mt-2">
                    <p className="font-bold text-sm">Alternative:</p>
                    {p.alternatives[0].logo?.url && (
                      <img src={p.alternatives[0].logo.url} alt={p.alternatives[0].name} className="w-16 h-16 object-contain mb-2" />
                    )}
                    <p>{p.alternatives[0].name}</p>
                    <p className="text-xs">{p.alternatives[0].description}</p>
                    <a href={p.alternatives[0].website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-sm">
                      {p.alternatives[0].website}
                    </a>
                  </div>
                )}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-4 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProductList;
