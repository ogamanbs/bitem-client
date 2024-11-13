import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import SmallImages from '../../Components/ProductPageComponents/SmallImages';
import AddToWishList from '../../Components/ProductPageComponents/AddToWishList';

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

export default function ProductPage({user, setUser, isShopRoute, setIsShopRoute}) {
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
        }

        if(isShopRoute === true) {
            setIsShopRoute(false);
        }

    },[cookies, navigate, removeCookie, isShopRoute, setIsShopRoute]);

    if(product === null) {
        return <h1 className="py-[10vh] md:py-5 text-center">Loading....</h1>
    }

    const handleClick = (count) => {
        setImgnum(count);
    }

    const goToShop = () => {
        removeCookie('prodtoken', {path:'/shop'});
        navigate('/shop');
    }

    return (
        <div className="relative h-[83vh] md:h-[92vh] w-full">
            <div className="h-[73vh] md:h-full w-full">
                <div className="h-full w-full flex md:flex-row flex-col overflow-scroll md:overflow-hidden">
                    <div className="md:h-[40vh] w-full md:w-[40%]">
                        <div className="flex flex-col md:flex-row-reverse">
                            <div className="relative h-[30vh] md:h-[40vh] w-full md:w-[80%] py-2">
                                <AddToWishList setProduct={setProduct} user={user} setUser={setUser}/>
                                <div className="h-full w-full border-l border-transparent md:border-zinc-500 p-2 oveflow-hidden">
                                    <img className="h-full w-full object-contain" src={product?.images[imgnum]} alt={product?.name}/>
                                </div>
                            </div>
                            <div className="h-auto md:h-[40vh]  w-full md:w-[20%] flex md:flex-col px-2 py-1 gap-2">
                                <SmallImages images={product?.images} name={product?.name} imgnum={imgnum} handleClick={handleClick} />
                            </div>
                        </div>
                        <div className="hidden md:block mt-5">
                            <h1 className="text-center text-sm">hover over small images to view them</h1>
                        </div>
                        <div className="hidden md:flex h-20 w-full mt-5 items-center justify-around gap-5 px-10">
                            <button className="px-7 py-3 rounded-lg bg-orange-500 text-white font-bold w-full">Add to Cart</button>
                            <button className="px-7 py-3 rounded-lg bg-yellow-500 text-white font-bold w-full">Buy Now</button>
                        </div>
                    </div>
                    <div className="md:min-h-[90vh] w-full md:border-l border-zinc-500 md:w-[60%] mt-5 md:mt-0 md:px-10 px-5 md:overflow-scroll">
                        <h6 className="text-xs text-blue-500 cursor-default"><span className="cursor-pointer"><button onClick={goToShop} className="">Shop</button></span> &gt; {product.name}</h6>
                        <h1 className="text-2xl font-medium mt-1">{product?.name}</h1>
                        <div className="mt-5">
                            <div className="flex gap-3 md:gap-5 items-end">
                                <h1 className="font-bold text-3xl md:text-4xl">₹ {product?.price * (1 - (product?.discount / 100))}</h1>
                                <h3 className="line-through text-xl text-zinc-700 font-bold">₹ {product?.price}</h3>
                                <div className="text-[0.5 rem] text-white font-bold bg-green-600 py-1 px-2 rounded-lg">{product?.discount}% off</div>
                            </div>
                        </div>
                        {
                        product?.description &&
                        <div className="mt-10">
                            <h1 className="font-medium text-xl">Description</h1>
                            <h3 className="text-base mt-5">{product.description}</h3>
                        </div>
                        }
                        {
                        product?.features.length > 0 &&
                            <div className="mt-10">
                                <h1 className="font-medium text-xl">Features</h1>
                                <div className="mt-5">
                                        {
                                            product.features.map((feature) => (
                                                <div className="flex gap-5 items-start text-[1rem]">
                                                    <h1 className="md:w-[30%] w-[40%] bg-red-500 font-medium py-2">{feature.name}</h1>
                                                    <p className="md:w-[70%] w-[60%] bg-red-500 py-2">{feature.description}</p>
                                                </div>
                                            ))
                                        }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="h-[10vh] w-full fixed flex items-center gap-5 md:hidden justify-around px-5">
                <button className="px-7 py-3 rounded-lg bg-orange-500 text-white font-bold w-full">Add to Cart</button>
                <button className="px-7 py-3 rounded-lg bg-yellow-500 text-white font-bold w-full">Buy Now</button>
            </div>
        </div>
    )
}
