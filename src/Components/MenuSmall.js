import { RiEqualizerLine, RiSearchLine} from '@remixicon/react';
import React from 'react';
import ProfileSmallSection from './ProfileSmallSection';

export default function MenuSmall({user, search, setSearch}) {
    return (
      <div className="md:hidden fixed flex items-center justify-between gap-3 w-full h-[7vh] mt-[8vh] px-5 border-b border-zinc-200 bg-white">
          <div className="">
            <a href={`/${user.name?.replace(' ', '-')}`}><ProfileSmallSection user={user} /></a>
          </div>
          <div className="flex">
            <input
              type="text"
              name="search"
              placeholder={"search"}
              value={search}
              autoComplete={"off"}
              onChange={(e) => setSearch(e.target.value)}
              className="px-5 py-1 text-base rounded-full bg-zinc-100 outline-none placeholder:text-zinc-700"
            />
            <div className="text-blue-400 p-2 rounded-full"><RiSearchLine size={25}/></div>
          </div>
          <div className="text-blue-400 rounded-md"><RiEqualizerLine size={25}/></div>
      </div>
    )
}
