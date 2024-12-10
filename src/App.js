import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { useCookies } from 'react-cookie';
import Profile from './Pages/Profile/Profile';
import ShopApp from './Pages/Shop/ShopApp';
import WishlistPage from './Pages/Profile/WishlistPage';
import PageNotFound from './Pages/404PageNotFound/PageNotFound';
import SignPage from './Pages/SignPage/SignPage';
import CartPage from './Pages/Profile/CartPage';

const getUser = async (id) => {
    try {
        // const response = await fetch('http://localhost:8000/user/get-user', {
        const response = await fetch('https://server.bitem.in/user/get-user', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id})
        });
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch(err) {
        return {messages:"error fetching user", user: null}
    }
}

export default function App() {
    const [user, setUser] = useState(null);
    const [, setMessage] = useState("");
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        const callAPI = async (token) => {
            const data = await getUser(token);
            if(data.user) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        }

        if(cookies.token) {
            callAPI(cookies.token);
        }
    }, [cookies.token]);

    return(
        <div className="">
            <Routes>
                <Route
                    path="/"
                    element={ <Home /> }
                />
                <Route
                    path="/sign"
                    element={ <SignPage setUser={setUser} setMessage={setMessage}/> }
                />
                <Route
                    exact
                    path="/shop/*"
                    element={ cookies.token !== undefined ? <ShopApp user={user} setUser={setUser} /> : <Navigate to={"/"} replace /> }
                />
                <Route
                    exact
                    path={`/${JSON.parse(localStorage.getItem('user'))?.name.replace(/ /g, '_')}`}
                    element={ cookies.token !== undefined ? <Profile user={user} setUser={setUser} /> : <Navigate to="/" replace /> }
                />
                <Route
                    exact
                    path={`/${JSON.parse(localStorage.getItem('user'))?.name.replace(/ /g, '_')}/wishlist`}
                    element={ cookies.token !== undefined ? <WishlistPage user={user} setUser={setUser} /> : <Navigate to="/" replace /> }
                />
                <Route
                    exact
                    path={`/${JSON.parse(localStorage.getItem('user'))?.name.replace(/ /g, '_')}/cart`}
                    element={ cookies.token !== undefined ? <CartPage user={user} setUser={setUser} /> : <Navigate to="/" replace /> }
                />
                <Route
                    exact
                    path={'/:id'}
                    element={ cookies.token !== undefined ? <PageNotFound /> : <Navigate to="/" replace /> }
                />
            </Routes>
        </div>
    );
}