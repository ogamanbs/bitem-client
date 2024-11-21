import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import PageNotFound from './PageNotFound';

export default function ProductPageProtection({ element, products }) {
    const { id } = useParams();
    const [, setCookie] = useCookies(['prodtoken']);

    useEffect(() => {
        if (products) {
            const isProductPresent = products.filter((product) => {
                return id.replace(/_/g, " ") === product.name.toLowerCase();
            });

            if (isProductPresent.length === 0) {
                // If product is not found, return PageNotFound
                return <PageNotFound />;
            } else {
                // Set the cookie when the product is found
                setCookie('prodtoken', isProductPresent[0]._id, { 
                    path: '/', 
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
                });
            }
        }
    }, [id, products, setCookie]);

    // Continue rendering the element if product is found
    return products ? element : null;
}