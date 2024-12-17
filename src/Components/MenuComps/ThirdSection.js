import React from 'react'

export default function ThirdSection({handleFilterClick}) {
  return (
    <div className="w-full flex flex-col gap-2">
        <h1 className="text-blue-500 select-none pointer-events-none text-left">Filter by:</h1>
        <button onClick={handleFilterClick} className="cursor-pointer text-left">Availability</button>
        <button onClick={handleFilterClick} className="cursor-pointer text-left">Discount</button>
    </div>
  )
}
