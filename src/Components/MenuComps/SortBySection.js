import React from 'react'

export default function SortBySection() {
  return (
    <div className="flex gap-2 items-center w-full">
        <h1 className="text-sm text-blue-500 select-none pointer-none">sort By</h1>
        <select className="px-2 py-1 outline-none cursor-pointer" name="sort" id="sort">
            <option>Select</option>
            <option value="Newest">Newest</option>
            <option value="Popular">Popular</option>
        </select>
    </div>
  );
}
