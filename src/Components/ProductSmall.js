import React from 'react';

export default function ProductSmall({product}) {
    return (
        <div className="card h-36 w-full text-sm flex items-center border-b border-zinc-200">
            <div className="h-36 w-36 overflow-hidden flex items-center justify-center" style={{"backgroundColor":`${product.bgcolor}`}}>
                <div className="h-30 w-30 overflow-hidden">
                    <img className="w-full h-full object-contain" src={product.image} alt={product.name} />
                </div>
            </div>
            <div className='h-full w-full flex flex-col justify-center' style={{ 'backgroundColor' : `${product.panelcolor}`, 'color': `${product.textcolor}`}}>
                <div className="flex flex-col gap-3 font-medium">
                    <div className="w-auto px-5">
                        <h1 className="text-base">{product.name}</h1>
                        <h3 className="font-light">seller: {product.owner.name}</h3>
                        <div className="flex gap-4 items-end mt-3">
                            <h2 className="text-lime-700 text-sm px-2 bg-white rounded-full">₹ {product.price - product.discount}</h2>
                            <h2 className="line-through">₹ {product.price}</h2>
                        </div>
                    </div>
                    <div className="flex justify-around mt-1 px-3">
                        <button className="px-3 py-1 bg-white rounded-full active:text-red-500 border active:border-red-500">Wishlist</button>
                        <button className="px-3 py-1 bg-white rounded-full active:text-blue-500 border active:border-blue-500">Add to the Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
