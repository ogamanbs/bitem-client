import { RiHeartFill, RiHeartLine } from '@remixicon/react';
import React, { useState } from 'react'

export default function HeartButtonSmallProducts() {
    const [wish, setWish] = useState(false);
    const handleWish = () => {
        setWish(true);
    }
    const handleUnWish = () => {
        setWish(false);
    }
    return (
        <>
            {wish ?
            (
                <button onClick={handleUnWish} className=" text-red-500 "><RiHeartFill size={25} /></button>
            ) : (
                <button onClick={handleWish} className="font-light text-zinc-400"><RiHeartLine size={25} /></button>
            )}
        </>
    );
}
