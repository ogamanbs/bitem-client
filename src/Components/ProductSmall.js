import { RiAddFill } from '@remixicon/react';
import React from 'react'

export default function ProductSmall({product}) {
    return (
        <div className="p-2 card h-48 w-full text-sm flex items-center border-b border-zinc-200">
            <div className="h-36 w-36 mr-2 overflow-hidden flex items-center justify-center" style={{"backgroundColor":`${product.bgcolor}`}}>
                <div className="h-30 w-30 overflow-hidden">
                    <img className="w-full h-full object-contain" src={product.image} alt={product.name} />
                </div>
            </div>
            <div className='h-full w-full flex flex-col justify-center' style={{ 'background-color' : `${product.panelcolor}`, 'color': `${product.textcolor}`}}>
                <div className="flex justify-between gap-3 font-medium">
                    <div className="w-auto px-2">
                        <h1 className="text-lg">{product.name}</h1>
                        <h3 className="font-light">seller: {product.owner.name}</h3>
                        <div className="flex gap-4 items-end mt-2">
                            <h2 className="text-lime-700 text-xl">₹ {product.price - product.discount}</h2>
                            <h2 className="line-through">₹ {product.price}</h2>
                        </div>
                    </div>
                    <div className="w-auto flex items-center">
                        <div className="rounded-full w-full px-2 py-1 bg-white cursor-pointer text-black border border-zinc-500">
                            <RiAddFill />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
