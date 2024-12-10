import React,{useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Head from '../../Components/Head';
import LogoutUser from '../../Components/LogoutUser';
import { RiArrowLeftLine, RiHeartFill, RiStore2Line } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';
import TruckLoader from '../../Components/TruckLoader';
import RemoveFromCartItems from '../../Components/CartPageComponents/RemoveFromCartItems';

const getCartItems= async (id) => {
    try {
        // const response = await fetch('http://localhost:8000/user/cart-items', {
        const response = await fetch('https://server.bitem.in/user/cart-items', {
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

export default function CartPage({user, setUser}) {
    const [cookies] = useCookies(['token']);
    const [cartItems, setCartItems] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [productBeingUpdated, setProductBeingUpdated] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const callAPI = async () => {
            const data = await getCartItems(cookies.token);
            if(data.cartItems) {
                setCartItems(data.cartItems);
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

    const navigateToWishlistPage = (e) => {
        e.preventDefault();
        navigate(`/${user?.name.replace(/ /g, '_')}/wishlist`);
    }

    const navigateBack = () => {
        navigate(-1);
    }

    return (
        <div className="w-full h-[90vh] md:h-[100vh]">
            <div className="fixed h-[8vh] md:[10vh] w-full flex items-center justify-between px-5 md:px-10 border-b border-zinc-200 bg-white md:border-0 z-10">
                <Head />
                <div className="flex items-center gap-5">
                    <button onClick={navigateToShop} className="cursor-pointer"><RiStore2Line size={22} /></button>
                    <button onClick={navigateToWishlistPage} className="cursor-pointer text-red-500"><RiHeartFill size={25} /></button>
                    <div className="flex items-center">
                        <button onClick={checkRoute} className="h-8 w-8 rounded-full overflow-hidden bg-zinc-200">
                            {user && <img className="" src={user.image} alt={user.name}/>}
                        </button>
                    </div>
                    <LogoutUser setUser={setUser} />
                </div>
            </div>
            <div className="h-[8vh] bg-transparent w-full"></div>
            <div className="h-[82vh] w-full flex justify-center">
                <div className='h-[82vh] w-full md:w-1/2'>
                <div className="flex items-center text-zinc-600 px-5 pt-5 gap-5">
                        <button onClick={navigateBack} className="text-blue-500"><RiArrowLeftLine/></button>
                        <h1 className="text-3xl font-bold ">Cart</h1>
                    </div>
                    {cartItems !== null && cartItems.length === 0 &&  <div className="h-auto w-full flex flex-col gap-5 mt-5 px-5">
                        <div className=" border border-zinc-200 p-5 rounded-lg">
                            <h1 className="text-center">Your Cart is EMPTY!!!</h1>
                        </div>
                        </div>}
                    {!cartItems &&
                        <div className="h-1/3 w-full flex items-center justify-center mt-10">
                            <TruckLoader />
                        </div>
                    }
                    {cartItems && cartItems.length > 0 &&
                        <div className="w-full h-[73vh] overflow-scroll flex flex-col gap-5 mt-5 px-5 pb-5">
                            {cartItems.map((product) => (
                                <div key={product.item._id} className="relative h-auto w-full border border-zinc-200 p-5 rounded-lg">
                                    <div  className="flex flex-col md:flex-row gap-10">
                                        <div className="h-[30vh] md:h-20 w-full md:w-auto flex justify-center">
                                            <div className=" w-[30vh] md:min-w-20 md:max-w-20 h-full rounded-lg cursor-pointer overflow-hidden">
                                                <img className={`w-full h-full object-contain ${isUpdating && productBeingUpdated.includes(product.item._id) ? 'grayscale' : 'grayscale-0'} `} src={product.item.images[0]} alt={product.item.name} />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col">
                                            <h1 className="hover:text-blue-500 text-base cursor-pointer text-black">{product.item.name}</h1>
                                            <h1 className='text-xs text-zinc-500'>Added to Cart on {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(product.dateAdded).getDay()] + ' ' + new Date(product.dateAdded).getDate() + '-' + (new Date(product.dateAdded).getMonth() + 1) + '-' + new Date(product.dateAdded).getFullYear()}</h1>
                                            <div className="flex gap-3 items-start mt-3">
                                                <h1 className="text-2xl font-bold">₹ {product.item.price * ((100 - product.item.discount) / 100)}</h1>
                                                <h1 className="line-through text-zinc-600 text-sm mt-1">₹ {product.item.price}</h1>
                                                <h1 className="text-green-700 text-sm font-bold mt-1">{product.item.discount}% off</h1>
                                            </div>
                                        </div>
                                        <div className="hidden md:block text-zinc-400">
                                            {!productBeingUpdated.includes(product.item._id)  && <RemoveFromCartItems user={user} id={product.item._id} setUser={setUser} isUpdating={isUpdating} setIsUpdating={setIsUpdating} productBeingUpdated={productBeingUpdated} setProductBeingUpdated={setProductBeingUpdated} />}
                                        </div>
                                        {!productBeingUpdated.includes(product.item._id)  && <div className="absolute right-0 md:hidden text-zinc-400 flex items-center justify-center p-4 -translate-y-5 rounded-lg border border-zinc-200">
                                            <RemoveFromCartItems user={user} id={product.item._id} setUser={setUser} isUpdating={isUpdating} setIsUpdating={setIsUpdating} productBeingUpdated={productBeingUpdated} setProductBeingUpdated={setProductBeingUpdated} />
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
