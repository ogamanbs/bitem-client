import React,{useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Shop from './Shop';
import {useCookies} from 'react-cookie';
import ProductPage from './ProductPage';
import LogoutUser from '../../Components/LogoutUser';
import Head from '../../Components/Head';
import { RiHeartFill, RiShoppingCart2Line } from '@remixicon/react';
import {useNavigate} from 'react-router-dom';
import ProductPageProtection from './ProductPageProtection';

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
    const navigate = useNavigate();

    useEffect(() => {
        const callAPI = async () => {
            const data = await getProducts();
            setProducts(data.products);
        }
        if(cookies.token) {
            callAPI();
        }
    },[cookies]);

    const checkRoute = async () => {
        navigate(`/${user?.name.replace(/ /g, '_')}`);
    }

    return (
        <div className="w-full h-auto md:h-[100vh]">
            <div className="fixed h-[8vh] md:[10vh] w-full flex items-center justify-between px-5 md:px-10 border-b border-zinc-200 bg-white md:border-0 z-10">
                <Head />
                <div className="flex items-center gap-5">
                    <div className="">
                        <button onClick={checkRoute} className="h-8 w-8 rounded-full overflow-hidden bg-zinc-200">
                            {user && <img className="" src={user.image} alt={user.name}/>}
                        </button>
                    </div>
                    <button className="cursor-pointer text-red-500"><RiHeartFill size={30} /></button>
                    <button className="cursor-pointer"><RiShoppingCart2Line size={27} /></button>
                    <LogoutUser setUser={setUser} />
                </div>
            </div>
            <div className="h-[8vh] bg-transparent w-full"></div>
            <Routes>
                <Route
                    path={'/'}
                    element={<Shop user={user} setUser={setUser} products={products} setProducts={setProducts} />}
                />
                <Route
                    path={'/:id'}
                    element={<ProductPageProtection element={<ProductPage setUser={setUser} user={user} />} products={products} />}
                />
            </Routes>
        </div>
    );
}