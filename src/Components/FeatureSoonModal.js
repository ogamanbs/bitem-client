import React from 'react'

export default function FeatureSoonModal({handleCloseFeatureModal}) {
    return (
        <div onClick={handleCloseFeatureModal} className="absolute h-full w-full bg-black/20 backdrop-blur-md z-10 flex items-center justify-center">
            <div onClick={(e) => e.stopPropagation()} className="min-h-32 w-96 bg-white rounded-[20px]">
                <div className="border-b border-zinc-200 px-5 py-3 flex justify-center">
                    <h1 className="text-xl font-bold">Feature Coming Soon!!</h1>
                </div>
                <div className="border-b border-zinc-200 px-5 py-3 text-base">
                    <p className="text-center">This feature is under construction and will be made available in a short while.</p>
                    <p className="text-center">Stay tuned...</p>
                </div>
                <div className="px-5 py-3 flex justify-center">
                    <button onClick={handleCloseFeatureModal} className="text-sm bg-blue-500 text-white font-bold px-5 py-2 rounded-lg">Close</button>
                </div>
            </div>
        </div>
    )
}
