import { RiBox3Line, RiEqualizerLine, RiSortAsc } from '@remixicon/react';
import React from 'react';

export default function MenuSmall() {
    return (
      <div className="md:hidden fixed flex items-center justify-between gap-5 w-full h-[7vh] mt-[8vh] px-5 border-b border-zinc-200 bg-white">
          <div className="px-5 py-2 font-bold text-sm bg-amber-300 rounded-full"><h1 className="">New</h1></div>
          <div className="px-5 py-2 font-bold text-blue-400 rounded-full"><h1 className=""><RiSortAsc /></h1></div>
          <div className="px-5 py-2 font-bold text-blue-400 rounded-full"><RiBox3Line /></div>
          <div className="text-blue-400 p-2 rounded-md"><RiEqualizerLine /></div>
      </div>
    )
}
