import React, { useState, useEffect } from 'react';
import './product-detail.css';
import useProductDetails from '../hooks/useProductImages'; // Adjust import as necessary

const ProductDetail = ({ product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#000000'); // Default color
    const [selectedSizes, setSelectedSizes] = useState({});
    const { details, loading, error } = useProductDetails(product.id);
    const [selectedImage, setSelectedImage] = useState(null);

    // Log the product details to debug
    useEffect(() => {
        console.log("Fetching details for product ID:", product.id);
        if (details) {
            console.log("Fetched product details:", details);
        }
    }, [details, product.id]);

    // Update selected image when images are loaded
    useEffect(() => {
        if (details.images && details.images.length > 0) {
            setSelectedImage(details.images[0]); // Set to the first image directly
            console.log("Selected image set to:", details.images[0]);
        }
    }, [details.images]);

    // If no product is provided, return null
    if (!product) {
        return null;
    }

    // Handle incrementing the quantity
    const handleIncrement = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            console.log("Incremented quantity to:", newQuantity);
            return newQuantity;
        });
    };

    // Handle decrementing the quantity
    const handleDecrement = () => {
        setQuantity(prevQuantity => {
            const newQuantity = Math.max(prevQuantity - 1, 1); // Ensure quantity doesn't go below 1
            console.log("Decremented quantity to:", newQuantity);
            return newQuantity;
        });
    };

    // Handle selecting a color
    const handleColorSelect = (color) => {
        setSelectedColor(color);
        console.log("Selected color:", color);
    };

    // Handle selecting a size
    const handleSizeSelect = (size) => {
        setSelectedSizes(prevSizes => {
            const currentCount = prevSizes[size] || 0;
            const newSizes = {
                ...prevSizes,
                [size]: currentCount + 1,
            };
            console.log("Selected sizes updated:", newSizes);
            return newSizes;
        });
    };

    // Calculate total price based on selected sizes and quantity
    const totalPrice = details.product.price * quantity + Object.keys(selectedSizes).reduce((total, size) => {
        return total + (details.product.price * selectedSizes[size]);
    }, 0);
    
    console.log("Total price calculated:", totalPrice.toFixed(2));

    // Handle adding to cart
    const handleAddToCartClick = () => {
        const finalImageUrl = selectedImage || (details.images.length > 0 ? details.images[0] : '');
        const cartItem = {
            ...details.product,
            quantity: 1,
            totalPrice,
            selectedColor,
            selectedSizes,
            image_url: finalImageUrl,
        };
        console.log("Adding to cart:", cartItem);
        onAddToCart(cartItem);
        onClose();
    };

    // Handle image thumbnail click
    const handleImageClick = (image) => {
        setSelectedImage(image); // Update to use image directly
        console.log("Selected image changed to:", image);
    };

    return (
        <div className="product-detail-modal">
            <div className="product-detail-content">
                <button className="close-button" onClick={onClose}>X</button>
                <div className='details-container'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error loading product details: {error.message}</p>
                    ) : (
                        <>
                            <div className='details-images'>
                                <div className="main-image-container">
                                    {selectedImage && <img src={selectedImage} alt="Selected" className="product-detail-main-image" />}
                                </div>
                                <div className="thumbnail-container">
                                    {details.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image} // Use the image URL directly
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`thumbnail-image ${selectedImage === image ? 'selected' : ''}`}
                                            onClick={() => handleImageClick(image)} // Use the image URL directly
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='details-container1'>
                                <div className="product-detail-info1">
                                    <h2>{details.product.name}</h2>
                                    <h4>Price: ${details.product.price}</h4>
                                    <p className='description'>{details.product.description || 'No description available'}</p>
                                    <p><strong>Category:</strong> {details.product.category_name || 'N/A'}</p>
                                    <p><strong>Subcategory:</strong> {details.product.subcategory_name || 'N/A'}</p>
                                    <p>Status: {details.product?.status || 'N/A'}</p>
                                    <p><strong>Selected Sizes:</strong> {Object.entries(selectedSizes).map(([size, count]) => `${size} (x${count})`).join(', ') || 'None'}</p>
                                    <p><strong>Selected Color:</strong> <span style={{ backgroundColor: selectedColor, padding: '5px 10px', color: '#fff', borderRadius: '4px' }}>{selectedColor}</span></p>
                                    <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
                                </div>

                                <div className="product-detail-info2">
                                    <div className="sizes">
                                        {details.product.sizes && details.product.sizes.length > 0 ? (
                                            details.product.sizes.map(size => (
                                                <button
                                                    key={size.size_name}
                                                    className={`size-btn ${selectedSizes[size.size_name] ? 'selected' : ''}`}
                                                    onClick={() => handleSizeSelect(size.size_name)}
                                                >
                                                    {size.size_name}
                                                </button>
                                            ))
                                        ) : (
                                            <p>No sizes available</p>
                                        )}
                                    </div>
                                    <div className="colors">
                                        <div>Color</div>
                                        <div className='color-btn'>
                                        {details.colors && details.colors.length > 0 ? (
                                            details.colors.map(color => (
                                                <button
                                                    key={color.color_name}
                                                    className={`color-btn ${selectedColor === color.color_name ? 'selected' : ''}`}
                                                    style={{ backgroundColor: color.color_name }}
                                                    onClick={() => handleColorSelect(color.color_name)}
                                                >
                                                    {color.color_name}
                                                </button>
                                            ))
                                        ) : (
                                            <p>No colors available</p>
                                        )}
                                        </div>
                                    </div>
                                    <div className="quantity1">
                                        <button onClick={handleDecrement} className="quantity-btn">-</button>
                                        <div className="quantity-value">{quantity}</div>
                                        <button onClick={handleIncrement} className="quantity-btn">+</button>
                                    </div>
                                    <button onClick={handleAddToCartClick} className="add-to-cart-btn">Add to Cart</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
