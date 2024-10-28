import { RiAddFill } from '@remixicon/react';
import React from 'react';
import HeartButtonProducts from './HeartButtonProducts';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export default function Product({product}) {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['prodtoken']);
    const handleClick = () => {
        setCookie('prodtoken', product._id, {path:'/shop'})
        navigate(`/shop/${product?.name.toLowerCase().replace(" ", "_")}`);
    }
    return (
        <div onClick={handleClick} className="relative card h-64 md:h-80 w-36 md:w-64 text-xs md:text-sm flex flex-col hover:shadow-md cursor-pointer">
            <div className="absolute -right-4 -top-4">
                <HeartButtonProducts />
            </div>
            <div className="h-3/4 py-3" style={{'backgroundColor' : `${product.bgcolor}`}}>
                <img className="w-full h-full object-contain" src={product.image} alt={product.name} />
            </div>
            <div className='h-1/4 px-3 flex items-center' style={{ 'backgroundColor' : `${product.panelcolor}`, 'color': `${product.textcolor}`}}>
                <div className="flex justify-between gap-3 font-medium w-full">
                    <div className="w-auto">
                        <h1 className="">{product.name}</h1>
                        <h3 className="text-xs font-light truncate">seller: {product.owner.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                            <h2 className="text-lime-700 px-2 bg-white rounded-full">₹ {product.price - product.discount}</h2>
                            <h2 className="line-through">₹ {product.price}</h2>
                        </div>
                    </div>
                    <div className="w-auto flex items-center">
                        <div className="rounded-full w-full p-2 bg-white cursor-pointer text-bold text-black border active:text-white active:bg-zinc-800">
                            <RiAddFill size={18} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
