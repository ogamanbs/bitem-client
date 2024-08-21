import React from 'react'
import BitemImage from '../Images/BitemImage';

export default function Head() {
  return (
    <div className="h-full w-full flex items-center gap-2 select-none">
      <div className="flex items-center justify-center">
          <div className="h-5 w-7">
            <BitemImage />
          </div>
      </div>
      <h1 className='text-2xl font-bold text-blue-400'>Bitem</h1>
    </div>
  );
}
