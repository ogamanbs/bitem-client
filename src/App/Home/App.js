'use client'
import React, {useState, useEffect} from 'react';
import CreateUser from '../../Components/CreateUser';
import LoginUser from '../../Components/LoginUser';
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Notification from '../../Components/Notification';
import { AnimatePresence } from 'framer-motion';


export default function App() {

  const [cookies] = useCookies(['token']);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.token) {
      navigate('/shop');
    }
  }, [cookies, navigate]);

  const removeNotif = (msg) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message !== msg));
  }

  return (
    <div className="w-full min-h-screen">
      <h1 className='text-2xl font-bold text-blue-400 p-5 mb-10 md:mb-0'>Bitem</h1>
      <div className="w-full h-[80vh] flex flex-col-reverse md:flex-row items-center justify-center gap-5 md:gap-32">
        <CreateUser setMessages={setMessages} messages={messages} />
        <LoginUser setMessages={setMessages} messages={messages} />
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
