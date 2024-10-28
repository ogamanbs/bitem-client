import React from 'react';
import SortBySection from '../Components/MenuComps/SortBySection';
import SecondSection from './MenuComps/SecondSection';
import ThirdSection from './MenuComps/ThirdSection';
import ProfileSection from './MenuComps/ProfileSection';

export default function Menu({user}) {
  return (
    <div className="h-full w-[20vw] border-r border-zinc-600 md:flex flex-col px-10 py-10 gap-20 text-sm">
        <div className="flex flex-col gap-5">
          <a href={`/${user?.name.replace(" ", "_")}`}><ProfileSection /></a>
          <SortBySection />
        </div>
        <SecondSection />
        <ThirdSection />
    </div>
  )
}
