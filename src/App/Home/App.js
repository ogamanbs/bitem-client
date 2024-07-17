import React, {useEffect} from 'react';
import CreateUser from '../../Components/CreateUser';
import LoginUser from '../../Components/LoginUser';
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';


export default function App() {

  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.token) {
      navigate('/shop');
    }
  }, [cookies, navigate]);

  return (
    <div className="w-full min-h-screen">
      <h1 className='text-2xl font-bold text-blue-400 p-5 mb-10 md:mb-0'>Bitem</h1>
      <div className="w-full h-[80vh] flex flex-col-reverse md:flex-row items-center justify-center gap-5 md:gap-32">
        <CreateUser />
        <LoginUser />
      </div>
    </div>
  );
}
