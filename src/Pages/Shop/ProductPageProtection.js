import {useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import PageNotFound from './PageNotFound';

export default function ProductPageProtection({element, products}) {
    const { id } = useParams();
    const [cookies] = useCookies(['prodtoken']);
    if(products) {
        if(cookies.prodtoken === undefined) {
            return <PageNotFound />;
        } else {
            const isProductPresent = products.filter((product) => {
                return id.replace(/_/g, " ") === product.name.toLowerCase();
            });
            if(isProductPresent.length === 0) {
                return <PageNotFound />
            } else {
                return element;
            }
        }
    }
}
