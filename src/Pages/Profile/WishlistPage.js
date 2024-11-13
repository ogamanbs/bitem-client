import React,{useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Head from '../../Components/Head';
import LogoutUser from '../../Components/LogoutUser';
import { RiShoppingCart2Line, RiStore2Line } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';

const getWishlist = async (id) => {
    try {
        // const response = await fetch('http://localhost:8000/user/wishlist', {
        const response = await fetch('https://server.bitem.in/user/wishlist', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id })
        });
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch(err) {
        return {products: [], message: 'error occurred while fetching the wishlist'}
    }
}

export default function WishlistPage({user, setUser}) {
    const [cookies] = useCookies(['token']);
    const [wishlist, setWishlist] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const callAPI = async () => {
            const data = await getWishlist(cookies.token);
            if(data.wishlist) {
                setWishlist(data.wishlist);
            }
        }
        callAPI();
    }, [cookies.token]);

    const checkRoute = async () => {
        navigate(`/${user?.name.replace(/ /g, '_')}`);
    }

    const navigateToShop = () => {
        navigate('/shop');
    }

    return (
        <div className="w-full h-[100vh]">
            <div className="fixed h-[8vh] md:[10vh] w-full flex items-center justify-between px-5 md:px-10 border-b border-zinc-200 bg-white md:border-0 z-10">
                <Head />
                <div className="flex items-center gap-5">
                    <div className="">
                        <button onClick={checkRoute} className="h-8 w-8 rounded-full overflow-hidden bg-zinc-200">
                            {user && <img className="" src={user.image} alt={user.name}/>}
                        </button>
                    </div>
                    <button onClick={navigateToShop} className="cursor-pointer"><RiStore2Line size={25} /></button>
                    <button className="cursor-pointer"><RiShoppingCart2Line size={25} /></button>
                    <LogoutUser setUser={setUser} />
                </div>
            </div>
            <div className="h-[8vh] bg-transparent w-full"></div>
            {wishlist !== null && wishlist.length === 0 && <h1 className="mt-5 text-center">No products in wishlist</h1>}
            {!wishlist && <h1 className="mt-5 text-center">Loading...</h1>}
            {wishlist && wishlist.length > 0 && <div className="h-[92vh] w-full p-10">
                wishlist is not empty
            </div>}
        </div>
    );
}
