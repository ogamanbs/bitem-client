import React from 'react';
import {useCookies} from 'react-cookie';

export default function LogoutUser() {

    const [, ,removeCookie] = useCookies(['token']);

    function handleClick(){
        removeCookie('token',{path:'/'});
    }

    return (
        <div className="flex items-center">
            <button onClick={handleClick} className="px-5 py-2 text-sm rounded-full text-white bg-red-500">logout</button>
        </div>
    )
}
