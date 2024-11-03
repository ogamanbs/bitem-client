import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

const getProduct = async (id) => {
    try{
        const response = await fetch('https://server.bitem.in/products/specific', {
        // const response = await fetch('http://localhost:8000/products/specific', {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ id })
        });
        if(response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            return data;
        }
    } catch(err) {
        return {
            product: {},
            message: "error while fetching product"
        }
    }
}

export default function ProductPage() {
    const [cookies, ,removeCookie] = useCookies(['prodtoken']);
    const [product, setProduct] = useState(null);
    const [imgnum, setImgnum] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const callAPI = async (token) => {
            const data = await getProduct(token);
            if(data.product) {
                setProduct(data.product);
            } else {
                removeCookie('prodtoken', {path:'/shop'});
                navigate('/shop', {replace: true});
            }
        }

        if(cookies.prodtoken !== undefined) {
            callAPI(cookies.prodtoken);
        } else {
            navigate('/shop', {replace:true});
        }
    },[cookies, navigate, removeCookie]);

    if(product === null) {
        return <h1 className="py-[10vh] md:py-5 text-center">Loading....</h1>
    }

    const handleClick = (count) => {
        setImgnum(count);
    }

    return (
        <div className="min-h-[90vh] w-full flex md:flex-row flex-col justify-center">
            <div className="-mt-[21vh] md:mt-0 h-auto md:h-[40vh] w-full md:w-[44%] flex md:flex-row-reverse flex-col">
                <div className="h-[30vh] md:h-full w-full md:w-[80%] px-2 py-5">
                    <div className="h-full w-full border-l border-transparent md:border-zinc-500 p-2 oveflow-hidden">
                        <img className="h-full w-full object-contain" src={product.images[imgnum]} alt={product.name}/>
                    </div>
                </div>
                <div className="h-auto md:h-[40vh]  w-full md:w-[20%] flex md:flex-col px-2 py-5 gap-2">
                    <div className={`w-full h-[9vh] border ${imgnum === 0 ? "border-blue-500" : "border-zinc-500"} cursor-pointer`} onMouseOver={() => {handleClick(0)}}>
                        <img className="h-full w-full object-contain" src={product.images[0]} alt={product.name}/>
                    </div>
                    <div className={`w-full h-[9vh] border ${imgnum === 1 ? "border-blue-500" : "border-zinc-500"} cursor-pointer`} onMouseOver={() => {handleClick(1)}}>
                        <img className="h-full w-full object-contain" src={product.images[1]} alt={product.name}/>
                    </div>
                    <div className={`w-full h-[9vh] border ${imgnum === 2 ? "border-blue-500" : "border-zinc-500"} cursor-pointer`} onMouseOver={() => {handleClick(2)}}>
                        <img className="h-full w-full object-contain" src={product.images[2]} alt={product.name}/>
                    </div>
                    <div className={`w-full h-[9vh] border ${imgnum === 3 ? "border-blue-500" : "border-zinc-500"} cursor-pointer`} onMouseOver={() => {handleClick(3)}}>
                        <img className="h-full w-full object-contain" src={product.images[3]} alt={product.name}/>
                    </div>
                </div>
            </div>
            <div className="h-auto md:min-h-[90vh] w-full md:border-l border-zinc-500 md:w-[56%] mt-5 md:mt-0 md:px-10 px-5">
                <h6 className="text-xs text-blue-500 cursor-default"><span className="cursor-pointer"><a href="/shop" className="">Shop</a></span> &gt; {product.name}</h6>
                <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
            </div>
        </div>
    )
}
