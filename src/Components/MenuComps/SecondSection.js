import React from 'react'

export default function SecondSection({handleFilterClick}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <button onClick={handleFilterClick} className="text-left">New Collection</button>
      <button onClick={handleFilterClick} className="text-left">Discounted Products</button>
    </div>
  )
}
