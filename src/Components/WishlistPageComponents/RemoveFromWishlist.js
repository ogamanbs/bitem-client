import { RiDeleteBin7Fill } from '@remixicon/react';
import React from 'react';
import { useCookies } from 'react-cookie';

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

export default function RemoveFromWishlist({user, setUser, id, isUpdating, setIsUpdating, productBeingUpdated, setProductBeingUpdated}) {
    const [cookies] = useCookies(['token']);

    const removeProductFromWishlist = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setProductBeingUpdated([...productBeingUpdated , id]);
        const data = await remove(cookies.token, id);
        if(data.user) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            console.log('error adding the product to wishlist');
        }
        if(JSON.stringify(data.user) === JSON.stringify(user)) {
            setProductBeingUpdated(productBeingUpdated.filter((pid) => {return pid === id ? false : true;}));
            if(productBeingUpdated.length === 0) {
                setIsUpdating(false);
            }
        }
    }
    return (
        <button
            onClick={removeProductFromWishlist}
            className=""
        >
                <RiDeleteBin7Fill size={18} />
        </button>
    )
}
