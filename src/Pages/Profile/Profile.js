import React from 'react'
import Head from '../../Components/Head'
import LogoutUser from '../../Components/LogoutUser'
import { RiHeartFill, RiShoppingCart2Line } from '@remixicon/react'

export default function Profile({user, setUser, setProducts}) {
    return (
        <>
            <div className="w-full min-h-[90vh]">
                <div className="fixed md:static h-[8vh] md:[10vh] w-full flex items-center justify-between px-5 md:px-10 border-b border-zinc-200 bg-white md:border-0">
                    <a href="/shop"><Head /></a>
                    <div className="flex items-center gap-5">
                        <button className="cursor-pointer text-red-500"><RiHeartFill /></button>
                        <button className="cursor-pointer"><RiShoppingCart2Line /></button>
                        <LogoutUser setUser={setUser} setProducts={setProducts} />
                    </div>
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
