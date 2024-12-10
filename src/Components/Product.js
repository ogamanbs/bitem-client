import React from 'react';
import HeartButtonProducts from './HeartButtonProducts';
import {useNavigate} from 'react-router-dom';

export default function Product({product, user, setUser}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/shop/${product?.name.toLowerCase().replace(/ /g, "_")}`);
    }
    return (
        <div className="relative card h-64 md:h-80 w-36 md:w-64 text-xs md:text-sm flex flex-col hover:shadow-md cursor-pointer border border-zinc-200 rounded-lg">
            <div className="absolute -right-4 -top-4">
                <HeartButtonProducts setUser={setUser} product={product} user={user} />
            </div>
            <div onClick={handleClick} className="h-3/4 py-3 border-b border-zinc-200">
                <img className="w-full h-full object-contain" src={product.images[0]} alt={product.name} />
            </div>
            <div onClick={handleClick} className='h-1/4 px-3 flex items-center'>
                <div className="flex justify-between gap-3 font-medium w-full">
                    <div className="w-auto">
                        <h1 className="">{product.name}</h1>
                        <h3 className="text-xs font-light truncate">seller: <span className="capitalize">{product.owner.name}</span></h3>
                        <div className="flex items-center gap-4 mt-1">
                            <h2 className="text-lime-700 select-none">₹ {product.price - (product.price * product.discount / 100)}</h2>
                            <h2 className="line-through select-none">₹ {product.price}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
