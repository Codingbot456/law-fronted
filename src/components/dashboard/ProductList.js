import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateForm from './createForm';
import './productList.css'; // Import the CSS file

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryMap, setSubcategoryMap] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all products and categories
  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then(response => {
        console.log('Fetched products:', response.data); // Log fetched products
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));

    axios.get('http://localhost:4000/api/categories')
      .then(response => {
        console.log('Fetched categories:', response.data); // Log fetched categories
        setCategories(response.data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Fetch subcategories based on selected category ID
  useEffect(() => {
    if (selectedCategoryId !== null) {
      axios.get(`http://localhost:4000/api/subcategories?category_id=${selectedCategoryId}`)
        .then(response => {
          console.log('Fetched subcategories:', response.data); // Log fetched subcategories
          const subcategoryMap = response.data.reduce((map, subcategory) => {
            map[subcategory.subcategory_id] = subcategory.subcategory_name;
            return map;
          }, {});
          console.log('Subcategory Map:', subcategoryMap); // Log subcategory map
          setSubcategoryMap(subcategoryMap);
        })
        .catch(error => console.error('Error fetching subcategories:', error));
    }
  }, [selectedCategoryId]);

  const handleEdit = (product) => {
    console.log('Selected product for editing:', product); // Log the selected product details
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
    setIsEditing(false);
  };

  // Create a map for category IDs to names
  const categoryMap = categories.reduce((map, category) => {
    map[category.category_id] = category.category_name;
    return map;
  }, {});

  return (
    <div className="product-list">
      <h2>Product List</h2>
      {isEditing ? (
        <div>
          <CreateForm product={selectedProduct} />
          <button onClick={handleCancelEdit}>Cancel Edit</button>
        </div>
      ) : (
        <div>
          <div>
            <label htmlFor="category-select">Select Category:</label>
            <select
              id="category-select"
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              value={selectedCategoryId || ''}
            >
              <option value="">-- Select a Category --</option>
              {categories.map(category => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Status</th>
                <th>Colors</th>
                <th>Images</th>
                <th>Sizes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.product_id}>
                  <td>{product.product_id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{categoryMap[product.category_id] || 'Unknown Category'}</td> {/* Display category name */}
                  <td>{subcategoryMap[product.subcategory_id] || 'Unknown Subcategory'}</td> {/* Display subcategory name */}
                  <td>{product.status_name || 'Unknown Status'}</td> {/* Display status name */}
                  <td>
                    {product.colors && product.colors.length > 0 ? (
                      <ul>
                        {product.colors.map((color, index) => (
                          <li key={index}>{color.color_name}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="no-data">No colors available</span>
                    )}
                  </td>
                  <td>
                    {product.images && product.images.length > 0 ? (
                      <div className="image-container">
                        {product.images.map((image, index) => (
                          <img
                            key={index}
                            src={image} // Directly use the URL provided by the API
                            alt={`Product ${product.product_id} Image ${index + 1}`}
                            className="product-image"
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="no-data">No images available</span>
                    )}
                  </td>
                  <td>
                    {product.sizes && product.sizes.length > 0 ? (
                      <ul>
                        {product.sizes.map((size, index) => (
                          <li key={index}>{size.size_name} - {size.size_category}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="no-data">No sizes available</span>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(product)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductList;
