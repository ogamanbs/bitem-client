import { RiHeartFill, RiHeartLine } from '@remixicon/react';
import React, {useState} from 'react';
import {useCookies} from 'react-cookie';

const add = async (token, id) => {
    try {
        // const response = await fetch('http://localhost:8000/user/update/wishlist/add', {
        const response = await fetch('https://server.bitem.in/user/update/wishlist/add', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ token, id })
        });
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch(err) {
        return {user: null, message: "error updating wishlist"}
    }
}

const remove = async (token, id) => {
    try {
        // const response = await fetch('http://localhost:8000/user/update/wishlist/remove', {
        const response = await fetch('https://server.bitem.in/user/update/wishlist/remove', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ token, id })
        });
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch(err) {
        return {user: null, message: "error updating wishlist"}
    }
}

export default function AddToWishList({user, setUser}) {
    const [cookies] = useCookies(['prodtoken', 'token']);
    const [isUpdating, setIsUpdating] = useState(false);

    const isPresentInWishlist = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && user.wishlist) {
            for(let i = 0; i<user.wishlist.length; i++) {
                if(user.wishlist[i].item === cookies.prodtoken) {
                    return true;
                }
            }
        }
        return false;
    }

    const addProductToWishlist = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        const data = await add(cookies.token, cookies.prodtoken);
        if(data.user) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            console.log('error adding the product to wishlist');
        }
        setIsUpdating(false);
    }

    const removeProductFromWishlist = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        const data = await remove(cookies.token, cookies.prodtoken);
        if(data.user) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            console.log('error adding the product to wishlist');
        }
        setIsUpdating(false);
    }

    return (
        <div className="absolute h-10 w-full px-5 py-3">
            {isPresentInWishlist() ? (
                <button
                onClick={removeProductFromWishlist}
                disabled={isUpdating}
                className="h-10 w-10 float-right rounded-full border border-zinc-200 text-red-500 flex items-center justify-center bg-white cursor-pointer"
                >
                    <RiHeartFill />
                </button>
            ):(
                <button
                onClick={addProductToWishlist}
                disabled={isUpdating}
                className="h-10 w-10 float-right rounded-full border border-zinc-400 text-zinc-400 flex items-center justify-center bg-white cursor-pointer"
                ><RiHeartLine />
                </button>
            )}
        </div>
    );
}