import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Head from '../../Components/Head';
import Menu from '../../Components/Menu';
import Products from '../../Components/Products';
import LogoutUser from '../../Components/LogoutUser';

async function validate(info) {
    const res = await fetch('http://localhost:8000/user/validate', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({info})
    });
    if (!res.ok) {
        return { message: 'error validating user' };
    } else {
        const data = await res.json();
        return data;
    }
}

export default function Shop() {
    const [, setUser] = useState("");
    const [cookies, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if(cookies.token) {
                const info = cookies.token;
                const res = await validate(info);
                if (res.message === 'user validated') {
                    setUser(res.user);
                } else {
                    removeCookie('token');
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        }
        fetchData();
    }, [cookies, removeCookie, navigate]);

    return (
        <div className="fixed w-full h-[calc(100vh-72.9px)]">
            <div className="flex items-center justify-between px-10">
                <Head />
                <LogoutUser />
            </div>
            <div className="fixed w-full h-full">
                <Menu />
                <Products />
            </div>
        </div>
    );
}
