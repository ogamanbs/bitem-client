import React,{useState, useEffect} from 'react';
import Head from '../../Components/Head';
import Menu from '../../Components/Menu';
import Products from '../../Components/Products';
import LogoutUser from '../../Components/LogoutUser';
import MenuSmall from '../../Components/MenuSmall';
import { RiHeartFill, RiSearchLine, RiShoppingCart2Line } from '@remixicon/react';
import {useCookies} from 'react-cookie';

const getProducts = async () => {
    try {
        const response = await fetch('https://server.bitem.in/products/all');
        // const response = await fetch('http://localhost:8000/products/all');
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch(err) {
        return {
            message: 'error fetching products',
            products: null
        };
    }
}

export default function Shop({user, setUser}) {
    const [products, setProducts] = useState(null);
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        const callAPI = async () => {
            const data = await getProducts();
            setProducts(data.products);
        }
        if(cookies.token) {
            callAPI();
        }
    },[cookies]);

    return (
        <>
            <div className="w-full min-h-[90vh]">
                <div className="fixed md:static h-[8vh] md:[10vh] w-full flex items-center justify-between px-5 md:px-10 border-b border-zinc-200 bg-white md:border-0">
                    <Head />
                    <div className="flex items-center gap-5">
                        <button className="cursor-pointer text-red-500"><RiHeartFill size={25} /></button>
                        <button className="cursor-pointer"><RiShoppingCart2Line size={25} /></button>
                        <LogoutUser setUser={setUser} />
                    </div>
                </div>
                <div className="h-[90vh] flex flex-col md:flex-row w-full">
                    <div className="hidden md:block">
                        <Menu user={user} />
                    </div>
                    <div className="block  md:hidden">
                        <MenuSmall user={user} />
                    </div>
                    <div className="h-full w-full md:w-[calc(80vw)] mt-[15vh] md:mt-0">
                        <div className="hidden h-[7vh] w-full md:flex items-center z-[10] mb-5 bg-white">
                            <div className="w-full flex items-center justify-center">
                                <input
                                        type="text"
                                        name="search"
                                        placeholder={"search"}
                                        autoComplete={"off"}
                                        className="w-[40%] px-5 py-1 text-sm h-10 rounded-full bg-zinc-100 outline-none placeholder:text-zinc-700"
                                />
                                <div className="text-blue-400 p-2 rounded-full cursor-pointer"><RiSearchLine /></div>
                            </div>
                        </div>
                        <div className="w-full h-[85vh] md:h-[82vh] overflow-scroll">
                            <Products products={products} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
