import React from 'react'

export default function BuyAlertModal({handleCloseButton}) {
    return (
        <div onClick={handleCloseButton} className="absolute h-full w-full bg-black/20 backdrop-blur-md z-10 flex items-center justify-center">
            <div onClick={(e) => e.stopPropagation()} className="h-auto w-96 bg-white rounded-[20px] shadow-md -mt-20">
                <div className="border-b border-zinc-200 py-3 px-5 flex justify-center">
                    <h1 className="text-xl font-bold text-red-500">Alert !!</h1>
                </div>
                <div className="border-b border-zinc-200 py-5 px-5" >
                    <p className="text-base">This is a project is developed to demonstrate the developer's full stack development skills.</p>
                    <p className="text-base">It is advised not to buy products from this website.</p>
                </div>
                <div className="py-3 px-5 flex justify-center">
                    <button onClick={handleCloseButton} className="bg-blue-500 px-5 py-2 text-sm font-bold text-white rounded-lg">Close</button>
                </div>
            </div>
        </div>
    )
}
