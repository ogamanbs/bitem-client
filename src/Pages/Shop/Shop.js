import React,{useState, useEffect} from 'react';
import Menu from '../../Components/Menu';
import Products from '../../Components/Products';
import MenuSmall from '../../Components/MenuSmall';
import { RiSearchLine} from '@remixicon/react';
import {useCookies} from 'react-cookie';

export default function Shop({user, setUser, products, setProducts}) {
    const [search, setSearch] = useState("");
    const [cookies,,removeCookie] = useCookies(['prodtoken']);

    useEffect(() => {
        if(cookies.prodtoken) {
            removeCookie('prodtoken',{path:'/shop'});
        }
    }, [cookies, removeCookie]);

    return (
        <div className="h-[90vh] flex flex-col md:flex-row w-full">
            <div className="hidden md:block">
                <Menu />
            </div>
            <div className="block  md:hidden">
                <MenuSmall search={search} setSearch={setSearch} />
            </div>
            <div className="h-full w-full md:w-[calc(80vw)] mt-[15vh] md:mt-0">
                <div className="hidden h-[7vh] w-full md:flex items-center z-[10] mb-5 bg-white">
                    <div className="w-full flex items-center justify-center">
                        <input
                                type="text"
                                name="search"
                                placeholder={"search"}
                                autoComplete={"off"}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-[40%] px-5 py-1 text-sm h-10 rounded-full bg-zinc-100 outline-none placeholder:text-zinc-700"
                        />
                        <div className="text-blue-400 p-2 rounded-full cursor-pointer"><RiSearchLine /></div>
                    </div>
                </div>
                <div className="w-full h-[85vh] md:h-[82vh] overflow-scroll">
                    <Products products={products} search={search} />
                </div>
            </div>
        </div>
    );
}
