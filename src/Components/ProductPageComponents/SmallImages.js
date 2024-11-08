import React from 'react';

export default function SmallImages({images, name, imgnum, handleClick}) {
    return (
        <>
            <div className={`w-full h-[9vh] border ${imgnum === 0 ? "border-blue-500" : "border-zinc-500"} cursor-pointer`} onMouseOver={() => {handleClick(0)}}>
                <img className="h-full w-full object-contain" src={images[0]} alt={name}/>
            </div>
            <div className={`w-full h-[9vh] border ${imgnum === 1 ? "border-blue-500" : "border-zinc-500"} cursor-pointer`} onMouseOver={() => {handleClick(1)}}>
                <img className="h-full w-full object-contain" src={images[1]} alt={name}/>
            </div>
            <div className={`w-full h-[9vh] border ${imgnum === 2 ? "border-blue-500" : "border-zinc-500"} cursor-pointer`} onMouseOver={() => {handleClick(2)}}>
                <img className="h-full w-full object-contain" src={images[2]} alt={name}/>
            </div>
            <div className={`w-full h-[9vh] border ${imgnum === 3 ? "border-blue-500" : "border-zinc-500"} cursor-pointer`} onMouseOver={() => {handleClick(3)}}>
                <img className="h-full w-full object-contain" src={images[3]} alt={name}/>
            </div>
        </>
    )
}
