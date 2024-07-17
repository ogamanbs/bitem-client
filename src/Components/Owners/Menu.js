import React from 'react';
import CreateSection from './CreateSection';
import AllProductsSection from './AllProductsSection';

export default function Menu() {
  return (
    <div className="h-full w-1/4 flex flex-col px-10 py-10 text-sm border-r border-zinc-300">
      <AllProductsSection />
      <CreateSection />
    </div>
  )
}
