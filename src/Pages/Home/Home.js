'use client'
import React, {useState, useEffect} from 'react';
import CreateUser from '../../Components/CreateUser';
import LoginUser from '../../Components/LoginUser';
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Notification from '../../Components/Notification';
import { AnimatePresence } from 'framer-motion';
import PreLoader from '../../Components/PreLoader';


export default function Home({setUser, setMessage}) {

  const [cookies] = useCookies(['token']);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [load, setLoad] = useState(100);
  const [vis, setVis] = useState('hidden');

  useEffect(() => {
    if(cookies.token) {
      navigate('/shop');
    }
    if(load === 200) {
      setVis('block');
    } else if(load === 100) {
        setVis('hidden');
    }
  }, [cookies, navigate, load, setVis]);

  const removeNotif = (msg) => {
    setMessages((prevMessages) => prevMessages.filter((message) => { return message !== msg; }));
  }

  return (
    <div className="relative w-full h-full">
       <div className={`absolute ${vis} w-full min-h-screen bg-zinc-200/20 backdrop-blur-md`}>
            <PreLoader load={load} setLoad={setLoad} />
        </div>
      <h1 className='text-2xl font-bold text-blue-400 px-5 py-5 md:p-5 mb-5 md:mb-0'>Bitem</h1>
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
