import React from 'react'

export default function ThirdSection() {
  return (
    <div className="w-full flex flex-col gap-2">
        <h1 className="text-blue-500 select-none pointer-events-none">Filter by:</h1>
        <h1 className="cursor-pointer">Availability</h1>
        <h1 className="cursor-pointer">Discount</h1>
    </div>
  )
}
