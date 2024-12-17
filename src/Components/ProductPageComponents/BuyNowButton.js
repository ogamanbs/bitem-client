import React from 'react'

export default function BuyNowButton({setShowBuyAlert, handleBuyButtonClick}) {
    return (
        <button onClick={handleBuyButtonClick} className="px-7 py-3 rounded-lg bg-yellow-500 text-white font-bold w-full">Buy Now</button>
    )
}
