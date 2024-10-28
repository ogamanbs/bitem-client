import React from 'react';
import Head from '../../Components/Head';
import LogoutUser from '../../Components/LogoutUser';
import { RiArrowLeftLine, RiHeartFill, RiShoppingCart2Line } from '@remixicon/react';


export default function Profile({user, setUser}) {
    return (
        <>
            <div className="w-full min-h-[90vh]">
                <div className="h-[8vh] md:[10vh] w-full flex items-center justify-between px-5 md:px-10 border-b border-zinc-200 bg-white">
                    <a href="/shop"><Head /></a>
                    <div className="flex items-center gap-5">
                        <button className="cursor-pointer text-red-500"><RiHeartFill size={20}/></button>
                        <button className="cursor-pointer"><RiShoppingCart2Line size={20}/></button>
                        <LogoutUser setUser={setUser} />
                    </div>
                </div>
                <div className="w-full h-10 border-b border-zinc-200 flex items-center px-5 md:px-10">
                    <a href="/shop"><button className="md:hidden flex items-center justify-center px-1 py-1 bg-blue-400 text-white rounded-full font-bold"><RiArrowLeftLine size={20} /></button></a>
                    <a href="/shop"><button className="hidden md:flex items-center justify-center px-5 py-1 bg-blue-400 text-white rounded-full font-bold text-sm">Back to shop</button></a>
                </div>
                <div className="w-full h-[70vh] flex flex-col items-center justify-center">
                    <div className="w-[auto]">
                        <div className="w-64 h-64 rounded-[20px] overflow-hidden">
                            <img className="h-full w-full object-cover" src={user.image} alt={user.name} />
                        </div>
                        <div className="mt-2 flex flex-col items-center">
                            <h1 className="">{user.name}</h1>
                            <h2 className="text-sm font-light">{user.email}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
