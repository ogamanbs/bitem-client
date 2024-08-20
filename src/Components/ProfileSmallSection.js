import React from 'react'

export default function ProfileSmallSection({user}) {
    return (
        <div className="h-10 w-10 rounded-full cursor-pointer overflow-hidden">
            <img className="w-full h-full object-covere" src={user.image} alt={user.name} />
        </div>
    );
}
