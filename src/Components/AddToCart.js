import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './AddToCartLoadCircle.css';

const add = async (token, id) => {
    try {
        // const response = await fetch('http://localhost:8000/user/update/cart/add', {
        const response = await fetch('https://server.bitem.in/user/update/cart/add', {
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

export default function AddToCart({product, user, setUser}) {
    const [cookies] = useCookies(['token']);
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();

    const isPresentInCart = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && user.cart) {
            for(let i = 0; i<user.cart.length; i++) {
                if(user.cart[i].item === product._id) {
                    return true;
                }
            }
        }
        return false;
    }

    const addProductToCart = async (e) => {
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
    const navigateToCart = () => {
        navigate(`/${user?.name.replace(/ /g, '_')}/cart`);
    }

    return (
        <>
            {
                !isUpdating ? (
                    isPresentInCart() ? (
                        <button
                        onClick={navigateToCart}
                        className="px-7 py-3 rounded-lg bg-orange-500 text-white font-bold w-full"
                        >
                            Present in Cart
                        </button>
                ):(
                    <button
                    onClick={addProductToCart}
                    disabled={isUpdating}
                    className="px-7 py-3 rounded-lg bg-orange-500 text-white font-bold w-full"
                    >
                        Add to Cart
                    </button>
            )) : (
                <div className="px-7 py-3 rounded-lg bg-orange-500 text-white font-bold w-full flex items-center justify-center">
                    <div className="loaderCircleCart"></div>
                </div>
            )}
        </>
    )
}
