import React from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export default function ProtectedRoutes({element}) {
    const { id } = useParams();
    const cached_user = localStorage.getItem('user');
    const user = JSON.parse(cached_user);
    const [cookies] = useCookies(['token']);
    if(!cookies.token || !user) {
        return <Navigate to={"/"} />;
    }
    const name = user.name?.toLowerCase().replace(" ", "-");
    return  name === id ? element : <Navigate to={'/shop'} />
}
