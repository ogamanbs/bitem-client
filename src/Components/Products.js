'use client'
import React,{useState, useEffect} from 'react';
import Product from './Product';

const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:8000/products/');
    const data = await response.json();
    return data;
  } catch(err) {
    console.error(err);
  }
}

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const call = async () => {
      const data = await getProducts();
      setProducts(data.products);
    }
    call();
  }, [products]);

  return (
    <div className="fixed h-full w-[calc(100vw-30vh)] right-0 px-32 py-10 overflow-scroll">
        <div className="w-full h-auto flex flex-wrap gap-5">
          {products.length > 0 && products.map((product) => (
              <Product key={product.name} product={product} />
          ))}
        </div>
    </div>
  )
}
