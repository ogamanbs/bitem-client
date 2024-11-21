import React from 'react';
import {useNavigate} from 'react-router-dom';
import AddToWishListSmall from './AddToWishlistSmall';
import { RiArrowDownLine } from '@remixicon/react';

export default function ProductSmall({product, user, setUser}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/shop/${product?.name.toLowerCase().replace(/ /g, "_")}`);
    }
    return (
        <div className="h-48 w-full text-sm flex items-center border-b border-zinc-200">
            <div onClick={handleClick} className="h-full min-w-[14vh] max-w-[14vh] overflow-hidden flex items-center justify-center border-r border-zinc-200 p-2">
                <div className="h-full w-30 overflow-hidden">
                    <img className="w-full h-full object-contain" src={product.images[0]} alt={product.name} />
                </div>
            </div>
            <div className='h-full w-full flex flex-col justify-center py-4'>
                <div onClick={handleClick} className="flex flex-col gap-2 font-medium">
                    <div className="w-auto flex flex-col px-4">
                        <h1 className="text-base">{product.name}</h1>
                        <h3 className="font-light">seller: {product.owner.name}</h3>
                        <div className="mt-2 flex justify-start text-xs">
                            <div className="flex items-center px-2 py-1 bg-green-600 text-white rounded-lg">
                                <RiArrowDownLine size={11} />
                                <h3 className="">{product.discount}%</h3>
                            </div>
                        </div>
                        <div className="flex gap-3 items-end mt-2">
                            <h1 className="text-lime-700 text-xl">₹ {product.price - (product.price * product.discount / 100)}</h1>
                            <h2 className="line-through font-bold text-zinc-600 decoration-red-500">₹ {product.price}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full flex mt-1 px-5 gap-3">
                <AddToWishListSmall user={user} setUser={setUser} product={product} />
            </div>
        </div>
    );
}
