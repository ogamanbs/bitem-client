import React from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export default function ProtectedProfile({element}) {
    const { id } = useParams();
    console.log(id);
    const cached_user = localStorage.getItem('user');
    const user = cached_user !== null ? JSON.parse(cached_user) : null;
    const [cookies] = useCookies(['token']);

    if(!cookies.token || !user) {
        return <Navigate to={"/"} />;
    }

    const name = user?.name.toLowerCase().replace(" ", "_");
    return  name === id ? element : <Navigate to={'/shop'} />
}
