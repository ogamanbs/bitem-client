import React,{useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Shop from './Shop';
import {useCookies} from 'react-cookie';
import ProductPage from './ProductPage';
import LogoutUser from '../../Components/LogoutUser';
import Head from '../../Components/Head';
import { RiHeartFill, RiShoppingCart2Line } from '@remixicon/react';

const getProducts = async () => {
    try {
        const response = await fetch('https://server.bitem.in/products/all');
        // const response = await fetch('http://localhost:8000/products/all');
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch(err) {
        return {
            message: 'error fetching products',
            products: null
        };
    }
}

export default function ShopApp({user,setUser}) {
    const [products, setProducts] = useState(null);
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        const callAPI = async () => {
            const data = await getProducts();
            setProducts(data.products);
        }
        if(cookies.token) {
            callAPI();
        }
    },[cookies]);

    return (
        <div className="w-full min-h-[100vh]">
            <div className="fixed md:static h-[8vh] md:[10vh] w-full flex items-center justify-between px-5 md:px-10 border-b border-zinc-200 bg-white md:border-0">
                <Head />
                <div className="flex items-center gap-5">
                    <button className="cursor-pointer text-red-500"><RiHeartFill size={25} /></button>
                    <button className="cursor-pointer"><RiShoppingCart2Line size={25} /></button>
                    <LogoutUser setUser={setUser} />
                </div>
            </div>
            <Routes>
                <Route
                    path={'/'}
                    element={<Shop user={user} setUser={setUser} products={products} setProducts={setProducts} />}
                />
                <Route
                    path={'/:id'}
                    element={<ProductPage />}
                />
            </Routes>
        </div>
    );
}