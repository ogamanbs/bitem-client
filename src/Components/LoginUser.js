import React, { useState, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom';

async function loginUser(user) {
    const res = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        return { message: 'login failed' };
    }
}

export default function LoginUser() {

    const navigate = useNavigate();
    const [,setCookie] = useCookies(['token']);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const formRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        if(email !== "" && email !== " " && email[0] !== " " && email[email.length-1] !== " " && password !== "" && password !== " " && password[0] !== " " && password[password.length-1] !== " "){
            const user = {
                email: email,
                password: password
            };
            const res = await loginUser(user);
            if (res) {
                setResponse(res.message);
                if (res.message === 'successful login') {
                    setCookie('token', res.info, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
                    navigate('/shop');
                } else {
                    setEmail('');
                    setPassword('');
                    formRef.current.reset();
                }
            } else {
                setEmail('');
                setPassword('');
                formRef.current.reset();
            }
        } else {
            formRef.current.reset();
        }
    }

    useEffect(() => {
        if (response) {
            const timer = setTimeout(() => {
                setResponse('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [response]);

    return (
        <div className="w-full md:w-1/3 h-screen md:h-full flex flex-col justify-center gap-3 text-sm p-5">
            <div className=''>
                <h1 className="block md:hidden text-2xl font-bold">welcome to <span className="text-blue-400">Bitem</span></h1>
                <h1 className="text-xl font-medium">Login your account</h1>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-2">
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    autoComplete="off"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border border-zinc-700 rounded-full py-2 px-5 outline-none bg-transparent"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    autoComplete="off"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border border-zinc-700 rounded-full py-2 px-5 outline-none bg-transparent"
                />
                <div className="mt-3">
                    <input
                        type="submit"
                        value="login"
                        className="w-full rounded-full py-2 px-5 outline-none bg-blue-500 text-white capitalize cursor-pointer"
                    />
                </div>
            </form>
            {response && (
                <div className={`text-sm text-center ${response === 'successful login' ? 'text-green-700' : 'text-red-500'}`}>
                    {response}
                </div>
            )}
        </div>
    );
}
