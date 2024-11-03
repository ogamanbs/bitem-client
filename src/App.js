import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { useCookies } from 'react-cookie';
import Profile from './Pages/Profile/Profile';
import ProtectedProfile from './Pages/ProtectedProfile';
import ShopApp from './Pages/Shop/ShopApp';

export default function App() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser !== null ? JSON.parse(savedUser) : null;
    });

    const [, setMessage] = useState("");
    const [cookies] = useCookies(['token']);

    return(
        <div className="">
            <Routes>
                <Route
                    path="/"
                    element={ <Home setUser={setUser} setMessage={setMessage}/> }
                />
                <Route
                    exact
                    path="/shop/*"
                    element={ cookies.token !== undefined ? <ShopApp user={user} setUser={setUser} /> : <Navigate to={"/"} replace /> }
                />
                <Route
                    exact
                    path="/:id"
                    element={ cookies.token !== undefined ? <ProtectedProfile element = {<Profile user={user} setUser={setUser} />} /> : <Navigate to="/" replace /> }
                />
            </Routes>
        </div>
    );
}