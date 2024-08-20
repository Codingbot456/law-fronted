import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductDetails = (productId) => {
    const [details, setDetails] = useState({
        product: {
            id: '',
            name: '',
            price: '',
            description: '',
            status: '',
            category_name: '',
            subcategory_name: '',
            sizes: [], // Sizes will include both name and category
        },
        images: [],
        colors: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            console.log("Fetching product details for ID:", productId);
            try {
                const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
                console.log("Fetched Product Data:", response.data);

                // Update the product state mapping based on the API response
                setDetails({
                    product: {
                        id: response.data.product_id,
                        name: response.data.name,
                        price: response.data.price,
                        description: response.data.description,
                        status: response.data.status,
                        category_name: response.data.category,
                        subcategory_name: response.data.subcategory,
                        sizes: response.data.sizes || [], // Sizes will be an array
                    },
                    images: response.data.images || [], // Images will be an array
                    colors: response.data.colors || [] // Colors will be an array
                });
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchDetails();
        }
    }, [productId]);

    return { details, loading, error };
};

export default useProductDetails;
