import { RiHeartFill, RiHeartLine } from '@remixicon/react';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const add = async (token, id) => {
    try {
        const response = await fetch('http://localhost:8000/user/update/wishlist', {
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

export default function HeartButtonProducts({setMainUser}) {
    const [cookies] = useCookies(['prodtoken', 'token']);

    const isPresentInWishlist = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && user.wishlist !== undefined) {
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
        const data = await add(cookies.token, cookies.prodtoken);
        if(data.user) {
            setMainUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            console.log('error adding the product to wishlist');
        }
    }

    return (
        <>
            {isPresentInWishlist() ?
            (
                <button onClick={addProductToWishlist} className="p-2 bg-white text-zinc-400 rounded-full border border-zinc-400"><RiHeartLine size={25} /></button>
            ) : (
                <button className="p-2 bg-white rounded-full text-red-500 border border-zinc-200"><RiHeartFill size={25}/></button>
            )}
        </>
    );
}
