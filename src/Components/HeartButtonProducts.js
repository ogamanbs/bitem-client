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
                <button onClick={handleUnWish} className="p-2 bg-white rounded-full text-red-500 "><RiHeartFill /></button>
            ) : (
                <button onClick={handleWish} className="p-2 bg-white text-zinc-400 rounded-full"><RiHeartLine /></button>
            )}
        </>
    );
}
