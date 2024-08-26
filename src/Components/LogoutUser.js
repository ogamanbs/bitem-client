import React from 'react';
import {useCookies} from 'react-cookie';
import {
    RiLogoutBoxRLine
} from '@remixicon/react';

export default function LogoutUser({setUser, setProducts}) {

    const [,,removeCookie] = useCookies(['token']);

    function handleClick(){
        localStorage.setItem('user', null);
        localStorage.setItem('products', null);
        setProducts([]);
        setUser();
        removeCookie('token',{path:'/'});
    }

    return (
        <div className="flex items-center">
            <button onClick={handleClick} className="hidden md:block px-5 py-2 text-sm rounded-full text-white bg-red-500">logout</button>
            <button onClick={handleClick} className="block md:hidden py-2 text-xl rounded-full text-red-500"><RiLogoutBoxRLine /></button>
        </div>
    )
}
