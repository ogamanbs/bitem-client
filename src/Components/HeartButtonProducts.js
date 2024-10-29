import { RiHeartFill, RiHeartLine } from '@remixicon/react';
import React, { useState } from 'react'

export default function HeartButtonProducts() {
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
                <button onClick={handleUnWish} className="p-2 bg-white rounded-full text-red-500 border border-zinc-200"><RiHeartFill size={25}/></button>
            ) : (
                <button onClick={handleWish} className="p-2 bg-white text-zinc-400 rounded-full border border-zinc-400"><RiHeartLine size={25} /></button>
            )}
        </>
    );
}
