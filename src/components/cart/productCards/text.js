// ProductCard.js
import React from 'react';

const ProductCard = ({ product, addToCart, setSelectedProduct }) => {
    const handleCardClick = () => {
        setSelectedProduct(product);
    };

    return (
        <div className='new'>
            <div className='card'>
                <div className='card-gap3'>
                    <div className='card-abt3' onClick={handleCardClick}>
                        {product.image_url && <img src={product.image_url} alt={product.name} className='card-image3' />}
                    </div>
                    <div className='card-info3'>
                        <h5>{product.name}</h5>
                        <p1>{product.description}</p1>
                        <h5>Price: ${product.price}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
