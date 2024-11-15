import React,{useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Head from '../../Components/Head';
import LogoutUser from '../../Components/LogoutUser';
import { RiShoppingCart2Line, RiStore2Line } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';
import RemoveFromWishlist from '../../Components/WishlistPageComponents/RemoveFromWishlist';

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
    const [isUpdating, setIsUpdating] = useState(false);
    const [productBeingUpdated, setProductBeingUpdated] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const callAPI = async () => {
            const data = await getWishlist(cookies.token);
            if(data.wishlist) {
                setWishlist(data.wishlist);
            }
        }
        callAPI();
    }, [cookies.token, user]);

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
            <div className="h-[92vh] w-full flex justify-center">
                <div className='h-[92vh] w-full md:w-1/2'>
                    <h1 className="text-3xl font-bold text-zinc-600 px-5 pt-5">My Wishlist</h1>
                    {wishlist !== null && wishlist.length === 0 &&  <div className="h-auto w-full flex flex-col gap-5 mt-5 px-5">
                        <div className=" border border-zinc-200 p-5 rounded-lg">
                            <h1 className="text-center">Your Wishlist is EMPTY!!!</h1>
                        </div>
                        </div>}
                    {!wishlist && <h1 className="mt-5 text-center">Loading...</h1>}
                    {wishlist && wishlist.length > 0 &&
                        <div className="w-full h-[80vh] overflow-scroll flex flex-col gap-5 mt-5 px-5">
                            {wishlist.map((product) => (
                                <div key={product.item._id} className="relative h-auto w-full border border-zinc-200 p-5 rounded-lg">
                                    <div  className="flex flex-col md:flex-row gap-10">
                                        <div className="h-[30vh] md:h-20 w-full md:w-auto flex justify-center">
                                            <div className=" w-[30vh] md:min-w-20 md:max-w-20 h-full rounded-lg cursor-pointer overflow-hidden">
                                                <img className={`w-full h-full object-contain ${isUpdating && productBeingUpdated === product.item._id ? 'grayscale' : 'grayscale-0'} `} src={product.item.images[0]} alt={product.item.name} />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col">
                                            <h1 className="hover:text-blue-500 text-base cursor-pointer text-black">{product.item.name}</h1>
                                            <h1 className='text-xs text-zinc-500'>Added to wishlist on {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(product.dateAdded).getDay()] + ' ' + new Date(product.dateAdded).getDate() + '-' + (new Date(product.dateAdded).getMonth() + 1) + '-' + new Date(product.dateAdded).getFullYear()}</h1>
                                            <div className="flex gap-3 items-start mt-3">
                                                <h1 className="text-2xl font-bold">₹ {product.item.price * ((100 - product.item.discount) / 100)}</h1>
                                                <h1 className="line-through text-zinc-600 text-sm mt-1">₹ {product.item.price}</h1>
                                                <h1 className="text-green-700 text-sm font-bold mt-1">{product.item.discount}% off</h1>
                                            </div>
                                        </div>
                                        <div className="hidden md:block text-zinc-400">
                                            {productBeingUpdated !== product.item._id && <RemoveFromWishlist user={user} id={product.item._id} setUser={setUser} isUpdating={isUpdating} setIsUpdating={setIsUpdating} productBeingUpdated={productBeingUpdated} setProductBeingUpdated={setProductBeingUpdated} />}
                                        </div>
                                        {productBeingUpdated !== product.item._id &&<div className="absolute right-0 md:hidden text-zinc-400 flex items-center justify-center p-4 -translate-y-5 rounded-lg border border-zinc-200">
                                             <RemoveFromWishlist user={user} id={product.item._id} setUser={setUser} isUpdating={isUpdating} setIsUpdating={setIsUpdating} productBeingUpdated={productBeingUpdated} setProductBeingUpdated={setProductBeingUpdated} />
                                        </div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
