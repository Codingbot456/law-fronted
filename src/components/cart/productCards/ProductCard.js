import React from 'react';
import ReactStars from 'react-rating-stars-component';
import useProductDetails from '../../hooks/useProductImages'; // Import the custom hook

const ProductCard = ({ product, addToCart, setSelectedProduct }) => {
    const { details, loading, error } = useProductDetails(product.id); // Use the hook to fetch details

    const handleCardClick = () => {
        setSelectedProduct(product);
    };

    return (
        <div className='new'>
            <div className='card' style={{ border: 'none' }}>
                <div className='card-gap3'>
                    <div className='card-abt3' onClick={handleCardClick}>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error loading images</p>
                        ) : details.images.length > 0 ? (
                            <img src={details.images[0].image_url} alt={product.name} className='card-image3' />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                    <div className='card-info3'>
                        <div className='card-info3-3'>
                            <h6>{product.name}</h6>
                            <p1>{product.description}</p1>
                            <h5>Price: ${product.price}</h5>
                        </div>
                        <div className="transparent-background">
                            <ReactStars
                                count={5}
                                value={4.7} // Assuming this is a placeholder rating; adjust as needed
                                size={24}
                                edit={false}
                                activeColor="#FFA41C" // Amazon-like yellow color
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
