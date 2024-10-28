import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export default function ProductSmall({product}) {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['prodtoken']);
    const handleClick = () => {
        setCookie('prodtoken', product._id, {path:'/shop'})
        navigate(`/shop/${product?.name.toLowerCase().replace(" ", "_")}`);
    }
    return (
        <div onClick={handleClick} className="card h-48 w-full text-sm flex items-center border-b border-zinc-200">
            <div className="h-full w-36 overflow-hidden flex items-center justify-center" style={{"backgroundColor":`${product.bgcolor}`}}>
                <div className="h-full w-30 overflow-hidden">
                    <img className="w-full h-full object-contain" src={product.image} alt={product.name} />
                </div>
            </div>
            <div className='h-full w-full flex flex-col justify-between py-4' style={{ 'backgroundColor' : `${product.panelcolor}`, 'color': `${product.textcolor}`}}>
                <div className="flex flex-col gap-2 font-medium">
                    <div className="w-auto flex flex-col px-4">
                        <h1 className="text-xl">{product.name}</h1>
                        <h3 className="font-light text-base">seller: {product.owner.name}</h3>
                        <div className="flex gap-4 items-center mt-3">
                            <h2 className="text-lime-700 text-base px-2 bg-white rounded-full">₹ {product.price - product.discount}</h2>
                            <h2 className="line-through text-base px-2 bg-white rounded-full">₹ {product.price}</h2>
                        </div>
                    </div>
                </div>
                <div className="flex mt-1 px-3 gap-3">
                    <button className="px-3 py-2 bg-white text-sm rounded-full text-red-500 border border-red-500">Add to Wishlist</button>
                    <button className="px-3 py-2 bg-white text-sm rounded-full text-blue-500 border border-blue-500">Add to the Cart</button>
                </div>
            </div>
        </div>
    );
}
