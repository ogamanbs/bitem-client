import React from 'react';
import OwnerHead from './OwnerHead';
import Menu from './Menu';
import CreateProductForm from './CreateProductForm';

export default function CreateProducts() {
  return (
    <div className='w-full h-[calc(100vh-72.9px)]'>
        <div className="fixed h-[7vh] flex items-center justify-between px-10">
            <OwnerHead />
        </div>
        <div className="fixed h-[93vh] mt-[7vh] flex w-full h-full">
            <Menu />
            <CreateProductForm />
        </div>
    </div>
  )
}
