import React, { useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Shop from './Pages/Shop/Shop';
import { useCookies } from 'react-cookie';
import Profile from './Pages/Profile/Profile';
import ProtectedRoutes from './Pages/ProtectedRoutes';

export default function App () {
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