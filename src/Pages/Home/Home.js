'use client'
import React, {useState, useEffect} from 'react';
import CreateUser from '../../Components/CreateUser';
import LoginUser from '../../Components/LoginUser';
import {useCookies} from 'react-cookie';
import { Navigate } from 'react-router-dom';
import Notification from '../../Components/Notification';
import { AnimatePresence } from 'framer-motion';
import PreLoader from '../../Components/PreLoader';
import BitemImage from '../../Images/BitemImage';


export default function Home({setUser, setMessage}) {

  const [cookies] = useCookies(['BdS54ADdsf3@DFssr']);
  const [messages, setMessages] = useState([]);
  const [load, setLoad] = useState(100);
  const [vis, setVis] = useState('hidden');

  useEffect(() => {
    if(load === 200) {
      setVis('block');
    } else if(load === 100) {
      setVis('hidden');
    }
  }, [load]);


  if(cookies.token) {
    return <Navigate to="/shop" replace/>
  }

  const removeNotif = (msg) => {
    setMessages((prevMessages) => prevMessages.filter((message) => { return message !== msg; }));
  }

  return (
    <div className="relative w-full h-full">
        <div className={`absolute ${vis} w-full min-h-screen bg-zinc-200/20 backdrop-blur-md`}>
            <PreLoader load={load} setLoad={setLoad} />
        </div>
        <div className="h-full w-full flex items-center gap-2 p-5 select-none">
            <div className="flex items-center justify-center ">
                <div className="h-5 w-7">
                  <BitemImage />
                </div>
            </div>
            <h1 className='text-2xl font-bold text-blue-400 '>Bitem</h1>
        </div>
        <div className="w-full h-auto md:h-[80vh] flex flex-col-reverse md:flex-row items-center justify-center gap-20 md:gap-32">
          <CreateUser setMessages={setMessages} messages={messages} setLoad={setLoad} />
          <LoginUser setMessages={setMessages} messages={messages} setLoad={setLoad} setUser={setUser} setMessage={setMessage} />
        </div>
        <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none mt-20 md:mt-0">
          <AnimatePresence>
            {messages.map((message, index) => (
              <Notification key={index} removeNotif={removeNotif} message={message} />
            ))}
          </AnimatePresence>
        </div>
    </div>
  );
}
