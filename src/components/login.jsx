import React, { useState } from 'react';
import { auth } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const user = credentials.user;
      localStorage.setItem('token', user.accessToken)
     navigate('/dashboard')
     alert('Welcome to Arcsale Dashboard')
    } catch (error) {
      alert('Invalid Credentials')
      console.error("Error logging in: ", error);
    }
  };
  console.log(auth);
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='flex flex-col w-[30%] shadow-xl p-4 gap-6'>
      <h1 className='text-center text-xl font-semibold'>ArcsaleAI Dashboard</h1>
      <input className='h-[40px] focus:outline-none px-3' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className='h-[40px] focus:outline-none px-3' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className='px-3 py-2 bg-blue-300 font-medium rounded-sm' onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
