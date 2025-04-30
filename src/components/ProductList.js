import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://boycotbackend.onrender.com/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (productData, id) => {
    const url = `https://boycotbackend.onrender.com/api/products${id ? `/${id}` : ''}`;
    const method = id ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://boycotbackend.onrender.com/api/products/${id}`, {
        method: 'DELETE',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🚫 Boycott Product Manager</h2>
      <ProductForm editingProduct={editingProduct} onSave={handleSave} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg p-4 transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Type:</strong> {product.type}</p>
              <p><strong>Website:</strong> <a href={product.website} className="text-blue-500 underline">{product.website}</a></p>

              <div>
                <h4 className="font-semibold mt-2">Logo</h4>
                <img src={product.logo.url} alt="Logo" className="w-20 h-20 object-cover" />
                <p>Type: {product.logo.type}</p>
              </div>

              <div>
                <h4 className="font-semibold mt-2">Categories</h4>
                {product.categories.map((category) => (
                  <div key={category._id}>
                    <p><strong>Category:</strong> {category.name}</p>
                    <p><strong>Slug:</strong> {category.slug}</p>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold mt-2">Alternatives</h4>
                {product.alternatives.map((alt) => (
                  <div key={alt._id}>
                    <p><strong>Alternative Name:</strong> {alt.name}</p>
                    <p><strong>Description:</strong> {alt.description}</p>
                    <p><strong>Website:</strong> <a href={alt.website} className="text-blue-500 underline">{alt.website}</a></p>
                    <img src={alt.logo.url} alt="Alternative Logo" className="w-20 h-20 object-cover" />
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold mt-2">Proof</h4>
                <a href={product.proof} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Proof Link</a>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="mt-2 mr-2 px-3 py-1 bg-yellow-400 text-black rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
