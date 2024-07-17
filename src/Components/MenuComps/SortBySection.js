import React from 'react'

export default function SortBySection() {
  return (
    <div className="flex gap-2 items-center w-full">
        <h1 className="text-sm">sort By</h1>
        <select className="px-2 py-1 outline-none" name="sort" id="sort">
            <option value="Popular">Popular</option>
            <option value="Newest">Newest</option>
        </select>
    </div>
  );
}
