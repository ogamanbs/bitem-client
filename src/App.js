import React, { useState, useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Shop from './Pages/Shop/Shop';
import { useCookies } from 'react-cookie';
import Profile from './Pages/Profile/Profile';
import ProtectedRoutes from './Pages/ProtectedRoutes';

const getProducts = async () => {
    try {
        const response = await fetch('https://server.bitem.in/products/all');
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch(err) {
        return {message: 'error fetching products', products: null};
    }
}

export default function App() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser !== null ? JSON.parse(savedUser) : null;
    });
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        return savedProducts !== null ? JSON.parse(savedProducts) : null;
    });
    const [, setMessage] = useState("");
    const [cookies] = useCookies(['token']);

    useEffect(()=>{
        const callAPI = async () => {
            const data_products = await getProducts();
            let cachedProducts = localStorage.getItem('products');
            cachedProducts = JSON.parse(cachedProducts);
            if(data_products.products) {
                if(data_products.products.length !== cachedProducts.length) {
                    localStorage.setItem('products', JSON.stringify(data_products.products));
                    setProducts(data_products.products);
                }
            }
        }
        if(cookies.token) {
            callAPI();
        }
    }, [cookies]);

    return(
        <div className="">
            <Routes>
                <Route
                    path="/"
                    element={ <Home setProducts={setProducts} setUser={setUser} setMessage={setMessage}/> }
                />
                <Route
                    exact
                    path="/shop"
                    element={ cookies.token ? <Shop user={user} products={products} setProducts={setProducts} setUser={setUser} /> : <Navigate to={"/"} replace /> }
                />
                <Route
                    exact
                    path="/:id"
                    element={ cookies.token ? <ProtectedRoutes element = {<Profile user={user} setUser={setUser} setProducts={setProducts} />} /> : <Navigate to="/" replace /> }
                />
            </Routes>
        </div>
    );
}