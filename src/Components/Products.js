'use client'
import React from 'react';
import Product from './Product';
import ProductSmall from './ProductSmall';

export default function Products({products, user, setProducts}) {
  return (
    <>
      <div className="hidden md:block h-full w-full right-0 px-10 md:px-20 py-10">
          <div className="w-full h-auto flex flex-wrap gap-5">
            {products.length > 0 && products.map((product) => (
                <Product key={product.name} product={product} />
            ))}
          </div>
      </div>
      <div className="block md:hidden h-full w-full right-0 px-5 md:px-20">
          <div className="w-full h-auto flex flex-col gap-1">
            {products.length > 0 && products.map((product) => (
                <ProductSmall key={product.name} product={product} />
            ))}
          </div>
      </div>
    </>
  )
}
