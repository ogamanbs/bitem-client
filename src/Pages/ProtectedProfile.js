import { useParams } from 'react-router-dom';
import PageNotFound from './404PageNotFound/PageNotFound';

export default function ProtectedProfile({element, user}) {
    const { id } = useParams();
    const name = user?.name.toLowerCase().replace(" ", "_");

    if(name !== id) {
        return <PageNotFound />
    } else {
        return element;
    }
}