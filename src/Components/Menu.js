import React from 'react';
import SortBySection from '../Components/MenuComps/SortBySection';
import SecondSection from './MenuComps/SecondSection';
import ThirdSection from './MenuComps/ThirdSection';

export default function Menu() {
  return (
    <div className="fixed h-full w-[30vh] flex flex-col px-10 py-10 gap-20 text-sm">
        <SortBySection />
        <SecondSection />
        <ThirdSection />
    </div>
  )
}
