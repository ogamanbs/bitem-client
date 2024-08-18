import React, { useEffect, useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Shop from './Pages/Shop/Shop';

const getProducts = async () => {
    try {
        const response = await fetch('https://bitem-server.vercel.app/products/all');
        if(response.ok) {
            const data = await response.json();
            return data;
        }
    } catch(err) {
        console.error(err);
    }
}

export default function App () {
    const [user, setUser] = useState({});
    const [, setMessage] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        if(user) {
            const callProductsAPI = async () => {
                const data = await getProducts();
                setProducts(data.products);
            }
            callProductsAPI();
        }
    }, [user]);

    return(
        <div className="">
            <Routes>
                <Route
                    path="/"
                    element={ <Home setUser={setUser} setMessage={setMessage} /> }
                />
                <Route
                    exact
                    path="/shop"
                    element={ user ? <Shop user={user} products={products} setProducts={setProducts} setUser={setUser} /> : <Navigate to={"/"} /> }
                />
            </Routes>
        </div>
    );
}