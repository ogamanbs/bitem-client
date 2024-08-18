import React from 'react';
import Head from '../../Components/Head';
import Menu from '../../Components/Menu';
import Products from '../../Components/Products';
import LogoutUser from '../../Components/LogoutUser';
import MenuSmall from '../../Components/MenuSmall';
import { RiHeartLine, RiShoppingCart2Line } from '@remixicon/react';

export default function Shop({user, products, setProducts, setUser}) {
    return (
        <>
            <div className="w-full min-h-[90vh]">
                <div className="fixed md:static h-[8vh] md:[10vh] w-full flex items-center justify-between px-5 md:px-10 border-b border-zinc-200 bg-white md:border-0">
                    <Head />
                    <div className="flex items-center gap-5">
                        <button className="cursor-pointer"><RiHeartLine /></button>
                        <button className="cursor-pointer"><RiShoppingCart2Line /></button>
                        <LogoutUser setUser={setUser} setProducts={setProducts} />
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
                        <Products products={products} setProduct={setProducts} />
                    </div>
                </div>
            </div>
        </>
    );
}
