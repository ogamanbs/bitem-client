import React,{useState, useEffect} from 'react';
import Menu from '../../Components/Menu';
import Products from '../../Components/Products';
import MenuSmall from '../../Components/MenuSmall';
import { RiSearchLine} from '@remixicon/react';
import {useCookies} from 'react-cookie';
import FeatureSoonModal from '../../Components/FeatureSoonModal';

export default function Shop({user, setUser, products, setProducts, setIsShopRoute, isShopRoute}) {
    const [search, setSearch] = useState("");
    const [cookies,,removeCookie] = useCookies(['prodtoken']);
    const [showFeatureSoonModal, setShowFeatureSoonModal] = useState(false);

    useEffect(() => {
        if(cookies.prodtoken) {
            removeCookie('prodtoken',{path:'/shop'});
        }

        if(isShopRoute === false) {
            setIsShopRoute(true);
        }
    }, [cookies, removeCookie, isShopRoute, setIsShopRoute]);

    const handleFilterClick = () => {
        setShowFeatureSoonModal(true);
    }

    const handleCloseFeatureModal = () => {
        setShowFeatureSoonModal(false);
    }

    return (
        <div className="relative h-[82vh] md:h-[92vh] flex flex-col md:flex-row w-full">
            {showFeatureSoonModal && <FeatureSoonModal handleCloseFeatureModal={handleCloseFeatureModal}/>}
            <div className="hidden md:block">
                <Menu handleFilterClick={handleFilterClick}/>
            </div>
            <div className="block  md:hidden">
                <MenuSmall search={search} setSearch={setSearch} handleFilterClick={handleFilterClick}/>
            </div>
            <div className="h-full w-full md:w-[calc(80vw)]">
                <div className="hidden h-[7vh] w-full md:flex items-center z-[10] mb-5 bg-white">
                    <div className="w-full flex items-center justify-center">
                        <input
                                type="text"
                                name="search"
                                placeholder={"search"}
                                autoComplete={"off"}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-[40%] px-5 py-1 text-sm h-10 rounded-full bg-zinc-100 outline-none placeholder:text-zinc-700"
                        />
                        <div className="text-blue-400 p-2 rounded-full cursor-pointer"><RiSearchLine /></div>
                    </div>
                </div>
                <div className="w-full h-[72vh] md:h-[82vh] overflow-scroll">
                    <Products products={products} search={search} setUser={setUser} user={user} />
                </div>
            </div>
        </div>
    );
}
