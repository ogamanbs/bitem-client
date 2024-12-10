import React from 'react';
import {useCookies} from 'react-cookie';
import {
    RiLogoutBoxRLine
} from '@remixicon/react';
import {useNavigate} from 'react-router-dom';

export default function LogoutUser({setUser}) {

    const [,,removeCookie] = useCookies(['token', 'prodtoken']);
    const navigate = useNavigate();

    function handleClick(){
        localStorage.setItem('user', null);
        setUser(null);
        removeCookie('token', {path:'/'});
        removeCookie('prodtoken', {path:'/'});
        navigate('/');
    }

    return (
        <div className="flex items-center">
            <button onClick={handleClick} className="hidden md:block px-5 py-2 text-xs rounded-full text-white font-semibold bg-red-500">logout</button>
            <button onClick={handleClick} className="block md:hidden py-2 text-xl rounded-full text-red-500"><RiLogoutBoxRLine size={25}/></button>
        </div>
    )
}
