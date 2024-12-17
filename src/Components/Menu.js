import React from 'react';
import SortBySection from '../Components/MenuComps/SortBySection';
import SecondSection from './MenuComps/SecondSection';
import ThirdSection from './MenuComps/ThirdSection';

export default function Menu({handleFilterClick}) {
  return (
    <div className="h-full w-[20vw] border-r border-zinc-600 md:flex flex-col px-10 py-10 gap-[10vh] text-sm">
        <SortBySection handleFilterClick={handleFilterClick}/>
        <SecondSection handleFilterClick={handleFilterClick}/>
        <ThirdSection handleFilterClick={handleFilterClick}/>
    </div>
  )
}
