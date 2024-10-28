import React from 'react';
import {useCookies} from 'react-cookie';
import {
    RiLogoutBoxRLine
} from '@remixicon/react';
import {useNavigate} from 'react-router-dom';

export default function LogoutUser({setUser}) {

    const [,,removeCookie] = useCookies(['token']);
    const navigate = useNavigate();

    function handleClick(){
        localStorage.setItem('user', null);
        setUser(null);
        removeCookie('token',{path:'/'});
        navigate('/');
    }

    return (
        <div className="flex items-center">
            <button onClick={handleClick} className="hidden md:block px-5 py-2 text-sm rounded-full text-white bg-red-500">logout</button>
            <button onClick={handleClick} className="block md:hidden py-2 text-xl rounded-full text-red-500"><RiLogoutBoxRLine size={20}/></button>
        </div>
    )
}
