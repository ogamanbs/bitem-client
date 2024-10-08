import { RiEye2Line, RiEyeCloseLine } from '@remixicon/react';
import React, { useState, useRef} from 'react';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom';

async function loginUser(user) {
    try {
        const res = await fetch('https://server.bitem.in/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            const data = await res.json();
            return data;
        }
    } catch(err) {
        const data = { message: 'login failed' }
        return data;
    }
}

async function fetchProducts() {
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
        const data = { message: 'failed to fetch prodcuts' };
        return data;
    }
}

export default function LoginUser({setMessages, messages, setProducts, setUser, setLoad}) {
    const navigate = useNavigate();
    const [,setCookie] = useCookies(['token']);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const formRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoad(200);
        if(email !== "" && email !== " " && email[0] !== " " && email[email.length-1] !== " " && password !== "" && password !== " " && password[0] !== " " && password[password.length-1] !== " ") {
            const user = {
                email: email,
                password: password
            };
            const res = await loginUser(user);
            setEmail('');
            setPassword('');
            formRef.current.reset();
            if (res) {
                setLoad(100);
                setMessages([...messages, res.message]);
                if (res.message === 'successful login') {
                    const data = await fetchProducts();
                    if(data.products) {
                        localStorage.setItem('products', JSON.stringify(data.products));
                        setProducts(data.products);
                        setCookie('token', res.user._id , { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
                        localStorage.setItem('user', JSON.stringify(res.user));
                        setUser(res.user);
                        navigate('/shop', {replace: true});
                    } else {
                        localStorage.setItem('products', null);
                    }
                } else {
                    setEmail('');
                    setPassword('');
                    localStorage.setItem('user', null);
                    localStorage.setItem('products', null);
                    formRef.current.reset();
                }
            } else {
                setEmail('');
                setPassword('');
                localStorage.setItem('user', null);
                localStorage.setItem('products', null);
                formRef.current.reset();
                setLoad(100);
            }
        } else {
            formRef.current.reset();
            setLoad(100);
            setMessages([...messages, "empty fields not allowed"]);
        }
    }

    const handleShow = () => {
        setShow(!show);
    }

    return (
        <div className="w-full md:w-1/3 h-auto md:h-full flex flex-col justify-center gap-3 text-sm p-10">
            <div className=''>
                <h1 className="block md:hidden text-2xl font-bold">welcome to <span className="text-blue-400">Bitem</span></h1>
                <h1 className="text-xl font-medium">Login to your account</h1>
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
                <div className="w-full flex items-center gap-2 border border-zinc-700 rounded-full">
                    <input
                        type={show ? 'text' : 'password'}
                        name="password"
                        placeholder="password"
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-full px-5 py-2 outline-none bg-transparent"
                    />
                    <div onClick={handleShow} className="py-2 px-3 cursor-pointer">
                        { show ? <RiEye2Line size={20} /> : <RiEyeCloseLine size={20} /> }
                    </div>
                </div>
                <div className="mt-3">
                    <input
                        type="submit"
                        value="login"
                        className="w-full rounded-full py-2 px-5 outline-none bg-blue-500 text-white capitalize cursor-pointer"
                    />
                </div>
            </form>
        </div>
    );
}
