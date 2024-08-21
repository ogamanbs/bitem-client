import React, { useEffect, useState } from 'react';
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
        }
    } catch(err) {
        console.error(err);
    }
}

const getUser = async (token) => {
    try {
        const response = await fetch('https://server.bitem.in/user/get-user', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ info: token })
        });
        if(response.ok) {
            const data = await response.json();
            return data;
        }
    } catch(err) {
        return {message: 'error', user: []};
    }
}

export default function App () {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {};
    });
    const [, setMessage] = useState("");
    const [products, setProducts] = useState([]);
    const [cookies] = useCookies(['token']);

    useEffect(()=>{
        if(cookies.token) {
            const callAPI = async () => {
                const data_user = await getUser(cookies.token);
                let cachedUser = localStorage.getItem('user');
                cachedUser = JSON.parse(cachedUser);
                if(cookies.token && !user){
                    if(cachedUser) {
                        console.log('cachedUser');
                        setUser(cachedUser);
                    } else {
                        console.log('updating the user');
                        setUser(data_user.user);
                        localStorage.setItem('user', JSON.stringify(data_user.user));
                    }
                } else if(!cookies.token){
                    setUser({});
                }
            }
            callAPI();
        }
     // eslint-disable-next-line
    }, [cookies]);

    useEffect(()=> {
        if(user) {
            const callProductsAPI = async () => {
                const data_products = await getProducts();
                setProducts(data_products.products);
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
                <Route
                    exact
                    path="/:id"
                    element={<ProtectedRoutes element = {<Profile user={user} setUser={setUser} setProducts={setProducts} />}/>}
                />
            </Routes>
        </div>
    );
}