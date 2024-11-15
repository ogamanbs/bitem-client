import React from 'react';

export default function SmallImages({images, name, imgnum, handleClick}) {
    return (
        <>
        {
            images.map((image, index) => (
                <div key={index} className={`w-1/4 h-[9vh] p-1 border ${imgnum === index ? "border-blue-500" : "border-zinc-500"} cursor-pointer`} onMouseOver={() => {handleClick(index)}}>
                    <img className="h-full w-full object-contain" src={image} alt={name}/>
                </div>
            ))
        }
        </>
    )
}
