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

export default function AddToWishListSmall({product, user, setUser}) {
    const [cookies] = useCookies(['token']);
    const [isUpdating, setIsUpdating] = useState(false);

    const isPresentInWishlist = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && user.wishlist) {
            for(let i = 0; i<user.wishlist.length; i++) {
                if(user.wishlist[i].item === product._id) {
                    return true;
                }
            }
        }
        return false;
    }

    const addProductToWishlist = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        const data = await add(cookies.token, product._id);
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
        const data = await remove(cookies.token, product._id);
        if(data.user) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            console.log('error adding the product to wishlist');
        }
        setIsUpdating(false);
    }

    return (
        <>
            {isPresentInWishlist() ? (
                <button
                onClick={removeProductFromWishlist}
                disabled={isUpdating}
                className="w-full px-3 py-2 border border-red-500 text-red-500 font-bold rounded-full"
                >
                    Remove from wishlist
                </button>
            ):(
                <button
                onClick={addProductToWishlist}
                disabled={isUpdating}
                className="w-full px-3 py-2 bg-red-500 text-white font-bold rounded-full"
                >
                    Add to wishlist
                </button>
            )}
        </>
    );
}