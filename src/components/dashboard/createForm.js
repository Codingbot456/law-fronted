import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './createForm.css';

function CreateForm({ product }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [status, setStatus] = useState('');
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]); // To track removed images
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sizesData, colorsData, categoriesData, statusesData] = await Promise.all([
          axios.get('http://localhost:4000/api/sizes'),
          axios.get('http://localhost:4000/api/colors'),
          axios.get('http://localhost:4000/api/categories'),
          axios.get('http://localhost:4000/api/statuses'),
        ]);
        setSizes(sizesData.data);
        setColors(colorsData.data);
        setCategories(categoriesData.data);
        setStatuses(statusesData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (category) {
      axios.get('http://localhost:4000/api/subcategories', { params: { category_id: category } })
        .then(response => setSubcategories(response.data))
        .catch(error => console.error('Error fetching subcategories:', error));
    } else {
      setSubcategories([]);
    }
  }, [category]);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setDescription(product.description || '');
      setCategory(product.category_id || '');
      setSubcategory(product.subcategory_id || '');
      setStatus(product.status_id || '');
      setSelectedSizes(product.sizes.map(size => size.size_id) || []);
      setSelectedColors(product.colors.map(color => color.color_id) || []);
      setExistingImages(product.images || []);
    }
  }, [product]);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleRemoveImage = (imageUrl) => {
    setExistingImages(prev => prev.filter(image => image !== imageUrl));
    setRemovedImages(prev => [...prev, imageUrl]); // Track removed images
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category_id', category);
    formData.append('subcategory_id', subcategory);
    formData.append('status_id', status);
    selectedSizes.forEach(size => formData.append('size_ids[]', size));
    selectedColors.forEach(color => formData.append('color_ids[]', color));
    existingImages.forEach(image => formData.append('existing_images[]', image));
    removedImages.forEach(image => formData.append('removed_images[]', image)); // Include removed images
    Array.from(images).forEach(image => formData.append('images', image));

    try {
      const url = product ? `http://localhost:4000/api/products/${product.product_id}` : 'http://localhost:4000/api/products';
      const method = product ? 'put' : 'post';
      const response = await axios[method](url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatusMessage('Product saved successfully!');
      setStatusType('success');
    } catch (error) {
      setStatusMessage('Error saving product. Please try again.');
      setStatusType('error');
      console.error('Error saving product:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <h2>{product ? 'Update Product' : 'Create New Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
          step="0.01"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
        />

        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Subcategory:</label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            required
          >
            <option value="">Select Subcategory</option>
            {subcategories.map(sub => (
              <option key={sub.subcategory_id} value={sub.subcategory_id}>
                {sub.subcategory_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            {statuses.map(st => (
              <option key={st.status_id} value={st.status_id}>
                {st.status_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sizes:</label>
          {sizes.map(size => (
            <div key={size.size_id}>
              <input
                type="checkbox"
                id={`size-${size.size_id}`}
                value={size.size_id}
                checked={selectedSizes.includes(size.size_id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSizes(prev => [...prev, size.size_id]);
                  } else {
                    setSelectedSizes(prev => prev.filter(id => id !== size.size_id));
                  }
                }}
              />
              <label htmlFor={`size-${size.size_id}`}>{size.size_name}</label>
            </div>
          ))}
        </div>

        <div>
          <label>Colors:</label>
          {colors.map(color => (
            <div key={color.color_id}>
              <input
                type="checkbox"
                id={`color-${color.color_id}`}
                value={color.color_id}
                checked={selectedColors.includes(color.color_id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedColors(prev => [...prev, color.color_id]);
                  } else {
                    setSelectedColors(prev => prev.filter(id => id !== color.color_id));
                  }
                }}
              />
              <label htmlFor={`color-${color.color_id}`}>{color.color_name}</label>
            </div>
          ))}
        </div>

        <div>
          <label>Images:</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
          />
          {existingImages.length > 0 && (
            <div className="image-container">
              <h4>Existing Images:</h4>
              {existingImages.map((image, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={image}
                    alt={`Existing Image ${index + 1}`}
                    className="product-image"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image)}
                    className="remove-image-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          {images.length > 0 && (
            <div className="image-container">
              <h4>New Images:</h4>
              {Array.from(images).map((file, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`New Image ${index + 1}`}
                    className="product-image"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit">Save Product</button>
        {statusMessage && (
          <div className={`status-message ${statusType}`}>
            {statusMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateForm;
