import React from 'react';
import {useCookies} from 'react-cookie';
import {
    RiLogoutBoxRLine
} from '@remixicon/react';

export default function LogoutUser() {

    const [, ,removeCookie] = useCookies(['token']);

    function handleClick(){
        removeCookie('token',{path:'/'});
    }

    return (
        <div className="flex items-center">
            <button onClick={handleClick} className="hidden md:block px-5 py-2 text-sm rounded-full text-white bg-red-500">logout</button>
            <button onClick={handleClick} className="block md:hidden px-3 py-2 text-xl rounded-full text-red-500"><RiLogoutBoxRLine /></button>
        </div>
    )
}
