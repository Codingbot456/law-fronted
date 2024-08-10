import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductDetails = (productId) => {
    const [details, setDetails] = useState({
        images: [],
        product: {
            id: '',
            name: '',
            price: '',
            description: '',
            category_name: '',
            subcategory_name: '',
            sub_subcategory_name: '',
            timeline_name: '',
            brand_name: '',
            color_name: '',
            material_name: '',
            sizes: [] // Sizes are now included as labels
        },
        colors: [] // Initialize colors here
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            console.log("Fetching product details for ID:", productId);
            try {
                const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
                console.log("Fetched Product Data:", response.data);

                setDetails({
                    product: {
                        ...response.data.product,
                        sizes: response.data.sizes || [] // Ensure sizes are handled properly
                    },
                    images: response.data.images || [],
                    colors: response.data.colors || [] // Handle colors properly
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
