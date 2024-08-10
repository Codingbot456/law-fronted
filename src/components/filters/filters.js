// src/components/Filter.js
import React, { useState, useEffect } from 'react';
import '../filters/filters.css';

const Filter = ({ onFilterChange }) => {
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');

  // This function updates filters and calls the onFilterChange prop
  const updateFilters = () => {
    onFilterChange({ category, brand, price, color });
  };

  // Use useEffect to call updateFilters only when one of the filter values changes
  useEffect(() => {
    updateFilters();
  }, [category, brand, price, color]); // Remove onFilterChange from the dependency array

  return (
    <div className='main-filter'>
      <h5>Category</h5>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=''>All</option>
        <option value='Woman'>Woman</option>
        <option value='Man'>Man</option>
        <option value='Watch'>Watch</option>
        <option value='Kids'>Kids</option>
        <option value='Sports'>Sports</option>
        <option value='Sunglass'>Sunglass</option>
        <option value='Bags'>Bags</option>
        <option value='Sneakers'>Sneakers</option>
      </select>

      <h5>Brands</h5>
      <select value={brand} onChange={(e) => setBrand(e.target.value)}>
        <option value=''>All</option>
        <option value='Shovia'>Shovia</option>
        <option value='Fusion'>Fusion</option>
        <option value='Hunter Shoes'>Hunter Shoes</option>
        <option value='Club Shoes'>Club Shoes</option>
        <option value='Hoppister'>Hoppister</option>
        <option value='Blaze Fashion'>Blaze Fashion</option>
        <option value='Elegance'>Elegance</option>
        <option value='Fashadil'>Fashadil</option>
      </select>

      <h5>Price</h5>
      <select value={price} onChange={(e) => setPrice(e.target.value)}>
        <option value=''>All</option>
        <option value='Under $50'>Under $50</option>
        <option value='$50 to $100'>$50 to $100</option>
        <option value='$100 to $150'>$100 to $150</option>
        <option value='$150 to $200'>$150 to $200</option>
        <option value='$200 to $300'>$200 to $300</option>
        <option value='$300 to $500'>$300 to $500</option>
        <option value='$500 to $1000'>$500 to $1000</option>
        <option value='Over $1000'>Over $1000</option>
      </select>

      <h5>Colors</h5>
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value=''>All</option>
        <option value='Black'>Black</option>
        <option value='Blue'>Blue</option>
        <option value='Olive'>Olive</option>
        <option value='Maroon'>Maroon</option>
        <option value='Brown'>Brown</option>
        <option value='White'>White</option>
        <option value='Gray'>Gray</option>
      </select>
    </div>
  );
};

export default Filter;
