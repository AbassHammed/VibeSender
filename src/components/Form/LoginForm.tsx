import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { auth } from '@/firebase/firebase';
import { currentUserQuery, populateFriends } from '@/firebase/query';
import { useSession } from '@/hooks/useSession';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { toast } from 'sonner';

import Button from '../Button/Button';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setSessionData } = useSession();

  const handleForgot = () => {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      setIsLoading(false);
      return toast.warning('Please fill all fields');
    }
    try {
      const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
      toast.info('everything');
      if (newUser) {
        await currentUserQuery(newUser.user.uid, setSessionData);
        await populateFriends(newUser.user.uid, setSessionData);
        router.push('/conversations');
      }
    } catch (error) {
      toast.error('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      <h3 className="text-xl font-medium text-white">Log In</h3>
      <div>
        <label htmlFor="email" className="text-sm font-medium block leading-6 text-gray-900">
          Email
        </label>
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          className="
            border-2 outline-none sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
				 placeholder:text-gray-400 text-black
        "
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium block leading-6 text-gray-900">
          Password
        </label>
        <div className="relative flex items-center">
          <input
            onChange={handleInputChange}
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            className="
				border-2 outline-none sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
				 placeholder:text-gray-400 text-black
			"
            placeholder="*******"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            {showPassword ? (
              <FaRegEyeSlash className="h-5 w-5 text-black" onClick={togglePasswordVisibility} />
            ) : (
              <FaRegEye className="h-5 w-5 text-black" onClick={togglePasswordVisibility} />
            )}
          </div>
        </div>
      </div>

      <Button type="submit" fullWidth>
        {isLoading ? 'Loading...' : 'Log In'}
      </Button>
      <button className="flex w-full justify-end" onClick={() => handleForgot()}>
        <a href="#" className="text-sm block text-gray-900 hover:underline w-full text-right">
          Forgot Password?
        </a>
      </button>
    </form>
  );
};
export default LoginForm;
