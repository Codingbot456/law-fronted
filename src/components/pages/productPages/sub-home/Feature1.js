import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../../context/CartContext';
import ProductCard from '../../../productCards/ProductCard';
import CartBuy from '../../../cart/CartBuy';




const Featured1 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/status/1'); // Adjust endpoint URL as needed
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('There was an error fetching the products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='all'>
      <div className='all-items'>
        <div className='all-prods'> 
          <div className={`home-prods3 ${selectedProduct ? 'dimmed' : ''}`}>
            <h2>Trending Products</h2>
            <div className="item-content3">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    addToCart={addToCart}
                    setSelectedProduct={setSelectedProduct}
                  />
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
            {selectedProduct && (
              <div className="overlay">
                <CartBuy
                  product={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                  onAddToCart={addToCart}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured1;
