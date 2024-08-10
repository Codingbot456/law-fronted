// src/utils/filterProducts.js

const filterProducts = (product, filters, searchQuery) => {
    const { category = '', brand = '', color = '', price = '' } = filters;
  
    if (category && product.category !== category) return false;
    if (brand && product.brand !== brand) return false;
    if (color && product.color !== color) return false;
  
    if (price) {
      const priceValue = product.price;
      if (price === 'Under $50' && priceValue >= 50) return false;
      if (price === '$50 to $100' && (priceValue < 50 || priceValue > 100)) return false;
      if (price === '$100 to $150' && (priceValue < 100 || priceValue > 150)) return false;
      if (price === '$150 to $200' && (priceValue < 150 || priceValue > 200)) return false;
      if (price === '$200 to $300' && (priceValue < 200 || priceValue > 300)) return false;
      if (price === '$300 to $500' && (priceValue < 300 || priceValue > 500)) return false;
      if (price === '$500 to $1000' && (priceValue < 500 || priceValue > 1000)) return false;
      if (price === 'Over $1000' && priceValue <= 1000) return false;
    }
  
    if (searchQuery && typeof searchQuery === 'string' && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
  
    return true;
  };
  
  export default filterProducts;
  