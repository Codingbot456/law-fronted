import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Base URL for your API
const API_BASE_URL = 'http://localhost:4000'; 

const CreateProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category_id: '',
        subcategory_id: '',
        status_id: '',
        size_ids: [],
        color_ids: [],
        image_urls: []
    });

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [categoriesRes, subcategoriesRes, statusesRes, sizesRes, colorsRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/categories`),
                    axios.get(`${API_BASE_URL}/subcategories`),
                    axios.get(`${API_BASE_URL}/statuses`),
                    axios.get(`${API_BASE_URL}/sizes`),
                    axios.get(`${API_BASE_URL}/colors`)
                ]);

                setCategories(categoriesRes.data);
                setSubcategories(subcategoriesRes.data);
                setStatuses(statusesRes.data);
                setSizes(sizesRes.data);
                setColors(colorsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (e) => {
        const { name, options } = e.target;
        const selectedValues = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);

        setFormData({
            ...formData,
            [name]: selectedValues
        });
    };

    const handleImageAdd = () => {
        setFormData({
            ...formData,
            image_urls: [...formData.image_urls, '']
        });
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...formData.image_urls];
        updatedImages[index] = value;
        setFormData({
            ...formData,
            image_urls: updatedImages
        });
    };

    const handleImageRemove = (index) => {
        const updatedImages = formData.image_urls.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            image_urls: updatedImages
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/products`, formData);
            alert('Product created successfully!');
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Error creating product');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div>
                <label>Category:</label>
                <select name="category_id" value={formData.category_id} onChange={handleChange}>
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                        <option key={cat.category_id} value={cat.category_id}>
                            {cat.category_name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Subcategory:</label>
                <select name="subcategory_id" value={formData.subcategory_id} onChange={handleChange}>
                    <option value="">Select a subcategory</option>
                    {subcategories.map(sub => (
                        <option key={sub.subcategory_id} value={sub.subcategory_id}>
                            {sub.subcategory_name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Status:</label>
                <select name="status_id" value={formData.status_id} onChange={handleChange}>
                    <option value="">Select a status</option>
                    {statuses.map(status => (
                        <option key={status.status_id} value={status.status_id}>
                            {status.status_name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Sizes:</label>
                <select
                    name="size_ids"
                    multiple
                    value={formData.size_ids}
                    onChange={handleSelectChange}
                >
                    {sizes.map(size => (
                        <option key={size.size_id} value={size.size_id}>
                            {size.size_name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Colors:</label>
                <select
                    name="color_ids"
                    multiple
                    value={formData.color_ids}
                    onChange={handleSelectChange}
                >
                    {colors.map(color => (
                        <option key={color.color_id} value={color.color_id}>
                            {color.color_name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Images:</label>
                {formData.image_urls.map((url, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            placeholder="Image URL"
                        />
                        <button type="button" onClick={() => handleImageRemove(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleImageAdd}>Add Image</button>
            </div>
            <button type="submit">Create Product</button>
        </form>
    );
};

export default CreateProductForm;
