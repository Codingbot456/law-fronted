import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SearchContext } from '../../context/searchContext';
import { CartContext } from '../../context/CartContext';
import Filter from '../../components/filters/filters';
import CartBuy from '../../components/cart/CartBuy';
import ProductCard from '../../components/productCards/ProductCard';
import "./all.css";
import sortProducts from '../../utils/sortProducts';
import filterProducts from '../../utils/filterProducts';
import useWindowResize from '../../hooks/useWindowResize';
import '../../products/flex-display.css';
import { CiFilter } from "react-icons/ci";

const Sub3 = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useWindowResize();
  const { addToCart } = useContext(CartContext);
  const { searchQuery, handleSearchChange } = useContext(SearchContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/timeline/4'); // Adjust endpoint URL as needed
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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const closeFilters = () => {
    setShowFilters(false);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const filteredProducts = products.filter(product => filterProducts(product, filters, searchQuery));
  const filteredAndSortedProducts = sortProducts(filteredProducts, sortOption);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='all'>
      <div className='all-items'>
        <div className='sort'>
        {isMobile &&  <CiFilter  className='toggle' onClick={toggleFilters}/> }
          <select className='sorts' onChange={handleSortChange}>
            <option value="">Sort Products</option>
            <option value="newest">Newest</option>
            <option value="popularity">Popularity</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="search-input"
        />

        {showFilters && (
          <div className='filters'>
            <div className='filter-actions'>
              <div className='all-nav'>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/cart">Cart</Link></li>
                </ul>
              </div>
              <h3>Filters</h3>
              <div>
                <Filter onFilterChange={handleFilterChange} />
              </div>
              {isMobile && <button className='close-toggle' onClick={closeFilters}>Close Filters</button>}
            </div>
          </div>
        )}

        <div className='all-prods'>
        <div className={`home-prods3 ${selectedProduct ? 'dimmed' : ''}`}>
            <h2>Discounted Clothes</h2>
            <div className="item-content3">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
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

export default Sub3;
