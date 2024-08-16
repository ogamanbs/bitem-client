import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Head from '../../Components/Head';
import Menu from '../../Components/Menu';
import Products from '../../Components/Products';
import LogoutUser from '../../Components/LogoutUser';
import MenuSmall from '../../Components/MenuSmall';

async function validate(info) {
    const res = await fetch('https://bitem-server.vercel.app/user/validate', {
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
        <div className="w-full min-h-[90vh]">
            <div className="fixed md:static h-[8vh] md:[10vh] w-full flex items-center justify-between px-2 md:px-10 border-b border-zinc-200 bg-white md:border-0">
                <Head />
                <div className="">
                    <LogoutUser />
                </div>
            </div>
            <div className="h-[90vh] flex flex-col md:flex-row w-full">
                <div className="hidden md:block">
                    <Menu />
                </div>
                <div className="block  md:hidden">
                    <MenuSmall />
                </div>
                <div className="h-full w-full md:w-[calc(80vw)] overflow-scroll mt-[15vh] md:mt-0">
                    <Products />
                </div>
            </div>
        </div>
    );
}
